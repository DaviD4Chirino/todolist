"use client";
import "../sass/App.sass";
import "../sass/index.sass";

import { Inter } from "next/font/google";
import MuiTheme from "./MuiTheme";
import { ConfirmProvider } from "material-ui-confirm";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To-do List - David Space",
  description: "A to do list made by david space",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
      </head>
      <body>
        <MuiTheme>
          <ConfirmProvider>
            <main className="container">{children}</main>
          </ConfirmProvider>
        </MuiTheme>
      </body>
    </html>
  );
}
