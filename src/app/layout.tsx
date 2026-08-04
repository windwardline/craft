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
          className="mx-8 mt-7 border-t-2 border-chalk sm:mx-14"
        >
          <div className="mt-[3px] border-t border-batten" />
        </div>

        <header className="mx-8 flex items-baseline justify-between py-6 sm:mx-14">
          <Link
            href="/"
            className="font-mono text-sm uppercase tracking-[0.3em] text-chalk"
          >
            Loft
            <span className="ml-3 text-chalk-faint">· Windward Line</span>
          </Link>
          <nav className="flex items-baseline gap-8">
            <Link
              href="/colophon"
              className="font-mono text-xs uppercase tracking-[0.18em] text-chalk-faint transition-colors hover:text-chalk"
            >
              Colophon
            </Link>
            <Lamp />
          </nav>
        </header>

        <main className="mx-8 flex-1 pb-16 sm:mx-14">{children}</main>

        <footer className="mx-8 pb-8 sm:mx-14">
          <div aria-hidden="true" className="border-t border-batten" />
          <p className="pt-4 font-mono text-xs uppercase tracking-[0.22em] text-chalk-faint">
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
