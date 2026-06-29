
'use client';

import { 
  Firestore, 
  doc, 
  updateDoc, 
  serverTimestamp, 
  addDoc, 
  collection
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

    updateDoc(userRef, data).catch(async (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: userRef.path,
        operation: 'update',
        requestResourceData: data
      }));
    });

    // Log the action
    this.logAction(adminId, adminName, status === 'blocked' ? 'RESTRICT_USER' : 'UNBLOCK_USER', userId, reason);
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

    updateDoc(userRef, data).catch(async (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: userRef.path,
        operation: 'update',
        requestResourceData: data
      }));
    });

    this.logAction(adminId, adminName, 'SOFT_DELETE_USER', userId);
  }

  /**
   * Update Subscription
   */
  async updateSubscription(adminId: string, adminName: string, userId: string, plan: 'free' | 'pro', months: number = 1) {
    const userRef = doc(this.db, 'users', userId);
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + months);

    const data = {
      subscriptionPlan: plan,
      subscriptionStartDate: serverTimestamp(),
      subscriptionExpiryDate: expiry,
      updatedAt: serverTimestamp()
    };

    updateDoc(userRef, data).catch(async (err) => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: userRef.path,
        operation: 'update',
        requestResourceData: data
      }));
    });

    this.logAction(adminId, adminName, 'UPDATE_SUBSCRIPTION', userId, `Plan set to ${plan} for ${months} months`);
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

    addDoc(logsRef, logData).catch(async () => {
      // Silently fail logging if permissions are missing for logs
    });
  }
}
