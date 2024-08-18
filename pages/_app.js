import Aside from "@/components/Aside";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

// export const runtime = 'edge';
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Aside />
      <div className="container">
        <Header />
      </div>
      <main>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
