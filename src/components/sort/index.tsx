import { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setOrder, setSort } from '../../redux/filter/slice';
import { SortItem } from '../../redux/filter/types';

type Props = {
  value: SortItem;
};

const Sort = memo(({ value }: Props) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  type sortList = {
    name: string;
    sortProperty: string;
    order: string;
  };

  const list: sortList[] = [
    { name: 'популярности', sortProperty: 'rating', order: 'asc' },
    { name: 'цене (по возрастанию)', sortProperty: 'price', order: 'asc' },
    { name: 'цене (по убыванию)', sortProperty: '-price', order: 'desc' },
    { name: 'алфавиту', sortProperty: 'title', order: 'asc' },
  ];

  const onClickListItem = (obj: sortList) => {
    dispatch(setSort(obj));
    setOpen(false);
    dispatch(setOrder(obj.order));
  };

  const handleSortingChange = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setOpen(!open);
  };

  useEffect(() => {
    const documentClickHandler = () => {
      setOpen(false);
    };
    if (open) {
      document.body.addEventListener('click', documentClickHandler);
    }
    return () => {
      document.body.removeEventListener('click', documentClickHandler);
    };
  }, [open]);

  return (
    <div className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={handleSortingChange}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
