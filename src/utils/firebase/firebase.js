import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBqH_ujIn4G6NvUgwlImRKkVs96yDycUUA',
	authDomain: 'crwn-db-458ee.firebaseapp.com',
	databaseURL: 'https://crwn-db-458ee.firebaseio.com',
	projectId: 'crwn-db-458ee',
	storageBucket: 'crwn-db-458ee.appspot.com',
	messagingSenderId: '206533014226',
	appId: '1:206533014226:web:966addc0352a88fa96330b',
};

const firebaseApp = initializeApp(firebaseConfig);

// AUTH
// -------------------------
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

// DB
// -------------------------
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo });
		} catch (error) {
			console.log('error creating the user ', error.message);
		}
	}

	return userDocRef;
};
