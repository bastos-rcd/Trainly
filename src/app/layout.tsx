import "./style.css";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Menu from "@/components/menu";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Trainly",
  description: "Workout program manager",
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body className="min-h-screen bg-slate-50 text-black antialiased">
        <div className="h-screen flex flex-col">
          <Menu />

          <main className="w-full flex-1 flex flex-col items-center overflow-y-auto p-4 gap-y-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
