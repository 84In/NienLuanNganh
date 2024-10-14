import React, { useEffect, useState } from "react";
import { AdminTable, Loading, AdminItemPagination } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import Grid2 from "@mui/material/Unstable_Grid2";

const AdminProductContent = () => {
  const dispatch = useDispatch();
  const { data, currentPage, totalPages } = useSelector((state) => state.app.adminProducts);
  const [valuCurrentPage, setValueCurrentPage] = useState(currentPage);
  const [valueData, setValueDate] = useState(data);
  const [totalPage, setTotalPage] = useState(totalPages || 1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(actions.getAdminProducts(0));
  }, []);
  useEffect(() => {
    setValueDate(data);
    setValueCurrentPage(currentPage);
    setTotalPage(totalPages);
  }, [data, currentPage, totalPages]);

  useEffect(() => {
    dispatch(actions.getAdminProducts(valuCurrentPage));
  }, [valuCurrentPage]);

  useEffect(() => {
    if (!data) setLoading(true);
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  const reloadPage = () => {
    dispatch(actions.getAdminProducts(valuCurrentPage));
  };

  return (
    <AdminTable
      reloadPage={reloadPage}
      data={valueData}
      type={"product"}
      pagination={
        <Grid2 item xs={12}>
          <AdminItemPagination
            currentPage={valuCurrentPage}
            setCurrentPage={setValueCurrentPage}
            totalPages={totalPage}
          />
        </Grid2>
      }
    />
  );
};

export default AdminProductContent;
