import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
}
