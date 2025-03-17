import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen p-4 pb-10 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 items-center max-w-md w-full">
        <div className="rounded-xl overflow-hidden w-64 h-64 sm:w-80 sm:h-80">
          <Image
            src="/moove.jpg"
            alt="Moove Logo"
            width={320}
            height={320}
            priority
            className="object-cover w-full h-full"
          />
        </div>
        <p>Formulário Moove+</p>
        <div className="flex flex-col sm:flex-row gap-2 items-center">
          <Link
            href="forms/formulario"
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-8 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Entrar
          </Link>
        </div>
      </main>
    </div>
  );
}
