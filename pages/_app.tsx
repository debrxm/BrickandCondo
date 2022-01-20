import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { PageWrapper } from "../components/PageWrapper";
import { auth } from "../firebase/config";
import { createUserProfile } from "../firebase/auth";
import { customTheme } from "../styling/theme";
import "../styling/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const checkUser = React.useCallback(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        try {
          const userRef: any = await createUserProfile(userAuth);
          userRef.onSnapshot((snapShot: any) => {
            const data = { id: snapShot.id, ...snapShot.data() };
            setUser(data);
            setLoading(false);
          });
        } catch (error: any) {
          setLoading(false);
          console.log("here", error.message);
        }
      } else {
        setLoading(false);
      }
    });
  }, [""]);
  React.useEffect(() => {
    checkUser();
  }, [checkUser]);
  return (
    <ChakraProvider theme={customTheme}>
      <PageWrapper>
        <Component {...pageProps} user={user} />
      </PageWrapper>
    </ChakraProvider>
  );
}

export default MyApp;
