import { cn } from '@/lib/utils';
import React from 'react';

interface IProps {
  children: React.ReactNode;
  title?: string;
  titleComponent?: React.ReactNode;
  titleStyles?: string;
  containerStyles?: string;
  headerStyles?: string;
  childStyles?: string;
}
const CustomContainerWithTitle = ({
  children,
  title,
  titleComponent,
  titleStyles = '',
  containerStyles = '',
  headerStyles = '',
  childStyles = '',
}: IProps) => {
  return (
    <div
      className={cn(
        containerStyles,
        'rounded-xl border px-4 pt-3 pb-4 hover:shadow-sm duration-500 flex flex-col '
      )}
    >
      <div className={cn(headerStyles, 'flex-none')}>
        {title && (
          <h4 className={cn(titleStyles, 'font-medium text-[1.05rem]')}>
            {title}
          </h4>
        )}
        {titleComponent && titleComponent}
      </div>
      <div className={cn(childStyles, 'flex-1')}>{children}</div>
    </div>
  );
};

export default CustomContainerWithTitle;
