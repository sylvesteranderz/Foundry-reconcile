import CustomModal from '@/components/custom-modal/modal';
import { CustomInputTextField } from '@/components/form/inputs';
import { Button } from '@/components/ui/button';
import { mutateFn } from '@/config/global.mutation';
import { env } from '@/utils';
import { Spinner } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

interface IFundWalletModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  walletId: string;
}

const FundWallet = ({
  isOpen,
  onOpenChange,
  walletId,
}: IFundWalletModalProps) => {
  const { ...form } = useFormik({
    initialValues: {
      numberOfTokens: 0,
    },
    onSubmit: (values) => {
      mutate({ numberOfTokens: Number(values.numberOfTokens) });
    },
  });

  const { isLoading, mutate } = useMutation({
    mutationKey: ['manual-top-up'],
    mutationFn: (variables: (typeof form)['values']) => {
      return mutateFn({
        url: env().SENTINEL_API + '/wallet/top-up/manual-top-up',
        data: {
          walletId,
          ...variables,
        },
        method: 'PATCH',
      });
    },
    onSuccess: () => {
      toast.success('Wallet top up succesful');
      form.resetForm();
      onOpenChange();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });

  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="md"
      radius="sm"
      body={
        <>
          <div className="bg-white p-4">
            <div>
              <h4 className="text-[1.15rem] font-medium">Fund Wallet</h4>
              <p className="text-default-500 font-extralight text-[0.9rem]">
                Fill out the following requirement
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {fields?.map((e, i) => {
                switch (e.type) {
                  case 'text':
                    return (
                      <CustomInputTextField
                        {...e}
                        {...form}
                        type={e.type}
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
                }
              })}
            </div>

            <div className="flex items-center justify-end">
              <Button
                onClick={() => form.handleSubmit()}
                type="submit"
                className="bg-fg-500 hover:bg-fg-600 self-end text-[1rem] w-[100px] mt-6"
                disabled={isLoading}
              >
                {isLoading ? <Spinner color="current" size="sm" /> : 'Confirm'}
              </Button>
            </div>
          </div>
        </>
      }
    />
  );
};
const fields = [
  {
    id: 'numberOfTokens',
    type: 'text',
    placeholder: 'e.g: 100',
    label: 'Number of Tokens',
  },
];
export default FundWallet;
