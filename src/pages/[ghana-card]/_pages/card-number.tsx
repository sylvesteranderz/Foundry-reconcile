import { cn, Input } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { INia, setItem } from '../../../store/features/global';
import { formatID } from '../../../utils';
import { useEffect } from 'react';

const CardNumberPage = () => {
  const dispatch = useDispatch();
  const { ghanaCardNumber } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    dispatch(setItem({ niaData: {} as INia }));
  }, []);
  return (
    <div className={cn('w-full pt-12 flex flex-col items-center')}>
      <div className="text-center mb-10">
        <h4 className="font-semibold lg:text-[2.2rem] text-[1.4rem]">
          Number Verification
        </h4>
        <p className="font-extralight lg:text-[1.1rem] text-[0.85rem]">
          Let’s get started by verifying Ghana Card Number
        </p>
      </div>
      <Input
        value={ghanaCardNumber}
        className={cn('md:w-96 w-[90%] ')}
        placeholder="GHA-XXXXXXXXX-X"
        label="Ghana Card Number"
        classNames={{
          input: 'bg-transparent text-[16px]',
          inputWrapper: cn(
            'border bg-transparent focus:border-foundry-primary focus:ring-foundry-primary hover:border-foundry-primary disabled:cursor-not-allowed disabled:opacity-50'
          ),
          label: 'dark:text-gray-300 text-xs -mt-[2%] uppercase',
        }}
        onChange={(event) => {
          dispatch(
            setItem({
              ghanaCardNumber: formatID(
                event.currentTarget.value.toUpperCase()
              ),
            })
          );
        }}
      />
    </div>
  );
};

export default CardNumberPage;
