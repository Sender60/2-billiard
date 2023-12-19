import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Header from './components/header';

import Home from './pages/Home';
import NotFoundBlock from './components/not-found-block';
import { Cart } from './pages/Cart';

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/*" element={<NotFoundBlock />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
