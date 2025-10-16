"use client";

import { useAppStore } from "@/store/useAppStore";

export default function Pagination() {
  const { currentPage, totalPages, setCurrentPage, users } = useAppStore();

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-whit border border-gray-300 
                disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-5 transition-colors
                 text-gray-700"
      >
        Previous
      </button>

      <div className="flex gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-4 py-2 rounded-md transition-colors ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-white  border border-gray-300 text-gray-70 hover:bg-gray-5"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-white  border border-gray-300 
                 disabled:opacity-50 disabled:cursor-not-allowed
                 hover:bg-gray-50 transition-colors
                 text-gray-700"
      >
        Next
      </button>
      <span className="text-sm text-gray-60">{users.length} total users</span>
    </div>
  );
}
