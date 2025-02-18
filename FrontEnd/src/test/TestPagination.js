import { usePagination } from "../hooks";

const TestPagination = () => {
  const { data, currentPage, totalPages, loading, nextPage, prevPage, hasNextPage, hasPrevPage } = usePagination(
    0,
    "/api/v1/users",
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.username}</li>
        ))}
      </ul>

      <div>
        {hasPrevPage && <button onClick={prevPage}>Previous</button>}
        <span>
          {" "}
          Page {currentPage + 1} of {totalPages}{" "}
        </span>
        {hasNextPage && <button onClick={nextPage}>Next</button>}
      </div>
    </div>
  );
};

export default TestPagination;
