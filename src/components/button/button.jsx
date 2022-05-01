import './button.scss';

const BUTTON_TYPE_CLASSES = {
	google: 'google-sign-in',
	inverted: 'inverted',
};

const Button = ({ children, buttonType, ...other }) => {
	return (
		<button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...other}>
			{children}
		</button>
	);
};

export default Button;
