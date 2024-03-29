import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBxpMDxWNS-uriX18a6iF3emni6cqw3Lxk',
	authDomain: 'tradetrek-3347c.firebaseapp.com',
	databaseURL:
		'https://tradetrek-3347c-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'tradetrek-3347c',
	storageBucket: 'tradetrek-3347c.appspot.com',
	messagingSenderId: '514709720396',
	appId: '1:514709720396:web:e7a3b7ed41efa81e0e53e9',
	measurementId: 'G-70MSC7N63F',
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const auth = getAuth(app);
export { firestore, auth, signOut };
