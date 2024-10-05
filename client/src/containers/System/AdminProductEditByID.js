import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetProductById } from "../../services";
import { path } from "../../utils/constant";
import { AdminProductEdit } from "../../components";

const AdminProductEditByID = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await apiGetProductById(id);
        console.log(response);

        setData(response?.result);
      } catch (error) {
        navigate(path.ADMIN_PRODUCT);
      }
    };
    fetchData(id);
  }, [id, navigate]);

  if (!data) {
    // Optionally, you can return a loading indicator or null
    return <div>Loading...</div>; // Or return null;
  }

  return <AdminProductEdit product={data} />;
};

export default AdminProductEditByID;
