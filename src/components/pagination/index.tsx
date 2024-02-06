import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

type Props = { currentPage: number; onChangePage: any };

const Pagination = ({ currentPage, onChangePage }: Props) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(evt) => onChangePage(evt.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
