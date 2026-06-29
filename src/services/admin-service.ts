'use client';

import { 
  Firestore, 
  doc, 
  updateDoc, 
  serverTimestamp, 
  addDoc, 
  collection,
  Timestamp
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export class AdminService {
  constructor(private db: Firestore) {}

  /**
   * Send a notification to a specific user
   */
  async sendNotification(userId: string, title: string, message: string, type: 'message' | 'promotion' | 'system' = 'message') {
    const notificationsRef = collection(this.db, 'notifications');
    try {
      await addDoc(notificationsRef, {
        userId,
        title,
        message,
        type,
        read: false,
        createdAt: serverTimestamp()
      });
    } catch (err: any) {
      console.error("Failed to send notification:", err);
    }
  }

  /**
   * Block or Unblock a user
   */
  async updateUserStatus(adminId: string, adminName: string, userId: string, status: 'active' | 'blocked', reason?: string) {
    const userRef = doc(this.db, 'users', userId);
    const data = {
      status,
      blockReason: reason || null,
      updatedAt: serverTimestamp()
    };

    try {
      await updateDoc(userRef, data);
      
      // Send notification about status change
      if (status === 'blocked') {
        this.sendNotification(userId, "Account Restricted", "Your account has been restricted by an administrator. Please contact support.", 'system');
      } else {
        this.sendNotification(userId, "Access Reactivated", "Welcome back! Your account access has been fully restored.", 'system');
      }

      // Log the action
      this.logAction(adminId, adminName, status === 'blocked' ? 'RESTRICT_USER' : 'REACTIVATE_USER', userId, reason);
    } catch (err: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: userRef.path,
        operation: 'update',
        requestResourceData: data
      }));
    }
  }

  /**
   * Soft delete a user
   */
  async softDeleteUser(adminId: string, adminName: string, userId: string) {
    const userRef = doc(this.db, 'users', userId);
    const data = {
      deletedAt: serverTimestamp(),
      status: 'inactive'
    };

    try {
      await updateDoc(userRef, data);
      this.logAction(adminId, adminName, 'ARCHIVE_USER', userId);
    } catch (err: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: userRef.path,
        operation: 'update',
        requestResourceData: data
      }));
    }
  }

  /**
   * Update Subscription / Promote or Downgrade
   */
  async updateSubscription(adminId: string, adminName: string, userId: string, plan: 'free' | 'pro', months: number = 12) {
    const userRef = doc(this.db, 'users', userId);
    
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);

    const data = {
      subscriptionPlan: plan,
      subscriptionStartDate: plan === 'pro' ? serverTimestamp() : null,
      subscriptionExpiryDate: plan === 'pro' ? Timestamp.fromDate(expiryDate) : null,
      updatedAt: serverTimestamp()
    };

    try {
      await updateDoc(userRef, data);
      
      // Send appropriate notification
      if (plan === 'pro') {
        await this.sendNotification(
          userId, 
          "Welcome to Premium!", 
          `Congratulations! You have been promoted to Premium by an administrator. Enjoy unlimited access for ${months} months.`, 
          'promotion'
        );
      } else {
        await this.sendNotification(
          userId, 
          "Subscription Updated", 
          "Your account has been switched to the standard Free tier. Some premium features may now be limited.", 
          'system'
        );
      }

      this.logAction(
        adminId, 
        adminName, 
        plan === 'pro' ? 'PROMOTE_PREMIUM' : 'DOWNGRADE_FREE', 
        userId, 
        `Plan set to ${plan}`
      );
    } catch (err: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: userRef.path,
        operation: 'update',
        requestResourceData: data
      }));
    }
  }

  /**
   * Internal logging service
   */
  private async logAction(adminId: string, adminName: string, action: string, targetId: string, details?: string) {
    const logsRef = collection(this.db, 'audit_logs');
    const logData = {
      adminId,
      adminName,
      action,
      targetUserId: targetId,
      details: details || '',
      timestamp: serverTimestamp()
    };

    addDoc(logsRef, logData).catch(() => {});
  }
}
