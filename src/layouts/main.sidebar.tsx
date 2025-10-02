/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomDropdown } from '@/components/shared/custom.dropdown';
import useMutateApi from '@/hooks/useMutateApi';
import useQueryApi from '@/hooks/useQueryApi';
import { RootState } from '@/store/store';
import { env } from '@/utils';
import { useAuth0 } from '@auth0/auth0-react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { lowerCase } from 'lodash';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { onLogout as logOut } from '@/store/features/auth';

const SideBar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { organization, userInfo } = useSelector(
    (state: RootState) => state.auth
  );
  const auth = useAuth0();

  function highlight(tuple: any) {
    if (pathname === `/${tuple[0]}`) return true;

    if (pathname.includes(tuple[0]) && !tuple[1]) return true;

    return false;
  }

  async function onLogout() {
    try {
      auth.logout({ logoutParams: { returnTo: window.location.origin } });
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  }

  const { data } = useQueryApi({
    key: ['organization-list'],
    url: env().DASHBOARD_API_URL + '/a89/organization/list',
    params: { full_query: false, uid: userInfo.id },
  });

  const organization_list = data
    ?.filter((i: any) => ['banking', 'api'].includes(i.sector))
    ?.map((i: any) => ({
      label: i.name,
      key: i.id,
    }));

  const switch_organizations = organization_list?.length > 1;

  const { mutate: onSwitchSession } = useMutateApi({
    key: ['switch session'],
    url: env().DASHBOARD_API_URL + '/auth/switch-session',
    async onSuccess() {
      auth.logout({ logoutParams: { returnTo: window.location.origin } });
    },
  });

  const currentModule = '';
  return (
    <div className="w-full h-screen py-4 px-2 border-r">
      <div
        onClick={() => navigate('/dashboard')}
        className="grid grid-cols-[2rem,1fr] gap-x-2 pt-2 place-items-center hover:cursor-pointer"
      >
        <img src="/icons/logo-dark.svg" className="w-[50%]" />
        <div className="flex flex-col mr-auto text-gray-600">
          <h1 className="font-medium capitalize">Foundry</h1>
        </div>
      </div>

      <div className="flex flex-col w-full h-[calc(100%-1rem)] mx-auto py-8 text-sm">
        {MenuItems(currentModule, []).map((item, index) => {
          const isHighlighted = highlight(item.parent);
          const has_access = true;

          return has_access ? (
            <div
              key={index}
              className={`flex flex-col w-full nav ${
                isHighlighted ? 'bg-gray-200/40' : 'h-12'
              } rounded-xl p-1 overflow-y-hidden duration-300`}
            >
              <button
                key={index}
                onClick={() => navigate(item.link)}
                className={`${
                  isHighlighted
                    ? `text-black`
                    : 'hover:bg-gray-200/10 text-gray-500'
                } rounded-xl p-2 flex flex-row gap-x-3 items-center`}
              >
                <Icon
                  icon={item.icon}
                  className={`text-[19px] flex-shrink-0 ${item?.iconStyle}`}
                />

                <p className="mt-[2px] whitespace-nowrap">{item.title}</p>
              </button>

              <div className="flex flex-col pl-4 ">
                {item.sublinks.map((sublink, index) => {
                  const isHighlighted = highlight(sublink.parent);
                  //   const has_access = HasPermittedRole(sublink.permitted_roles);

                  return has_access ? (
                    <button
                      key={index}
                      onClick={() => navigate(sublink.link)}
                      className={`${
                        isHighlighted
                          ? 'text-black bg-white shadow'
                          : 'hover:bg-gray-200/10 text-gray-500'
                      } rounded-xl scrollbar-hide p-2 flex flex-row gap-x-2 items-center my-1 overflow-auto text-ellipsis`}
                    >
                      <Icon
                        icon={sublink.icon}
                        className={`text-[19px] flex-shrink-0 ${sublink?.iconStyle}`}
                      />

                      <p className="mt-[2px] whitespace-nowrap ">
                        {sublink.title}
                      </p>
                    </button>
                  ) : (
                    <React.Fragment />
                  );
                })}
              </div>
            </div>
          ) : (
            <React.Fragment />
          );
        })}

        <div className="flex flex-col mt-auto gap-y-4 pt-4">
          {switch_organizations && (
            <CustomDropdown
              options={organization_list || []}
              label={
                organization_list?.find((i: any) => i.key === organization?.id)
                  ?.label
              }
              value={organization?.id as any}
              onclick={function (key: React.Key): void {
                onSwitchSession({ oid: key });
              }}
              style="text-left px-0 bg-gray-100"
            />
          )}

          <button
            onClick={() => onLogout()}
            className="text-standard w-full flex  items-center p-2 rounded-lg gap-x-2 text-gray-600 hover:text-white transition-all duration-500 hover:bg-red-600"
          >
            <Icon icon="bi:dash-circle" rotate={2} fontSize={20} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

interface Links {
  title: string;
  link: string;
  icon: string;
  iconStyle?: string;
  permitted_roles: string[];
  sublinks: Array<{
    title: string;
    link: string;
    icon: string;
    iconStyle?: string;
    parent: any;
    permitted_roles: string[];
  }>;
  parent: any;
}

const MenuItems = (currentModule: string, permissions = ['']): Array<Links> => {
  const items = {
    '': [
      {
        title: 'Overview',
        icon: 'hugeicons:home-02',
        link: '/dashboard',
        parent: ['dashboard', true],
        permitted_roles: [],
        sublinks: [],
      },
      {
        title: 'Verifications',
        icon: 'hugeicons:user-id-verification',
        link: '/dashboard/verifications',
        parent: ['verifications', false],
        permitted_roles: [],
        sublinks: [],
      },
      {
        title: 'Wallet',
        icon: 'hugeicons:wallet-add-01',
        link: '/dashboard/wallet',
        parent: ['wallet', false],
        permitted_roles: [],
        sublinks: [],
      },
      {
        title: 'Users',
        icon: 'hugeicons:user-multiple',
        link: '/dashboard/users',
        parent: ['users', false],
        permitted_roles: [],
        sublinks: [],
      },
      {
        title: 'Reconciliation',
        icon: 'hugeicons:chart-01',
        link: '/dashboard/reconciliation',
        parent: ['reconciliation', false],
        permitted_roles: [],
        sublinks: [
          {
            title: 'Executive Dashboard',
            link: '/dashboard/reconciliation',
            icon: 'hugeicons:dashboard-01',
            iconStyle: '',
            parent: ['reconciliation', false],
            permitted_roles: [],
          },
          {
            title: 'Reconciliation Dashboard',
            link: '/dashboard/reconciliation-dashboard',
            icon: 'hugeicons:chart-01',
            iconStyle: '',
            parent: ['reconciliation-dashboard', false],
            permitted_roles: [],
          },
          {
            title: 'Reconciled Items',
            link: '/dashboard/ReconciledItems',
            icon: 'hugeicons:list-check-01',
            iconStyle: '',
            parent: ['ReconciledItems', false],
            permitted_roles: [],
          },
        ],
      },
      //   {
      //     title: 'Cash Management',
      //     icon: 'hugeicons:cashier-02',
      //     link: '/accounting/expense-and-cash-management',
      //     parent: ['expense-and-cash-management', false],
      //     permitted_roles: [],
      //     sublinks: [],
      //   },
      //   {
      //     title: 'Reports',
      //     icon: 'hugeicons:document-validation',
      //     link: '/accounting/reports',
      //     parent: ['report', false],
      //     permitted_roles: [],
      //     sublinks: [],
      //   },
      //   {
      //     title: 'Settings',
      //     icon: 'solar:settings-linear',
      //     link: '/accounting/settings',
      //     parent: ['settings', false],
      //     permitted_roles: [],
      //     sublinks: [],
      //   },
    ],
  }[currentModule] as unknown as Array<Links>;

  const availableGlobalModules: string[] = [];

  const extractModules = new Set(
    permissions.map((i) => lowerCase(i.split(':')[1]))
  );

  availableGlobalModules.forEach((i: any) => {
    if (Array.from(extractModules).includes(i.id)) {
      items.push(i);
    }
  });

  return items;
};

export default SideBar;
