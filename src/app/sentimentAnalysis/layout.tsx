import Navbar from "@/components/ui/nav/Navbar";
import SentimentProvider from "@/store/providers/SentimentProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sentiment Analysis",
  description:
    "Represents the emails and their sentiments. Users are given a range of filters to pick emails selectively and analyse their sentiments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SentimentProvider>
      <div className="w-full flex flex-col h-full">
        <Navbar />
        <main className="flex flex-1 h-full overflow-y-auto">{children}</main>
      </div>
    </SentimentProvider>
  );
}
