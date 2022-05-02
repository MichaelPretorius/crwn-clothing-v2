import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import './navigation.scss';
import { UserContext } from '../../contexts/user';
import { signOutUser } from '../../utils/firebase/firebase';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

const Navigation = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<CrwnLogo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							SIGN OUT
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							SIGN IN
						</Link>
					)}
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default Navigation;
