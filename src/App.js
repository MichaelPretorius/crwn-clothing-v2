import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home';
import Navigation from './routes/navigation/navigation';
import SignIn from './routes/sign-in/sign-in';
import Shop from './routes/shop/shop';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path="sign-in" element={<SignIn />} />
				<Route path="shop" element={<Shop />} />
			</Route>
		</Routes>
	);
};

export default App;
