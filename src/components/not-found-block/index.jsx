import React from 'react';
import style from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={style.root}>
      <h1>
        <span>😔</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={style.description}>
        К сожалению, такая страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};

export default NotFoundBlock;
