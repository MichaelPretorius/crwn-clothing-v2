import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { DirectoryItem } from '../directory/directory';

import { DirectoryItemContainer, BackgroundImage, Body } from './directory-item.styles';

type DirectoryItemProps = {
	category: DirectoryItem;
};

const DirectoryItemComponent: FC<DirectoryItemProps> = ({ category: { imageUrl, title, route } }) => {
	const navigate = useNavigate();

	const onNavigateHandler = () => navigate(`shop/${route}`);

	return (
		<DirectoryItemContainer onClick={onNavigateHandler}>
			<BackgroundImage imageUrl={imageUrl} />
			<Body>
				<h2>{title}</h2>
				<p>Shop Now</p>
			</Body>
		</DirectoryItemContainer>
	);
};

export default DirectoryItemComponent;
