import { cn, Spinner, useDisclosure } from '@nextui-org/react';
import CameraComponent from '../../_component/camera-component';
import CustomModal from '../../../components/custom-modal/modal';

const FacialVerification = ({ proceed }: { proceed: (data: any) => void }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <div className={cn('w-full grid h-fit place-items-center mt-10 mb-16')}>
      <CustomModal
        size="sm"
        isDismissable={false}
        body={
          <div className="flex flex-col items-center gap-y-2  py-8">
            <Spinner color="current" size="lg" />
            <p>Verifying</p>
          </div>
        }
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <CameraComponent
        open={true}
        proceed={proceed}
        verifying={(state) => {
          if (state) return onOpen();
          onClose();
        }}
      />
    </div>
  );
};

export default FacialVerification;
