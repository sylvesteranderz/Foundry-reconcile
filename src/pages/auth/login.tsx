import LogInForm from './_components/login-form';

export default function Login() {
  return (
    <div className="grid min-h-[850px] h-[100vh] p-4 w-screen overflow-hidden grid-cols-1 lg:grid-cols-2   ">
      <div className="h-full w-full px-6 flex items-center justify-center">
        <div className="flex flex-col items-start gap-4">
          <img src="/icons/logo-dark.svg" alt="logo" className="h-12" />
          <div>
            <h4 className="text-[1.4rem] font-medium">Welcome Back</h4>
            <p className="text-[#989898] font-extralight">
              Log in to continue to Foundry Sentinel
            </p>
          </div>

          <LogInForm />
        </div>
      </div>
      <div className="bg-fg-500 h-[100%] w-full  hidden lg:grid place-items-center rounded-lg p-8  ">
        <img src="/images/face-id.svg" alt="login-bg" className="h-[300px]" />
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col justify-between ">
          <div>
            <h1 className="text-[4rem] font-bold">Verify</h1>
            <p className="text-[1.2rem] font-light">
              Use Face ID to verify your identity
            </p>
          </div>
          <div>
            <h1 className="text-[4rem] font-bold text-center">Verify</h1>
            <p className="text-[1.2rem] font-light text-center">
              Use Face ID to verify your identity
            </p>
          </div>
          <div>
            <h1 className="text-[4rem] font-bold text-right">Verify</h1>
            <p className="text-[1.2rem] font-light text-right">
              Use Face ID to verify your identity
            </p>
          </div>
        </div> */
}
