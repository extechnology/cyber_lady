import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { Header } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import { Loader } from './components/shared/Loader';
import ScrollToTop from './components/shared/ScrollToTop';

const Home = lazy(() => import("./pages/HomePage"));
const Products = lazy(() => import("./pages/ProductsPage"));
const Product = lazy(() => import("./pages/DetailPage"));
const Contact = lazy(() => import("./pages/ContactPage"));


function App() {

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
