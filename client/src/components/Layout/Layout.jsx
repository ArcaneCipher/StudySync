import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  const location = useLocation();

  // Add routes where you want to hide header/footer/sidebar
  const hideLayout = ["/login", "/register"];

  const shouldHideLayout = hideLayout.includes(location.pathname);

  return (
    <>
      {!shouldHideLayout && <Header />}
      {!shouldHideLayout && <Sidebar />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default Layout;
