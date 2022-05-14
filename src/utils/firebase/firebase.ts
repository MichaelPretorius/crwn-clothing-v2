import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from 'firebase/firestore';
import {
	getAuth,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	User,
	NextOrObserver,
} from 'firebase/auth';

import { Category } from '../../redux/categories/categories.types';
const firebaseConfig = {
	apiKey: 'AIzaSyBqH_ujIn4G6NvUgwlImRKkVs96yDycUUA',
	authDomain: 'crwn-db-458ee.firebaseapp.com',
	databaseURL: 'https://crwn-db-458ee.firebaseio.com',
	projectId: 'crwn-db-458ee',
	storageBucket: 'crwn-db-458ee.appspot.com',
	messagingSenderId: '206533014226',
	appId: '1:206533014226:web:966addc0352a88fa96330b',
};

initializeApp(firebaseConfig);

// AUTH
// -------------------------
export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(auth, callback);

// DB
// -------------------------
export const db = getFirestore();

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalInfo = {} as AdditionalInformation,
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo });
		} catch (error) {
			console.log('error creating the user ', error);
		}
	}

	return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export type ObjectToAdd = {
	title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[],
): Promise<void> => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach(object => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});

	await batch.commit();
};

export const getCollectionAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	// MOVING BUSINESS LOGIC TO REDUX SELECTORS
	// const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
	// 	const { title, items } = docSnapshot.data();
	// 	acc[title.toLowerCase()] = items;
	// 	return acc;
	// }, {});
	// return categoryMap;

	return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
};
