import { cn } from '@/lib/utils';
import { RootState } from '@/store/store';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useDisclosure } from '@nextui-org/react';
import { useSelector } from 'react-redux';
import FundWallet from './fund-wallet';

const WalletCard = ({
  wallet_name,
  balance = 0,
  isLoading = false,
  walletId = '',
}: {
  wallet_name: string;
  balance?: number;
  isLoading?: boolean;
  walletId?: string;
}) => {
  const { name } = useSelector((state: RootState) => state.auth.organization);

  const bgMaps: Record<string, string> = {
    'Foundry Sentinel': 'bg-red-lightpink-gradient',
    SMS: 'bg-yellow-green-gradient',
    Email: 'bg-gold-red-gradient',
    '': '',
  };

  const fundWalletModalProps = useDisclosure();
  return (
    <div
      className={cn(
        'bg-gold-red-gradient text-white rounded-2xl p-5 h-[240px] flex flex-col justify-between cursor-pointer ',
        bgMaps[wallet_name]
      )}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-[1.5rem]">{wallet_name}</h4>
        <div
          className="cursor-pointer"
          role="button"
          onClick={() => {
            // fundWalletModalProps.onOpen();
          }}
        >
          <Icon icon={'hugeicons:credit-card-add'} fontSize={28} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-light text-[1.05rem]">{name}</p>
          {/* {isLoading ? (
            <div className="h-[1.5ch] bg-slate-300 animate-pulse"></div>
          ) : (
      
          )} */}

          <p className="text-[1.5rem] font-medium flex items-center gap-2">
            {isLoading ? (
              <p className="h-[2.5ch] w-10 rounded-md bg-slate-50/15 animate-pulse"></p>
            ) : (
              <> {balance}</>
            )}{' '}
            Tokens
          </p>
        </div>
        <div>
          <p className="text-[1.3rem] font-extralight">06/25</p>
          {/* <Button>
            <Icon icon={'hugeicons:money-add-02'} />
          </Button> */}
        </div>
      </div>

      <FundWallet {...fundWalletModalProps} walletId={walletId} />
    </div>
  );
};

export default WalletCard;
