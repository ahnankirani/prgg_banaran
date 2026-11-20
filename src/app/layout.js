import { Noto_Serif, Roboto, Raleway } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--nf-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--nf-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const raleway = Raleway({
  variable: "--nf-raleway",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata = {
  title: {
    default: "Kalurahan Banaran – Kapanewon Galur",
    template: "%s – Kalurahan Banaran",
  },
  description: "Profil, potensi, dan peta sumber daya Kalurahan Banaran, Kapanewon Galur, Kulon Progo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${notoSerif.variable} ${roboto.variable} ${raleway.variable}`}>
      <body>{children}</body>
    </html>
  );
}
