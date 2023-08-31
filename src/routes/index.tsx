import { Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from '../components/Home/Home';

const AppRoutes = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
);

export default AppRoutes;