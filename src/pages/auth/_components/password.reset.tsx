import { useFormik } from 'formik';
import useMutateApi from '@/hooks/useMutateApi';
import { env } from '@/utils';
import { toast } from 'sonner';
import CustomModal from '@/components/custom-modal/modal';
import TextInputField from '@/components/form/TextInputField';
import { Button } from '@/components/ui/button';
import { Spinner } from '@nextui-org/react';
interface IResetPasswordModal {
  isOpen: boolean;
  onOpenChange: () => void;
}

const PasswordResetModal = ({ isOpen, onOpenChange }: IResetPasswordModal) => {
  const { ...form } = useFormik({
    initialValues: {
      username: '',
      channel: 'staff',
    },
    onSubmit(values) {
      mutate({ email: values.username });
    },
  });
  const { mutate, isLoading } = useMutateApi({
    url: env().DASHBOARD_API_URL + '/auth/reset-request',
    onError(error) {
      console.log(error);
    },
    onSuccess(_) {
      form.resetForm();
      toast.success('Password reset link sent to email');
      onOpenChange();
    },
  });
  return (
    <CustomModal
      isOpen={isOpen}
      placement="top"
      onOpenChange={onOpenChange}
      header={<div className="text-sm text-center py-3">Reset Password</div>}
      size="sm"
      body={
        <div className="flex flex-col gap-y-4 px-6">
          <p className="text-center text-sm">
            A password reset link will be sent to the email provided if it
            exists
          </p>
          <TextInputField
            boldenLabel
            labelColor="#000"
            bgColor="#fff"
            labelFontSize="text-[0.95rem]"
            labelMarginBottom="mb-1"
            extraClassName="  w-full"
            id="username"
            {...form}
            label=""
            placeholder="e.g. john.doe@example.com"
          />
        </div>
      }
      footer={
        <div className="w-full mt-4">
          <Button
            type="submit"
            onClick={() => form.submitForm()}
            className="bg-fg-500 hover:bg-fg-600 text-[0.8rem] w-full"
            disabled={isLoading}
          >
            {isLoading ? <Spinner color="current" size="sm" /> : 'Submit'}
          </Button>
        </div>
      }
    />
  );
};

export default PasswordResetModal;
