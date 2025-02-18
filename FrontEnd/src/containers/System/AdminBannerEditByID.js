import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { path } from "../../utils";
import { apiGetBannerById } from "../../services";
import { AdminBannerEdit } from "../../components";

const AdminBannerEditByID = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await apiGetBannerById(id);

        setData(response?.result);
      } catch (error) {
        navigate(path.ADMIN_BANNER);
      }
    };
    fetchData(id);
  }, [id, navigate]);

  if (!data) {
    // Optionally, you can return a loading indicator or null
    return <div>Loading...</div>; // Or return null;
  }
  return (
    <div>
      <AdminBannerEdit isEdit={true} banner={data} />
    </div>
  );
};

export default AdminBannerEditByID;
