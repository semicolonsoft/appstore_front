import { Box } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Box display={"flex"} sx={{ flexDirection: "column" }} height={1}>
      <Header />
      <Box flex={1}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Layout;
