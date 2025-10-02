import { cn } from '@nextui-org/react';

interface IProps {
  title: string;
  extraClassNames?: string;
}
const Button = (
  props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, title, ...rest } = props;
  return (
    <button
      className={cn(
        'text-foundry-primary border-[1.5px] rounded-lg py-3 border-fg-500 hover:bg-fg-600 hover:text-white duration-500 ',
        className
      )}
      {...rest}
    >
      {title}
    </button>
  );
};

export default Button;
