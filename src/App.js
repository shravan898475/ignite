import Home from './Component/Home';
import Products from './Component/Products';
import Details from './Component/Details';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/book/:id" element={<Details />} />
    </Routes>
  </Router>
  );
}

export default App;
