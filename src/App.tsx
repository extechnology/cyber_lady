import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

import { Header } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import { Loader } from './components/shared/Loader';
import ScrollToTop from './components/shared/ScrollToTop';

const Home = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/DetailPage"));
const Contact = lazy(() => import("./pages/ContactPage"));
const Products = lazy(() => import("./pages/ProductsPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));


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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}

export default App
