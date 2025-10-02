import { cn } from '@nextui-org/react';
import UpdateTypeCard from './_component/type-card';
import Button from '../_component/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const NOT_DISABLED = ['Ghana Card'];
  const [selected, setSelected] = useState<string>('Ghana Card');
  return (
    <div className="h-screen grid place-items-center px-8 md:px-10">
      <div className={cn('text-center')}>
        <h4 className={cn('lg:text-[2.4rem] text-[1.5rem] font-semibold')}>
          Verification Type
        </h4>
        <p className={cn('lg:text-[1.2rem] font-extralight text-[1.2rem]')}>
          What kind of verification would you like today?
        </p>

        <div
          className={cn(
            'grid grid-cols-2 lg:grid-cols-4 w-full lg:gap-6 gap-4 my-10  '
          )}
        >
          {update_types?.map((update) => {
            return (
              <UpdateTypeCard
                selected={update.title == selected}
                {...update}
                key={update.title}
                disabled={!NOT_DISABLED.includes(update.title)}
                onClick={() => {
                  setSelected(update.title);
                }}
              />
            );
          })}
        </div>
        <Button
          title="Continue"
          className="w-[60%] mt-6"
          onClick={() => {
            navigate(`/update/${selected.toLowerCase().split(' ').join('-')}`);
          }}
        />
      </div>
    </div>
  );
};

const update_types = [
  {
    title: 'Ghana Card',
    illustration: '/images/ghana-card.svg',
    onClick: () => null,
  },
  {
    title: 'General Information',
    illustration: '/images/general-info.svg',
    onClick: () => null,
  },
  {
    title: 'Dormant Reactivation',
    illustration: '/images/dormant-reactivation.svg',
    onClick: () => null,
  },
  {
    title: 'Close Account',
    illustration: '/images/close-account.svg',
    onClick: () => null,
  },
];

export default HomePage;
