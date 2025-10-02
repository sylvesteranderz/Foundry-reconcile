import { cn } from '@nextui-org/react';
import { Icon } from '@iconify/react';
import CardNumberPage from './_pages/card-number';
import Button from '../_component/button';
import FacialVerification from './_pages/camera';
import { wrapClick } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { resetGlobal, setItem } from '../../store/features/global';
import Details from './_pages/details';
import { useState } from 'react';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';
const GhanaCardUpdatePage = () => {
  const GHANA_CArD_ReGEX = /^GHA-\d{9}-\d{1}$/;
  const navigate = useNavigate();
  const [active, setActive] = useState('id');
  const { ghanaCardNumber } = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch();
  const [curr, setCurr] = useState(0);
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  // const contentRef = useRef<HTMLDivElement>(null);
  // const reactToPrintFn = useReactToPrint({
  //   contentRef,
  //   pageStyle: 'padding: 2rem',
  // });
  const steps = [
    {
      title: 'ID Number',
      icon: 'material-symbols:id-card',
      component: <CardNumberPage />,
      value: 'id',
    },
    {
      title: 'Face',
      icon: 'mdi:face',
      value: 'face',
      component: (
        <FacialVerification
          proceed={(data) => {
            dispatch(setItem({ niaData: { ...data } }));
            handleNext();
          }}
        />
      ),
    },
    {
      title: 'Information',
      icon: 'solar:document-bold',
      value: 'details',
      component: <Details />,
    },
  ];
  function handleNext() {
    if (active == 'id') {
      if (GHANA_CArD_ReGEX.test(ghanaCardNumber)) {
        setCurr((p) => p + 1);
        setCompletedTabs((prev) => [...prev, steps?.[curr].value]);
        setActive('face');
      }
    }
    if (active == 'face') {
      setCurr((p) => p + 1);
      setCompletedTabs((prev) => [...prev, steps?.[curr].value]);
      setActive('details');
    }
    if (active == 'details') {
      window.print();
      // dispatch(resetGlobal());
      // navigate('/');
    }
  }
  return (
    <div className={cn('lg:w-[80vw] px-8 mx-auto lg:pt-10 pt-20 pb-8')}>
      <h4
        className={cn(
          'lg:text-[1.8rem] text-[1.3rem] font-semibold flex items-center gap-2 print:hidden'
        )}
      >
        <span
          className={cn(
            'cursor-pointer hover:underline duration-500 hover:text-foundry-primary'
          )}
          onClick={wrapClick(() => {
            dispatch(resetGlobal());
            navigate('/');
          })}
        >
          Foundry Sentinel
        </span>
        <span>/</span>
        <span>Ghana Card</span>
      </h4>

      <div
        className={cn(
          'flex  justify-between lg:w-[60%] mx-auto relative mt-10 print:hidden'
        )}
      >
        <div className="absolute grid place-items-center w-full h-[80%] top-0 bottom-0 z-[-1] ">
          <div className="h-[10px] w-full bg-red-100"></div>
        </div>
        {steps?.map((step) => {
          return (
            <div
              key={step.value}
              className={cn(
                'flex items-center flex-col lg:w-[80px] min-w-[60px] cursor-pointer  bg-white'
              )}
            >
              <div
                className={cn(
                  'lg:h-10 lg:w-10 grid place-items-center w-8 h-8 rounded-full bg-gray-200/70 ',
                  completedTabs.includes(step.value) && 'bg-fg-500',
                  active == step.value && 'bg-fg-500/20'
                )}
              >
                <Icon
                  icon={
                    completedTabs.includes(step.value)
                      ? 'mdi:check-bold'
                      : step.icon
                  }
                  className={cn(
                    'text-gray-300/85 lg:text-[1.45rem] text-[1.1rem]',
                    completedTabs.includes(step.value) &&
                      'text-white lg:text-[1.2rem] text-[1rem]',
                    active == step.value && 'text-fg-500'
                  )}
                />
              </div>
              <p
                className={cn(
                  'lg:text-[0.8rem] text-[0.7rem] font-extralight mt-1 text-center text-gray-400',
                  active == step.value && 'text-black'
                )}
              >
                {step.title}
              </p>
            </div>
          );
        })}
      </div>

      {steps?.[curr].component}

      <div className={cn(' grid place-items-center lg:mt-8 mt-6 print:hidden')}>
        <Button
          title={active != 'details' ? 'Continue' : 'Print'}
          className={cn(
            'lg:w-[250px] mx-auto bg-fg-500 text-white lg:py-3 px-8 font-medium',
            !GHANA_CArD_ReGEX.test(ghanaCardNumber) &&
              'bg-gray-300 border-gray-300 hover:bg-gray-300 cursor-default text-gray-500 hover:text-gray-500',
            active == 'face' && 'hidden'
          )}
          onClick={wrapClick(() => {
            if (curr < steps.length) {
              handleNext();
            }
          })}
        />

        {active == 'details' && (
          <p
            className="font-extralight underline cursor-pointer text-foundry-primary mt-6 lg:mt-3"
            onClick={wrapClick(() => {
              dispatch(resetGlobal());
              navigate('/');
            })}
          >
            Go Home
          </p>
        )}
      </div>
    </div>
  );
};

export default GhanaCardUpdatePage;
