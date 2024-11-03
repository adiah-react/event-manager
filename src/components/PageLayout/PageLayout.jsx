import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <>
      <h1>Navigation</h1>
      <Outlet />
    </>
  );
};
export default PageLayout;
