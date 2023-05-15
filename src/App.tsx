import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/style.scss';
import Home from './views/Home';
import Products from './views/Products';
import Profile from './views/Profile';
import SingleProduct from './views/SingleProduct';
import Cart from './views/Cart';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/:id' element={<SingleProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
