import { Box, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import React, { memo, useEffect, useState } from "react";
import icons from "../../utils/icons";
import { AdminPolarAreaCharts, AdminTag, Loading } from "../../components";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Utils } from "../../utils";
import { apiAnalytics, apiGetPaymentMethod } from "../../services";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminBase = ({ user }) => {
  const { BiCoinStack, BiDollar, BiCoin } = icons;

  const [valueData, setValueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRevenues, setTotalRevenues] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [productsInMonth, setProductsInMonth] = useState(null);
  const [totalAmountInToday, setTotalAmountInToday] = useState(null);
  const [paymentSummaries, setPaymentSummaries] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);

  const fetchData = async () => {
    try {
      const response = await apiAnalytics();

      if (response?.code === 0) {
        setValueData(response?.result);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchDataPaymentMethod = async () => {
    try {
      const response = await apiGetPaymentMethod();

      if (response?.code === 0) {
        setPaymentMethods(response?.result?.content);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataPaymentMethod();
  }, []);

  useEffect(() => {
    setAllProducts(valueData?.allProducts);
    setTotalRevenues(valueData?.totalRevenues);
    setTotalAmountInToday(valueData?.totalRevenueInToday);
    setProductsInMonth(valueData?.productsInMonth);
    setPaymentSummaries(valueData?.paymentSummaries);
  }, [valueData]);

  const totalRevenueList = totalRevenues?.map((revenue) => revenue.totalRevenue);
  const valuePaymentList = paymentSummaries?.map((payment) => payment?.totalCount);
  const labelPaymentList = paymentSummaries
    ?.map((payment) => {
      const paymentMethod = paymentMethods && paymentMethods?.find((item) => item.id === payment?.paymentMethodId);
      return paymentMethod ? paymentMethod.name : null;
    })
    .filter(Boolean);

  console.log(totalRevenueList);

  const labels = Utils.months({ count: new Date().getMonth() + 1 });
  const data = {
    labels: labels,
    datasets: [
      {
        data: totalRevenueList,
        backgroundColor: [
          "rgba(255, 0, 0, 0.4)",
          "rgba(0, 255, 0, 0.4)",
          "rgba(0, 0, 255, 0.4)",
          "rgba(255, 255, 0, 0.4)",
          "rgba(255, 165, 0, 0.4)",
          "rgba(128, 0, 128, 0.4)",
          "rgba(255, 192, 203, 0.4)",
          "rgba(165, 42, 42, 0.4)",
          "rgba(128, 128, 128, 0.4)",
          "rgba(0, 255, 255, 0.4)",
          "rgba(255, 247, 0, 0.4)",
          "rgba(173, 216, 230, 0.4)",
        ],
        borderColor: [
          "rgba(255, 0, 0, 1)",
          "rgba(0, 255, 0, 1)",
          "rgba(0, 0, 255, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(255, 165, 0, 1)",
          "rgba(128, 0, 128, 1)",
          "rgba(255, 192, 203, 1)",
          "rgba(165, 42, 42, 1)",
          "rgba(128, 128, 128, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(255, 247, 0, 1)",
          "rgba(173, 216, 230, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Ẩn legend
      },
      title: {
        display: true,
        text: "Biểu đồ Doanh Thu Năm 2024 (VNĐ)", // Tên của đồ thị
      },
      // Các plugin khác nếu cần
    },
    responsive: true,
    // maintainAspectRatio: false, // Để chiều rộng và chiều cao có thể thay đổi
  };
  const commonBoxStyles = {
    borderRadius: "8px", // Mặc định bo góc
    height: "100px",
    bgcolor: "white",
    display: "flex",
    alignItems: "center",
    padding: "2px 4px", // Căn giữa theo trục dọc
    md: {
      borderRadius: "12px",
    },
  };

  if (loading) return <Loading />;
  console.log(labelPaymentList);

  return (
    <div className="flex flex-col gap-3 bg-gray-200 p-2">
      <div className="rounded-md bg-white p-2 text-2xl font-semibold underline-offset-1">Trang Quản Lý</div>
      <Box sx={{ flexGrow: 1 }} className="rounded-md">
        <Grid2 container spacing={2}>
          <Grid2 xs={12} sm={6} md={4}>
            <Box sx={{ ...commonBoxStyles }}>
              <AdminTag Icon={BiCoinStack} type="product" typeData="all" data={allProducts} />
            </Box>
          </Grid2>
          <Grid2 xs={12} sm={6} md={4}>
            <Box sx={{ ...commonBoxStyles }}>
              <AdminTag Icon={BiCoin} type="product" data={productsInMonth} />
            </Box>
          </Grid2>
          <Grid2 xs={12} sm={6} md={4}>
            <Box sx={{ ...commonBoxStyles }}>
              <AdminTag
                Icon={BiDollar}
                type="money"
                date={new Date(totalAmountInToday?.summaryDate).toLocaleDateString("vi-VN", {
                  timeZone: "Asia/Ho_Chi_Minh",
                  year: "numeric",
                  month: "long", // Tháng có thể là dạng chữ hoặc số
                  day: "2-digit",
                })}
                data={totalAmountInToday?.totalRevenue}
              />
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={6}>
          <Paper
            // className="flex flex-col items-center justify-center"
            elevation={3}
            style={{ padding: "16px", height: "100%" }}
          >
            <Typography variant="h6" align="center">
              Phương thức thanh toán 7 ngày qua
            </Typography>
            <div className="flex w-full items-center justify-center">
              <AdminPolarAreaCharts valueData={valuePaymentList} label={labelPaymentList} />
            </div>
          </Paper>
        </Grid2>

        <Grid2 item xs={12} md={6}>
          <Paper
            className="flex flex-col items-center justify-center"
            elevation={3}
            style={{ padding: "16px", height: "100%" }}
          >
            <Typography variant="h6" align="center">
              Thông tin doanh thu năm hiện tại
            </Typography>
            <Bar data={data} options={options} style={{ height: "350px", width: "100%" }} />
          </Paper>
        </Grid2>
      </Grid2>

      <Box sx={{ flexGrow: 1 }} className="w-full rounded-md">
        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <Box className="flex flex-col items-center justify-center rounded-md bg-white">
              <div className="flex h-10 w-full items-center justify-start rounded-tl-md rounded-tr-md bg-gray-100 p-4 font-semibold"></div>
              <div className="flex w-2/3 items-center justify-center"></div>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
};

export default memo(AdminBase);
