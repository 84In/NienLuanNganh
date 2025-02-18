import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetCategoryById } from "../../services";
import { path } from "../../utils";
import { AdminCategoryEdit } from "../../components";

const AdminCategoryEditByID = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await apiGetCategoryById(id);

        setData(response?.result);
      } catch (error) {
        navigate(path.ADMIN_CATEROGY);
      }
    };
    fetchData(id);
  }, [id, navigate]);

  if (!data) {
    // Optionally, you can return a loading indicator or null
    return <div>Loading...</div>; // Or return null;
  }

  return <AdminCategoryEdit isEdit={true} category={data} />;
};

export default AdminCategoryEditByID;
