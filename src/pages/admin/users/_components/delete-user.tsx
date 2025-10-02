import CustomModal from '@/components/custom-modal/modal';
import { Button } from '@/components/ui/button';
import { mutateFn } from '@/config/global.mutation';
import { queryClient } from '@/main';
import { env } from '@/utils';
import { Spinner } from '@nextui-org/react';
import { useState } from 'react';
import { toast } from 'sonner';
interface IDeleteUserModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  user: any;
}
const DeleteUser = ({ isOpen, onOpenChange, user }: IDeleteUserModalProps) => {
  const [isLoading, setLoading] = useState(false);
  async function deleteUserFn() {
    try {
      setLoading(true);

      await mutateFn({
        url: env().DASHBOARD_API_URL + `/a89/user/delete`,
        method: 'DELETE',
        data: {
          userId: user?.original?.staffId,
        },
      });

      queryClient.invalidateQueries(['organization']);
      toast.success('user deleted');
      onOpenChange();
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <CustomModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="sm"
      body={
        <>
          <div className="p-4 bg-white">
            <div>
              <h4 className="text-[1.15rem] font-medium text-red-600 ">
                Delete User
              </h4>
              <p className="my-2 text-[1.05rem] font-normal">
                Are you absolutely sure?
              </p>
              <p className="text-default-500 font-extralight text-[0.9rem] ">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </p>
            </div>

            <div className="flex items-center justify-end">
              <Button
                onClick={() => deleteUserFn()}
                type="submit"
                className="bg-fg-500 hover:bg-fg-600 self-end text-[0.87rem] py-2 w-[100px] mt-6"
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

export default DeleteUser;
