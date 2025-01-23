import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  // Function to handle page changes
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  // Render the pagination buttons and page numbers
  return (
    <div className="flex justify-center mt-4">
      <nav aria-label="Pagination">
        <ul className="inline-flex items-center space-x-1">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-boxdark dark:border-strokedark rounded-l-lg hover:bg-gray-100 dark:hover:bg-strokehover disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-strokedark"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
          </li>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <li key={pageNumber}>
                <button
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1.5 text-sm font-medium border border-gray-300 dark:border-strokedark rounded-lg hover:bg-gray-100 dark:hover:bg-strokehover ${currentPage === pageNumber ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-white' : 'bg-white text-gray-500 dark:bg-boxdark dark:text-white'}`}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}

          {/* Next Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1.5 text-sm font-medium text-gray-500 bg-white border border-gray-300 dark:bg-boxdark dark:border-strokedark rounded-r-lg hover:bg-gray-100 dark:hover:bg-strokehover disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-strokedark"
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
