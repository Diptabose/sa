import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import StatusDialog from "@/components/ui/dialogs/StatusDialog";
import AppProvider from "@/store/providers/AppProvider";
import { AxiosInterceptor } from "./AxiosInterceptor";
import SnackBar from "@/components/ui/snackbar/SnackBar";

const inter = Roboto_Flex({ subsets: ["latin"], style: "normal" });

export const metadata: Metadata = {
  title: "Sentiment Analysis",
  description:
    "An applicationto monitor and track email with postive negative and neutral sentiments.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">
      <StyledEngineProvider injectFirst>
        <AppProvider>
          <AxiosInterceptor>
            <CssBaseline />
            <body
              id="root"
              className={`${inter.className} flex flex-col h-screen text-content-default`}
            >
              <div className="flex flex-auto w-full h-full overflow-y-auto">
                {children}
              </div>
              <StatusDialog />
              <SnackBar />
            </body>
          </AxiosInterceptor>
        </AppProvider>
      </StyledEngineProvider>
    </html>
  );
}
