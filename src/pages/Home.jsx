import React, { useContext, useEffect } from 'react';

import Categories from '../components/сategories';
import Sort from '../components/sort';
import PizzaBlock from '../components/pizza-block';
import Skeleton from '../components/pizza-block/Skeleton';
import Pagination from '../components/pagination';
import { SearchContext } from '../App';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slice/filterSlice';

import { fetchPizzas } from '../redux/slice/pizzaSlice';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const items = useSelector((state) => state.pizza.items);
  const status = useSelector((state) => state.pizza.status);

  const { searchValue } = useContext(SearchContext);
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const pizzas = items
    .filter((obj) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const getPizza = async () => {
    dispatch(
      fetchPizzas({
        category,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizza();
  }, [categoryId, sortType, searchValue, currentPage, category]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
