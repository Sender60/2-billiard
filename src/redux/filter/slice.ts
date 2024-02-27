import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, SortItem } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  order: 'asc',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setOrder(state, action: PayloadAction<string>) {
      state.order = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setSearchValue, setOrder } =
  filterSlice.actions;

export default filterSlice.reducer;
