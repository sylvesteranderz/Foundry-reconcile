 
import React from 'react';

interface LogoProps {
  text?: string;
  animate?: boolean;
}

const LogoComponent: React.FC<LogoProps> = ({
  text = 'Foundry',
  animate = true,
}) => {
  const currentTheme = 'dark';

  return (
    <div
      className={`w-full h-full grid place-items-center ${
        animate && 'animate-pulse'
      } my-auto py-4`}
    >
      <div className="flex flex-col items-center gap-y-1">
        <img
          src={
            ['dark', 'system'].includes(currentTheme)
              ? '/icons/logo-white.svg'
              : '/icons/logo-dark.svg'
          }
          className="w-[2rem] aspect-square"
        />
        <p className="text-sm dark:text-white text-black">{text}</p>
      </div>
    </div>
  );
};

export default LogoComponent;
