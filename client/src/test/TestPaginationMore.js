import React from "react";
import { Loading } from "../components";
import { usePaginationMore } from "../hooks";

const TestPaginationMore = () => {
  const { data, loading, loadMore, hasMore } = usePaginationMore(2, `/api/v1/users`);

  if (loading) return <Loading />;

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>

      {hasMore && <button onClick={loadMore}>Show More</button>}
    </div>
  );
};

export default TestPaginationMore;
