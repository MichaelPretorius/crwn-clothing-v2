import './form-input.scss';

const FormInput = ({ label, ...other }) => {
	return (
		<div className="group">
			<input className="form-input" {...other} />
			{label && <label className={`${other.value.length ? 'shrink' : ''} form-input-label`}>{label}</label>}
		</div>
	);
};

export default FormInput;
