import useUserAndRoles from '@/hooks/useUserAndRoles';
import { onLogout } from '@/store/features/auth';
import { RootState } from '@/store/store';
import { initials } from '@/utils';
import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import SideBar from './main.sidebar';
const AdminDashboardLayout = () => {
  const dispatch = useDispatch();
  const {
    userInfo,
    organization: { name },
  } = useSelector((state: RootState) => state.auth);
  const topbarRef = useRef<HTMLDivElement>(null);
  const [topbarHeight, setTopbarHeight] = useState(0);
  const auth = useAuth0();

  useLayoutEffect(() => {
    if (topbarRef.current) {
      setTopbarHeight(topbarRef.current.offsetHeight);
    }
  }, []);

  useUserAndRoles({});
  return (
    <AnimatePresence>
      <div className="grid grid-cols-[0.15fr,0.85fr] overflow-hidden ">
        <div className="">
          <SideBar />
        </div>
        <div>
          <div
            className="border-b h-fit p-3 flex items-center justify-between"
            ref={topbarRef}>
            <h4>{name}</h4>
          </div>
          <div
            className="overflow-y-auto scrollbar-hide"
            style={{ height: `calc(100vh - ${topbarHeight}px)` }}>
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="h-full">
              <Outlet />
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AdminDashboardLayout;
