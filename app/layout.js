import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "A simple, focused workspace for organizing your tasks.",
};
export const viewport = { colorScheme: "light", themeColor: "#ffffff" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
