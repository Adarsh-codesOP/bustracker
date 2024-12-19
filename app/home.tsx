import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { trustedContactsManager, TrustedContact } from '../utils/trustedContacts';
import auth from '@react-native-firebase/auth';

export default function Home() {
  const [trustedContacts, setTrustedContacts] = useState<TrustedContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrustedContacts();
  }, []);

  const loadTrustedContacts = async () => {
    try {
      const userId = auth().currentUser?.uid;
      if (!userId) return;
      
      const contacts = await trustedContactsManager.getContacts(userId);
      setTrustedContacts(contacts);
    } catch (error) {
      console.error('Error loading contacts:', error);
      Alert.alert('Error', 'Failed to load trusted contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (type: 'saved' | 'current') => {
    // Handle location selection
    console.log(`Selected ${type} location`);
  };

  const handleStart = () => {
    // Handle start journey
    console.log('Starting journey');
  };

  const handleEditContact = async (contact: TrustedContact) => {
    // Handle edit contact
    console.log('Editing contact:', contact);
  };

  const handleAddNewContact = async () => {
    // Handle add new contact
    console.log('Adding new contact');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          {/* Location Selection Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Choose your location</Text>
            <View style={styles.locationButtons}>
              <TouchableOpacity
                style={styles.locationButton}
                onPress={() => handleLocationSelect('saved')}
              >
                <Text style={styles.buttonText}>Saved Location</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.locationButton}
                onPress={() => handleLocationSelect('current')}
              >
                <Text style={styles.buttonText}>Current Location</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStart}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Trusted People Section */}
          <View style={styles.section}>
            <Text style={styles.trustedPeopleTitle}>TRUSTED PEOPLE</Text>
            
            {/* Trusted People List */}
            <View style={styles.trustedPeopleList}>
              {loading ? (
                <ActivityIndicator size="large" color="#007AFF" />
              ) : (
                <>
                  {trustedContacts.map((contact) => (
                    <View key={contact.id} style={styles.trustedPersonCard}>
                      <Text style={styles.personName}>{contact.name}</Text>
                      <Text style={styles.personPhone}>{contact.phone}</Text>
                      <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => handleEditContact(contact)}
                      >
                        <Text style={styles.editButtonText}>Edit</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity 
                    style={styles.addPersonButton}
                    onPress={handleAddNewContact}
                  >
                    <Text style={styles.addPersonText}>+ Add Trusted Person</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  locationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  locationButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  startButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 20,
  },
  trustedPeopleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  trustedPeopleList: {
    gap: 15,
  },
  trustedPersonCard: {
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  personName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  personPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  editButton: {
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
  addPersonButton: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  addPersonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
}); 