import React from 'react'

function Pagination({ totalCount, onPageChange, pageSize }) {

    const totalPages = Math.ceil(totalCount / pageSize);
  
    const handlePageClick = (pageNumber) => {
      onPageChange(pageNumber);
    };
  
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button className='' key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    );
  }

  export default Pagination
