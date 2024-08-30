import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyA_jXytBDj9E_kYn37P1FD9gGqGTHcDvBE',
	authDomain: 'react-notes-9bd94.firebaseapp.com',
	projectId: 'react-notes-9bd94',
	storageBucket: 'react-notes-9bd94.appspot.com',
	messagingSenderId: '19115555195',
	appId: '1:19115555195:web:8fc71743e3a4ab447ca5de',
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, 'notes');
