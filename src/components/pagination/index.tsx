import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

type Props = { currentPage: number; onChangePage: (i: number) => void };

const Pagination = ({ currentPage, onChangePage }: Props) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(evt) => onChangePage(evt.selected + 1)}
    pageRangeDisplayed={4}
    pageCount={2}
    forcePage={currentPage - 1}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
);

export default Pagination;
