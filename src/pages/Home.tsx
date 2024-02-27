import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';

import Categories from '../components/сategories';
import Sort from '../components/sort';
import PizzaBlock from '../components/pizza-block';
import Skeleton from '../components/pizza-block/Skeleton';
import Pagination from '../components/pagination';

import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { selectFilter } from '../redux/filter/selectors';

import { fetchPizzas } from '../redux/pizza/slice';
import { selectPizzaData } from '../redux/pizza/selectors';

const Home = () => {
  const dispatch = useAppDispatch();
  const { categoryId, currentPage, searchValue, sort } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';
  const sortBy = sort.sortProperty.replace('-', '');

  const onChangeCategory = useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch],
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const getPizza = async () => {
    dispatch(
      fetchPizzas({
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizza();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, searchValue, currentPage, category, sort.sortProperty]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
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
            ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
            : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
