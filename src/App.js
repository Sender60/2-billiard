import React, { useEffect, useState } from 'react';
import './scss/app.scss';
import Header from './components/header';
import Categories from './components/сategories';
import Sort from './components/sort';
import PizzaBlock from './components/pizza-block';
// import pizzas from './assets/pizzas.json';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://64d95baee947d30a260a13b5.mockapi.io/Items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
