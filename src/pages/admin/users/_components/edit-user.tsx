import CustomModal from '@/components/custom-modal/modal';
import {
  CustomInputTextField,
  CustomSelectField,
} from '@/components/form/inputs';
import { Button } from '@/components/ui/button';
import { mutateFn } from '@/config/global.mutation';
import useUserAndRoles from '@/hooks/useUserAndRoles';
import { queryClient } from '@/main';
import { RootState } from '@/store/store';
import { env } from '@/utils';
import { Spinner } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

interface IEditUserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  user: any;
}
const EditUserComponent = ({
  isOpen,
  onOpenChange,
  user,
}: IEditUserModalProps) => {
  const { ...form } = useFormik({
    initialValues: {
      roles: user?.original?.roles || '',
      fullname: user?.original?.staff?.fullname || '',
      email: user?.original?.staff?.email || '',
      phone: user?.original?.staff?.phone || '',
    },
    onSubmit: (values) => {
      mutate({ ...values });
    },
    enableReinitialize: true,
  });
  const [, role_list] = useUserAndRoles({});

  const { id } = useSelector((state: RootState) => state.auth.organization);
  const roles = role_list?.data?.data || [];
  const { isLoading, mutate } = useMutation({
    mutationKey: ['edit-user'],
    mutationFn: (variables: (typeof form)['values']) => {
      return mutateFn({
        url: env().DASHBOARD_API_URL + '/user/update',
        method: 'PATCH',
        data: {
          ...variables,
          id: user?.original?.staffId,
          staff: user?.original?.staffId,
        },
      });
    },
    onSuccess: () => {
      toast.success('User Updated successfully');
      queryClient.invalidateQueries(['organization']);
      form.resetForm();
      onOpenChange();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return (
    <CustomModal
      isDismissable
      isOpen={isOpen}
      placement="center"
      onOpenChange={onOpenChange}
      size="md"
      radius="sm"
      body={
        <div className="bg-white p-4">
          <div>
            <h4 className="text-[1.15rem] font-medium">Edit User</h4>
            <p className="text-default-500 font-extralight text-[0.9rem]">
              Fill out the following requirement
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {fields?.map((e, i) => {
              const fid = e.id as keyof {
                roles: any;
                fullname: any;
                email: any;
                phone: any;
              };
              switch (e.type) {
                case 'text':
                  return (
                    <CustomInputTextField
                      {...e}
                      {...form}
                      type={e.type}
                      value={form.values[fid]}
                      labelPlacement="inside"
                      key={i}
                      name={e.id}
                      inputProps={{
                        onChange: (event) => {
                          form.setFieldValue(e.id, event.currentTarget.value);
                        },
                      }}
                    />
                  );

                case 'select':
                  return (
                    <CustomSelectField
                      label={'Roles'}
                      value={''}
                      options={roles
                        ?.filter((i: any) => i.name.includes('sentinel'))
                        ?.filter((i: any) => {
                          if (i?.description?.includes('a89')) {
                            return i?.description === id;
                          }
                          return true;
                        })
                        ?.map((item: any) => ({
                          label: String(item.name).split(':')[1],
                          value: item.id,
                        }))}
                      labelPlacement="inside"
                      selectionMode={'multiple'}
                      placeholder={'e.g. agent'}
                      className="bg-white"
                      inputProps={{
                        onChange: (e) =>
                          form.setFieldValue('roles', e.target.value),
                        name: 'roles',
                        selectedKeys: String(form.values.roles).split(','),
                      }}
                    />
                  );
              }
            })}
          </div>

          <Button
            onClick={() => form.handleSubmit()}
            type="submit"
            className="bg-fg-500 hover:bg-fg-600 text-[1rem] w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="current" size="sm" /> : 'Submit'}
          </Button>
        </div>
      }
    />
  );
};

const fields = [
  {
    id: 'fullname',
    type: 'text',
    placeholder: 'e.g: Simon Bill',
    label: 'Fullname',
  },
  {
    id: 'email',
    type: 'text',
    placeholder: 'e.g john@example.com',
    label: 'Email Address',
  },
  {
    id: 'phone',
    type: 'text',
    placeholder: 'e.g. 0212312213',
    label: 'Phone Number',
  },
  {
    id: 'roles',
    type: 'select',
    placeholder: 'e.g. Agent',
    label: 'Phone Number',
  },
];
export default EditUserComponent;
