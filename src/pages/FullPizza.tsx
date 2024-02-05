import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://64d95baee947d30a260a13b5.mockapi.io/Items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Пицца не найден');
        navigate('/');
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={`${pizza.imageUrl}`} alt="Пицца" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
