import { useState } from 'react';
import { PaymentElement, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';

import { BUTTON_TYPE_CLASSES } from '../button/button';
import { FormContainer, PaymentButton, PaymentFormContainer } from './payment-form.styles';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectCartTotal } from '../../redux/cart/cart.selector';

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const currentUser = useSelector(selectCurrentUser);
	const amount = useSelector(selectCartTotal);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async e => {
		e.preventDefault();

		if (!stripe || !elements) console.log({ stripe, elements });
		if (!stripe || !elements) return;
		setIsProcessingPayment(true);

		const res = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: amount * 100 }),
		}).then(res => res.json());

		const {
			paymentIntent: { client_secret },
		} = res;
		console.log({ client_secret });

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		});

		setIsProcessingPayment(false);
		if (paymentResult.error) {
			alert(paymentResult.error);
		} else if (paymentResult.paymentIntent.status === 'succeeded') {
			alert('Payment Successful');
		}
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment:</h2>
				<PaymentElement />
				<PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
					Pay now
				</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
