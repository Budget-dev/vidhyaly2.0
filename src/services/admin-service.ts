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
   * Update Subscription / Promote to Pro
   */
  async updateSubscription(adminId: string, adminName: string, userId: string, plan: 'free' | 'pro', months: number = 12) {
    const userRef = doc(this.db, 'users', userId);
    
    // Calculate expiry date (default 1 year for promotion)
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + months);

    const data = {
      subscriptionPlan: plan,
      subscriptionStartDate: serverTimestamp(),
      subscriptionExpiryDate: Timestamp.fromDate(expiryDate),
      updatedAt: serverTimestamp()
    };

    try {
      await updateDoc(userRef, data);
      this.logAction(adminId, adminName, 'PROMOTE_PREMIUM', userId, `Plan set to ${plan} for ${months} months`);
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
