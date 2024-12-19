import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Platform } from 'react-native';

if (Platform.OS === 'android') {
  // Only for Android
  require('../google-services.json');
} else if (Platform.OS === 'ios') {
  // Only for iOS
  require('../GoogleService-Info.plist');
}

export { auth, firestore }; 