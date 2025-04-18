import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <>
      <Header />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
