import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type PizzaItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  status: Status;
  items: PizzaItem[];
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

type Params = {
  currentPage: number;
  search: string;
  category: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], Params>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { currentPage, search, category } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://64d95baee947d30a260a13b5.mockapi.io/Items?page=${currentPage}&limit=4&${category}${search}`,
    );
    return data;
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
