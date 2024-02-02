import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Header from './components/header';

import Home from './pages/Home';
import NotFoundBlock from './components/not-found-block';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MainLayout from './layout/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<FullPizza />} />
        <Route path="/*" element={<NotFoundBlock />} />
      </Route>
    </Routes>
  );
}

export default App;
