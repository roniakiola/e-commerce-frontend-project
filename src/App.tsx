import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/style.scss';
import Home from './views/Home';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
