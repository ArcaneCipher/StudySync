import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useState } from 'react';

function Layout({ children }) {
  const location = useLocation();

  // Add routes where you want to hide header/footer/sidebar
  const hideLayout = ["/login", "/register"];

  const shouldHideLayout = hideLayout.includes(location.pathname);

  const [isCollapse, setIsCollapse] = useState(true);

  // Centralized collapse toggle function
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  
  return (
    <>
      {!shouldHideLayout && <Header  isCollapse={isCollapse} toggleCollapse={toggleCollapse}  />}
      {!shouldHideLayout && <Sidebar toggleCollapse={toggleCollapse}  />}
      <main>{children}</main>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default Layout;
