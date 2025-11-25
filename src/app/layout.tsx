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

          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
