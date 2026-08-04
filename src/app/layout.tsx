import type { Metadata } from "next";
import Link from "next/link";
import { Lamp } from "../components/Lamp";
import { LAMP_SNIPPET } from "../lib/lamp";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://craft.windwardline.com"),
  title: "Loft — Windward Line",
  description:
    "Interaction studies, lofted before they run. The working floor of a one-person software company.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LAMP_SNIPPET }} />
      </head>
      <body className="min-h-full flex flex-col">
        <div
          aria-hidden="true"
          className="mx-5 mt-6 border-t-2 border-chalk sm:mx-14 sm:mt-7"
        >
          <div className="mt-[3px] border-t border-batten" />
        </div>

        <header className="mx-5 flex flex-wrap items-baseline justify-between gap-y-2 py-4 sm:mx-14 sm:py-6">
          <Link
            href="/"
            className="font-mono text-[12px] uppercase tracking-[0.22em] text-chalk sm:text-sm sm:tracking-[0.3em]"
          >
            Loft
            <span className="ml-3 hidden text-chalk-faint sm:inline">· Windward Line</span>
          </Link>
          <nav className="flex items-baseline gap-5 sm:gap-8">
            <Link
              href="/colophon"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-chalk-faint transition-colors hover:text-chalk sm:text-xs"
            >
              Colophon
            </Link>
            <Lamp />
          </nav>
        </header>

        <main className="mx-5 flex-1 pb-12 sm:mx-14 sm:pb-16">{children}</main>

        <footer className="mx-5 pb-6 sm:mx-14 sm:pb-8">
          <div aria-hidden="true" className="border-t border-batten" />
          <p className="pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-chalk-faint sm:text-xs">
            Lofted, then run · the chart is at{" "}
            <a
              href="https://portfolio.windwardline.com"
              className="text-chalk-soft transition-colors hover:text-chalk"
            >
              portfolio.windwardline.com
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
