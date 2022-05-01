import SignUpForm from '../../components/sign-up-form/sign-up-form';
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase';

const SignIn = () => {
	const logGoogleUser = async () => {
		const res = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(res.user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign in with Google popup</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
