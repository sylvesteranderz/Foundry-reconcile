import { cn } from '@nextui-org/react';
import { wrapClick } from '../../../utils';

interface IProps {
  title: string;
  illustration: string;
  onClick: () => void;
  disabled?: boolean;
  selected: boolean;
}
const UpdateTypeCard = ({
  title,
  illustration,
  onClick,
  disabled = true,
  selected,
}: IProps) => {
  return (
    <div
      // border-transparent border-2
      className={cn(
        'cursor-pointer gap-4 rounded-2xl group bg-gradient-to-b from-black/10 border-2  to-white flex items-center justify-between flex-col py-4 px-6 lg:px-5 lg:py-7  duration-700',
        disabled && 'cursor-not-allowed',
        !disabled &&
          'hover:border-fg-600 hover:shadow-sm hover:border-2 ',
        selected && 'border-2 border-fg-500 '
      )}
      role="button"
      onClick={wrapClick(() => {
        if (!disabled) {
          onClick();
        }
      })}
    >
      <img src={illustration} alt="title" className='lg:h-[100px] h-[70px]' />
      <h4
        className={cn(
          ' duration-700 lg:text-[1.2rem] font-light',
          !disabled && ' group-hover:text-foundry-primary'
        )}
      >
        {title}
      </h4>
    </div>
  );
};

export default UpdateTypeCard;
