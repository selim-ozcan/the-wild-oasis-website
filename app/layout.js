import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import ReservationContextProvider from "./_components/ReservationContext";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotels, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`relative grid grid-rows-[min-content_1fr] min-h-screen antialiased bg-primary-950 text-primary-100 ${josefin.className}`}
      >
        <Header />
        <div className="px-8 py-12">
          <main className="max-w-7xl mx-auto h-full pt-1">
            <ReservationContextProvider>{children}</ReservationContextProvider>
          </main>
          {/* pt-1 to prevent margin collapsing*/}
        </div>
      </body>
    </html>
  );
}
