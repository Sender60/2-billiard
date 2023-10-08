import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Header from './components/header';

import Home from './pages/Home';
import NotFoundBlock from './components/not-found-block';
import { Cart } from './pages/Cart';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
