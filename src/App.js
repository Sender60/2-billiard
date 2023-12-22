import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Header from './components/header';

import Home from './pages/Home';
import NotFoundBlock from './components/not-found-block';
import { Cart } from './pages/Cart';

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
