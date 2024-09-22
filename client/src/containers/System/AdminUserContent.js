import React, { useEffect, useState } from "react";
import AdminTable from "../../components/System/Items/AdminTable";
import { apiGetUsers } from "../../services";
import { Loading } from "../../components";

const AdminUserContent = () => {
  const [dataUsers, setDataUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetUsers();

        setDataUsers(response?.result.content);
      } catch (error) {
        return;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <AdminTable data={dataUsers} />;
};

export default AdminUserContent;
