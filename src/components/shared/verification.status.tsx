import { cn } from '@/lib/utils';

const VerificationStatus = ({ status }: { status: string }) => {
  const isSuccess = status.toLowerCase().includes('success');
  return (
    <div
      className={cn(
        isSuccess
          ? 'bg-verification-success-bg border-verification-success-border text-verification-success-text'
          : 'bg-verification-error-bg border-verification-error-border text-verification-error-text',
        'border text-[0.7rem] text-center rounded-md'
      )}
    >
      {status}
    </div>
  );
};

export default VerificationStatus;
