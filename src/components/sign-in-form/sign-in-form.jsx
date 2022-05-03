import { useState } from 'react';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button';
import FormInput from '../form-input/form-input';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase';
import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFiels] = useState(defaultFormFields);
	const { email, password } = formFields;

	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	const handleChange = event => {
		const { name, value } = event.target;
		setFormFiels({ ...formFields, [name]: value });
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(email, password);
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
		<SignInContainer>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />
				<FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
				<ButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
						Google sign in
					</Button>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
