import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};

export default AppLayout;
