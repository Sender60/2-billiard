import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Header from './components/header';

import Home from './pages/Home';
import React from 'react';

import Loadable from 'react-loadable';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Загрузка корзины...</div>,
});

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Cart"
            element={
              <React.Suspense fallback={<div>Загрузка корзины...</div>}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <React.Suspense fallback={<div>Загрузка...</div>}>
                <FullPizza />
              </React.Suspense>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
