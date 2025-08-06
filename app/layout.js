import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import ChatBot from "./components/chatbot/ChatBot";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Portfolio of Salman khan ",
  description:
    "I'm Salman Khan D — a developer, innovator, and digital creator who turns imagination into interactive reality. Currently pursuing B.Tech in AI & Data Science at Mahendra Engineering College, I specialize in fusing artificial intelligence with full-stack development to build smarter systems and beautiful experiences.I believe tech should empower, not complicate. That's why I've developed everything from AI resume generators and interview bots to IoT-based security and irrigation systems. Whether it's deploying on Vercel, designing with Canva, or fine-tuning models in PyTorch — I move fast, learn faster, and build with heart.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
          <ChatBot />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
