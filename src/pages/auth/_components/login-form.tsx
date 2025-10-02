import TextInputField from '@/components/form/TextInputField';
import { Button } from '@/components/ui/button';
import { Spinner, useDisclosure } from '@nextui-org/react';
import { useFormik } from 'formik';
import { env } from '@/utils';
import useMutateApi from '@/hooks/useMutateApi';
import { toast } from 'sonner';
import { useState } from 'react';
import { isArray } from 'lodash';
import { onUpdateAuthSlice } from '@/store/features/auth';
import { jwtDecode } from 'jwt-decode';
import store from '@/store/store';
import { initials } from '@/utils';
import CustomModal from '@/components/custom-modal/modal';
import PasswordResetModal from './password.reset';
import * as Yup from 'yup';

const LogInForm = () => {
  // const navigate = useNavigate();

  const loginSchema = Yup.object({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const [organizations, setOrganizations] = useState<Array<any>>([]);
  const { ...form } = useFormik({
    initialValues: {
      email: '',
      password: '',
      organizationId: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutate({ ...values, username: values.email });
    },
  });
  const resetPasswordModal = useDisclosure();
  const organizationListModal = useDisclosure();
  const { mutate, isLoading } = useMutateApi({
    key: ['login'],
    url: env().DASHBOARD_API_URL + '/auth/authenticate',
    onSuccess(data: { user: IAuthResponse; data: any[] }) {
      if (isArray(data?.data)) {
        setOrganizations(data?.data);
        organizationListModal.onOpen();
        return;
      }

      const user_data = data?.user;

      const decoded: IDecoded = jwtDecode(user_data?.accessToken);
      const user = decoded.user_info;
      store.dispatch(
        onUpdateAuthSlice({
          //   sector: user.organization?.sector,
          isAuthenticated: true,
          token: {
            access: user_data?.accessToken,
            refresh: user_data?.refreshToken,
            expiresIn: user_data?.expiresIn,
          },
          organization: { ...user_data.organization },
          userInfo: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            channel: user.channel,
            permissions: decoded.permissions,
            roles: user_data.roles,
          },
        })
      );

      setOrganizations([]);
    },
    onError(error) {
      toast.error(error?.response?.data?.message);
    },
    alt: true,
  });

  return (
    <form
      action="#"
      onSubmit={form.handleSubmit}
      className="flex  flex-col gap-3"
    >
      {fields?.map((e, i) => {
        return (
          <TextInputField
            {...e}
            {...form}
            key={i}
            boldenLabel
            labelColor="#000"
            bgColor="#fff"
            labelFontSize="text-[0.95rem]"
            labelMarginBottom="mb-1"
            extraClassName="  w-96"
          />
        );
      })}

      <div className="flex items-center  justify-between">
        <span className="flex items-center justify-between "></span>
        <button
          className=""
          type="button"
          onClick={() => resetPasswordModal.onOpen()}
        >
          <h4 className="text-primary-green font-medium">Forget password?</h4>
        </button>
      </div>
      <Button
        type="submit"
        className="bg-fg-500 hover:bg-fg-600 text-[1rem]"
        disabled={isLoading}
      >
        {isLoading ? <Spinner color="current" size="sm" /> : 'Sign In'}
      </Button>

      {/* <ResetPasswordModal
        isOpen={resetPasswordModal.isOpen}
        onOpenChange={resetPasswordModal.onOpenChange}
      />*/}
      <PasswordResetModal
        isOpen={resetPasswordModal.isOpen}
        onOpenChange={resetPasswordModal.onOpenChange}
      />

      <OrganizationListModal
        isOpen={organizationListModal.isOpen}
        onOpenChange={organizationListModal.onOpenChange}
        organization={organizations}
        onFunc={(i) => {
          form.setFieldValue('organizationId', i);
          form.submitForm();
        }}
      />
    </form>
  );
};

interface IOrganizationList {
  organization: Array<any>;
  isOpen: boolean;
  onOpenChange: () => void;
  onFunc: (value: string) => void;
}

const OrganizationListModal = ({
  organization,
  isOpen,
  onOpenChange,
  onFunc,
}: IOrganizationList) => {
  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      header={'Organizations'}
      body={
        <div className="grid grid-cols-2 mt-2 mb-8 gap-2 px-4 w-full">
          {Array.from(organization)
            .filter((i) => i.organization?.sector === 'banking')
            .map((item: any, index: number) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onFunc(item?.organization?.id);
                  onOpenChange();
                }}
                className={`flex flex-row items-center p-[12px] border rounded-md cursor-pointer hover:bg-gray-50 max-h-32 hover:border-secondary hover:bg-secondary/5 hover:text-primary-black gap-x-2 text-ellipsis group`}
              >
                <div
                  className={`h-[2rem] group-hover:bg-fg-100 bg-fg-50 p-1 px-2 rounded hover:text-primary-black`}
                >
                  {initials(item.organization?.name)}
                </div>
                <div className="leading-5 text-sm whitespace-nowrap">
                  {item.organization?.name}
                </div>
              </button>
            ))}
        </div>
      }
    />
  );
};

const fields = [
  {
    id: 'email',
    type: 'text',
    placeholder: 'e.g: example@gmail.com',
    label: 'Email',
  },
  {
    id: 'password',
    type: 'password',
    placeholder: '••••••••',
    label: 'Password',
  },
];

export interface IDecoded {
  user_info: UserInfo;
  roles: string[];
  permissions: string[];
}

export interface UserInfo {
  channel: string;
  email: string;
  name: string;
  user_id: string;
  roles: string[];
  organization: Organization;
}

export interface IAuthResponse {
  name: string;
  email: string;
  sub: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  roles: string[];
  permissions: string[];
  organization: Organization;
}

export interface Organization {
  branch: string;
  code: string;
  //   createdAt: Date;
  id: string;
  name: string;
  sector: string;
}

export default LogInForm;
