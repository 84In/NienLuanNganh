import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetUserById } from "../../services";
import { AdminUserEdit } from "../../components";

import { path } from "../../utils/constant";

const AdminUserEditByID = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await apiGetUserById(id);
        setData(response?.result);
      } catch (error) {
        navigate(path.ADMIN_USER);
      }
    };
    fetchData(id);
  }, [id, navigate]);

  if (!data) {
    // Optionally, you can return a loading indicator or null
    return <div>Loading...</div>; // Or return null;
  }

  return <AdminUserEdit isEdit={true} user={data} />;
};

export default AdminUserEditByID;
