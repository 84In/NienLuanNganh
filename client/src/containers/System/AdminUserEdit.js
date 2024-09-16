import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetUserById } from "../../services";

import { path } from "../../utils/constant";

const AdminUserEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await apiGetUserById(id);
        setData(response);
      } catch (error) {
        navigate(path.ADMIN_USER);
      }
    };
    fetchData(id);
  }, [id]);
  console.log(data);

  return <div>Dữ liệu trong thẻ Data</div>;
};

export default AdminUserEdit;
