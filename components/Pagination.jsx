"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages < 2) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        className="page-button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
        <button
          key={number}
          onClick={() => setPage(number)}
          className={`page-button ${page === number ? "page-active" : ""}`}
        >
          {number}
        </button>
      ))}
      <button
        className="page-button"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
