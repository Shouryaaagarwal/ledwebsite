// "use client"
// import { SessionProvider } from "next-auth/react"
// import { AppProps } from "next/app"

// export default function NextauthProvider({
//   Component,
//   pageProps: { session, ...pageProps },
// }: AppProps) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   ) 
// }
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface NextauthProviderProps {
  children: ReactNode;
}

export default function NextauthProvider({ children }: NextauthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
}