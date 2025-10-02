/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './router/index.tsx';
import { onUpdateAuthSlice } from './store/features/auth.ts';

function App() {
  window.addEventListener('vite:preloadError', () => {
    window.location.reload();
  });

  const auth = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (auth?.isAuthenticated) {
        const user = auth.user;
        const access = await auth.getAccessTokenSilently();
        const idToken: any = await auth.getIdTokenClaims();
        dispatch(
          onUpdateAuthSlice({
            organization: user?.organization,
            token: { access },
            userInfo: {
              name: user?.name,
              id: user?.sub,
              email: user?.email,
              roles: idToken.role_list,
            },
          })
        );
      }
    })();
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </>
  );
}
export default App;
// export default withAuthenticationRequired(App);
