function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;