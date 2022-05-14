import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFiels] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFiels({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (password !== confirmPassword) return alert('Your passwords do not match');

		try {
			const user = await createAuthUserWithEmailAndPassword(email, password);
			if (!user) return;
			await createUserDocumentFromAuth(user.user, { displayName });
			setFormFiels(defaultFormFields);
		} catch (error) {
			if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) alert('Cannot create user, email already in use');
			console.log('user creation error ', (error as AuthError).message);
		}
	};

	return (
		<SignUpContainer>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					name="displayName"
					required
					onChange={handleChange}
					value={displayName}
				/>
				<FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email} />
				<FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />
				<FormInput
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					required
					onChange={handleChange}
					value={confirmPassword}
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
