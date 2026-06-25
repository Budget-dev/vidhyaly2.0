
'use client';

import { 
  Firestore, 
  doc, 
  setDoc, 
  updateDoc, 
  serverTimestamp, 
  addDoc, 
  collection,
  deleteDoc
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export class AdminService {
  constructor(private db: Firestore) {}

  /**
   * Block or Unblock a user
   */
  async updateUserStatus(adminId: string, userId: string, status: 'active' | 'blocked', reason?: string) {
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
    this.logAction(adminId, status === 'blocked' ? 'BLOCK_USER' : 'UNBLOCK_USER', userId, reason);
  }

  /**
   * Soft delete a user
   */
  async softDeleteUser(adminId: string, userId: string) {
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

    this.logAction(adminId, 'SOFT_DELETE_USER', userId);
  }

  /**
   * Internal logging service
   */
  private async logAction(adminId: string, action: string, targetId: string, details?: string) {
    const logsRef = collection(this.db, 'audit_logs');
    const logData = {
      adminId,
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
