import { FormInputLabel, Group, Input } from './form-input.styles';

const FormInput = ({ label, ...other }) => {
	return (
		<Group>
			<Input {...other} />
			{label && <FormInputLabel shrink={other.value.length}>{label}</FormInputLabel>}
		</Group>
	);
};

export default FormInput;
