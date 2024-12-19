import { firestore } from '../config/firebase';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface TrustedContact {
  id?: string;
  name: string;
  phone: string;
  email?: string;
}

export const trustedContactsManager = {
  async addContact(userId: string, contact: TrustedContact) {
    try {
      const contactRef = await firestore()
        .collection('users')
        .doc(userId)
        .collection('trustedContacts')
        .add(contact);
      return contactRef.id;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  },

  async getContacts(userId: string) {
    try {
      const snapshot = await firestore()
        .collection('users')
        .doc(userId)
        .collection('trustedContacts')
        .get();
      
      return snapshot.docs.map((doc: FirebaseFirestoreTypes.DocumentSnapshot) => ({
        id: doc.id,
        ...(doc.data() as Omit<TrustedContact, 'id'>)
      })) as TrustedContact[];
    } catch (error) {
      console.error('Error getting contacts:', error);
      throw error;
    }
  },

  async updateContact(userId: string, contactId: string, updates: Partial<TrustedContact>) {
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('trustedContacts')
        .doc(contactId)
        .update(updates);
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  async deleteContact(userId: string, contactId: string) {
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('trustedContacts')
        .doc(contactId)
        .delete();
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
}; 