import type { AppProps } from "next/app";
import { Libre_Baskerville } from "next/font/google";
import "../styles/globals.css";

const bodyFont = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={bodyFont.className}>
      <Component {...pageProps} />
    </main>
  );
}
