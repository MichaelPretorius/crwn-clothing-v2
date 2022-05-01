import { useState } from 'react';

import './sign-in-form.scss';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFiels] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		const res = await signInWithGooglePopup();
		await createUserDocumentFromAuth(res.user);
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setFormFiels({ ...formFields, [name]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const res = await signInAuthUserWithEmailAndPassword(email, password);
			setFormFiels(defaultFormFields);
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('Incorrect password!');
					break;
				case 'auth/user-not-found':
					alert('No user associated with this email!');
					break;
				default:
					console.log('user sign in error ', error.message);
			}
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />
				<FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google sign in
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
