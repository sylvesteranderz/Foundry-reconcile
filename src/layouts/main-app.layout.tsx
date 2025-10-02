import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { initials } from '@/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { onLogout as logOut } from '@/store/features/auth';
import useUserAndRoles from '@/hooks/useUserAndRoles';
import { useAuth0 } from '@auth0/auth0-react';
const MainAppLayout = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useUserAndRoles({});
  const auth = useAuth0();

  async function onLogout() {
    try {
      auth.logout({ logoutParams: { returnTo: window.location.origin } });
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative ">
      <div className="absolute lg:top-8 lg:right-10  top-4 right-4 cursor-pointer z-50">
        <div className="flex items-center gap-2">
          <div
            className={
              'size-10 border border-fg-600 bg-fg-700 rounded-full grid place-items-center'
            }
          >
            <p className={'text-white'}> {initials(userInfo?.name)}</p>
          </div>
          <div className="flex flex-col leading-none">
            <p className={'text-fg-900 font-medium'}>
              {userInfo?.name}
              <br />
              <p
                className={'text-fg-900 font-light text-[0.75rem] mt-[0.2rem]'}
              >
                {userInfo?.email}
              </p>
            </p>
          </div>

          <div
            className="flex items-center justify-center  cursor-pointer hover:bg-fg-50 rounded px-3 py-3 h-full"
            role="button"
            onClick={() => onLogout()}
          >
            <Icon
              icon="hugeicons:logout-03"
              className="text-fg-900 text-[1.2rem]"
            />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MainAppLayout;
