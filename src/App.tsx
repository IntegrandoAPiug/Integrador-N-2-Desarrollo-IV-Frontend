import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Home from "./components/Home.tsx";
import Cart from './components/Cart.tsx'
import Contact from './components/Contact';
import './App.css'
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Productos from './components/Productos.tsx'

const App = () => {
  return (
    <BrowserRouter>
     <Header />

     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App;