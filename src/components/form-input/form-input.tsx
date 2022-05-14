import { FC, InputHTMLAttributes } from 'react';

import { FormInputLabel, Group, Input } from './form-input.styles';

export type FormInputProps = {
	label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...other }) => {
	return (
		<Group>
			<Input {...other} />
			{label && (
				<FormInputLabel shrink={Boolean(typeof other?.value === 'string' && other?.value?.length)}>
					{label}
				</FormInputLabel>
			)}
		</Group>
	);
};

export default FormInput;
