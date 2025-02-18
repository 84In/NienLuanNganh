import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiGetPromotionById } from "../../services";
import { path } from "../../utils";
import { AdminPromotionEdit } from "../../components";

const AdminPromotionEditByID = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await apiGetPromotionById(id);
        // console.log(response);

        setData(response?.result);
      } catch (error) {
        navigate(path.ADMIN_PROMOTION);
      }
    };
    fetchData(id);
  }, [id, navigate]);

  if (!data) {
    // Optionally, you can return a loading indicator or null
    return <div>Loading...</div>; // Or return null;
  }
  return <AdminPromotionEdit isEdit={true} promotion={data} />;
};

export default AdminPromotionEditByID;
