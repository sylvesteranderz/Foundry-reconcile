import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { env, NIAFacialRecognitionResponse } from '../../utils';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { mutateFunction } from '../../config';

interface ICameraComponent {
  open: boolean;
  proceed: (data: any) => void;
  verifying: (state: boolean) => void;
}

const CameraComponent = ({ open, verifying, proceed }: ICameraComponent) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const canvasRef = useRef<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');

  const { ghanaCardNumber } = useSelector((state: RootState) => state.global);

  const { mutateAsync } = useMutation({
    mutationFn: mutateFunction,
  });
  async function startCam() {
    setLoading(true);
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
        width: 1250,
        height: 1024,
      },
    });
    setMediaStream(stream);

    const video = videoRef.current as HTMLVideoElement;
    video.srcObject = stream;
    video.play();
    setLoading(false);
  }

  async function snapshot() {
    const canvas = canvasRef.current;
    const video = videoRef.current as HTMLVideoElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    closeCam();
    setImage(canvas.toDataURL('image/jpeg', 1));
    facialVerification(canvas.toDataURL('image/jpeg', 0.8));
  }

  useEffect(() => {
    if (!open) return;
    startCam();
  }, [open, facingMode]);

  function closeCam() {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      mediaStream.getAudioTracks().forEach((track) => track.stop());
      mediaStream.getAudioTracks().forEach((track) => track.stop());
    }
  }

  function retake() {
    setImage(null);
    setMediaStream(null);
    startCam();
  }

  function onCameraFlip() {
    closeCam();
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  }

  async function facialVerification(file: string) {
    try {
      const bypass =
        NIAFacialRecognitionResponse[ghanaCardNumber.toUpperCase()];
      if (bypass) {
        setTimeout(() => {}, 1000);
        setMediaStream(null);
        closeCam();
        proceed(bypass);
        return;
      }
      verifying(true);
      const res = await fetch(file);
      const blob = await res.blob();
      const formdata = new FormData();
      formdata.append('image', blob);
      formdata.append('ghanaCardNumber', ghanaCardNumber);
      const response = await mutateAsync({
        // url: env().THIRDPARTY_SERVICES + '/nia/facial-verification',
        url: env().SENTINEL_API + '/sentinel/verify/ghana-card',
        data: formdata,
        header: {
          'x-api-user': 'foundry',
        },
      });

      setMediaStream(null);
      closeCam();
      if (response?.data?.verified === 'FALSE') {
        throw new Error('wrong ghana card number');
      }
      proceed(response?.data?.data);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message?.msg ||
        error?.response?.data?.message ||
        error?.message;
      console.log(errorMessage);
      toast.error(errorMessage);
      retake();
    } finally {
      verifying(false);
    }
  }

  return (
    <div
      className={`max-w-[450px] lg:h-[500px] h-[600px] rounded-md relative my-auto w-full transition-all grid place-items-center overflow-clip shadow-lg `}
    >
      <div className="w-full h-full bg-secondary-black m-auto flex flex-col items-center relative">
        <canvas
          ref={canvasRef}
          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : '' }}
          className="w-full h-full aspect-square m-auto object-cover absolute top-0 left-0"
        />

        {!image && (
          <video
            ref={videoRef}
            muted
            playsInline
            style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : '' }}
            className="w-full h-full aspect-square m-auto object-cover relative rounded-md"
          />
        )}

        {loading && (
          <div className="w-full h-full absolute aspect-square grid bg-black/10 object-cover top-0 z-20 left-0">
            <Icon
              className="m-auto animate-spin text-[25px]"
              icon="nonicons:loading-16"
            />
          </div>
        )}
      </div>

      <div className="w-full h-full absolute">
        <div className="left-1/2 -translate-x-1/2 flex flex-row absolute bottom-4 gap-x-2 items-center">
          <button
            onClick={snapshot}
            className="  backdrop-blur-md p-3 rounded-full hover:bg-primary-peach text-white"
          >
            <Icon icon="material-symbols:camera" className="text-[40px]" />
          </button>
          <button
            onClick={onCameraFlip}
            className="  backdrop-blur-md p-3 aspect-square w-fit h-fit rounded-full hover:bg-primary-peach text-white"
          >
            <Icon icon="mdi:camera-flip" className="text-[20px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
