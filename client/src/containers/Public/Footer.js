import { Box } from "@mui/material";
import React from "react";
import logo from "../../assets/images/logo2.png";
import { Link } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { TbMessageCircleFilled } from "react-icons/tb";

const Footer = () => {
  const supportInfo = [
    {
      name: "Chính sách đổi trả",
      url: "#",
    },
    {
      name: "Câu hỏi thường gặp",
      url: "#",
    },
    {
      name: "Số điện thoại hỗ trợ: 18001000",
      url: "#",
    },
    {
      name: "Email hỗ trợ: hotro@vanous.com",
      url: "#",
    },
    {
      name: "Báo lỗi: security@vanous.com",
      url: "#",
    },
  ];
  const creator = [
    {
      name: "Phạm Minh Sáng",
      info: [
        {
          icon: <FaFacebook style={{ height: "35px", width: "35px", color: "#0866ff" }} />,
          url: "https://www.facebook.com/pmss0168",
        },
        {
          icon: <FaGithub style={{ height: "35px", width: "35px", color: "black" }} />,
          url: "https://github.com/pmss0168",
        },
        {
          icon: <TbMessageCircleFilled style={{ height: "35px", width: "35px", color: "rgb(34 197 94)" }} />,
          url: "mailto:pmss0168@gmail.com",
        },
      ],
    },
    {
      name: "Nguyễn Trung Tín",
      info: [
        {
          icon: <FaFacebook style={{ height: "35px", width: "35px", color: "#0866ff" }} />,
          url: "https://www.facebook.com/n.trungtin2304",
        },
        {
          icon: <FaGithub style={{ height: "35px", width: "35px", color: "black" }} />,
          url: "https://github.com/84In",
        },
        {
          icon: <TbMessageCircleFilled style={{ height: "35px", width: "35px", color: "rgb(34 197 94)" }} />,
          url: "mailto:tinb2110979@student.ctu.edu.vn",
        },
      ],
    },
  ];
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
        width: "100%",
        height: "fit-content",
        minHeight: "90px",
        maxHeight: "fit-content",
        padding: "16px",
      }}
    >
      <Grid2 container>
        <Grid2
          item
          xs={12}
          md={6}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 2 }}
        >
          <Link to={"/"}>
            <img className="h-[80px] w-[210px] max-w-none object-contain" src={logo} alt="logo" />
          </Link>
          <h3 className="text-justify">
            Vanous là nền tảng thương mại điện tử hiện đại, mang đến cho khách hàng trải nghiệm mua sắm tốt nhất. Chúng
            tôi cung cấp đa dạng các sản phẩm, từ thời trang đến điện tử, với giá cả cạnh tranh và dịch vụ chăm sóc
            khách hàng đáng tin cậy. Tại Vanous, sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi!
          </h3>
        </Grid2>
        <Grid2
          item
          container
          xs={12}
          md={3}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: 2, gap: 1 }}
        >
          <h2 className="text-lg font-semibold">Hỗ trợ khách hàng</h2>
          <div className="flex flex-col gap-1">
            {supportInfo.map((item, index) => (
              <div className="h-full w-full" key={item.id}>
                <a href={item.url}>{item.name}</a>
              </div>
            ))}
          </div>
        </Grid2>
        <Grid2
          item
          container
          xs={12}
          md={3}
          sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: 2, gap: 1 }}
        >
          <h2 className="text-lg font-semibold">Kết nối với chúng tôi</h2>
          {creator.map((item, index) => (
            <Grid2 item xs={6} sx={{ width: "100%" }} key={item.name}>
              <h2 className="mb-2 text-lg">{item.name}</h2>
              <div className="flex w-full gap-6">
                {item.info.map((e, i) => (
                  <div>
                    <a href={e.url}>{e.icon}</a>
                  </div>
                ))}
              </div>
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Footer;