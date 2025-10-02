import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { cn } from '@nextui-org/react';

const Details = () => {
  const { niaData } = useSelector((state: RootState) => state.global);

  const NOT_SKIP_FIELDS = [
    'nationalId',
    'cardValidFrom',
    'cardValidTo',
    'surname',
    'forenames',
    'birthDate',
  ];
  return (
    <div className="lg:w-[60vw] mx-auto pt-10 lg:mb-10 mb-6">
      <div className="flex items-center justify-center">
        <img
          className="w-[120px]"
          src={
            'data:image/png;base64,' + niaData?.person?.biometricFeed?.face.data
          }
        />
      </div>

      <div className=" grid grid-cols-2 lg:gap-x-4 lg:gap-y-6 gap-x-2 gap-y-4 mt-6 lg:w-[60%]  my-8 mx-auto">
        {Object.entries(niaData?.person)?.map(([key, value]) => {
          if (NOT_SKIP_FIELDS.includes(key)) {
            if (typeof value == 'string')
              return (
                <>
                  <div className={cn('flex flex-col gap-2 rounded ')}>
                    <p className="capitalize font-medium text-[0.9rem] ">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </p>
                    <p className="font-extralight border-b-1">{value}</p>
                  </div>
                </>
              );
          }
        })}
      </div>
      <div className={cn('flex flex-col w-[200px]  mx-auto mb-8')}>
        <p className="capitalize font-medium ">Verification Code</p>
        <p className="font-extralight border-b-1">{niaData?.shortGuid}</p>
      </div>
      <div className="flex items-center justify-center ">
        <img
          className="h-[70px]"
          src={
            'data:image/png;base64,' +
            niaData?.person?.binaries?.find(
              (bin) => bin.type.toLowerCase() == 'signature'
            )?.data
          }
        />
      </div>
    </div>
  );
};

export default Details;
