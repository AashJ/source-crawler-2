import "../styles/globals.css";
import type { AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

const inter = Inter({ weight: ["300", "400", "500"], subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default api.withTRPC(MyApp);
