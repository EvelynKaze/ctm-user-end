"use client";
import "@/app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Header } from "@/components/header";
import { MobileSidebar } from "@/components/mobile-sidebar";
import Sidebar from "@/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/constants/wagmi";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// export const metadata = {
//   title: "CopyTradeMarkets: UserDashboard",
//   description: "Make transactions and purchase stocks with CopyTradeMarkets",
// };

const queryClient = new QueryClient();

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { userData } = useSelector((state: RootState) => state.user);
  const userName =
    userData?.username ||
    ((userData?.firstName?.toLowerCase?.() ?? "") +
      (userData?.lastName?.toLowerCase?.() ?? "")) ||
    null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="flex font-poppins h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="hidden lg:block">
              <Sidebar />
            </div>
            <MobileSidebar />
            <div className="w-full md:flex-grow h-full">
              <Header userName={userName} />
              <div className="lg:h-[calc(100dvh-6rem)] bg-black p-4 md:p-12 overflow-y-auto">{children}</div>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Layout;