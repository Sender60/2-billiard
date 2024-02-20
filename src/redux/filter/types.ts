export type SortItem = {
  name: string;
  sortProperty: string;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortItem;
}
