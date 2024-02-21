import { redirect } from "next/navigation";


export default function SentimentAnalysisPage() {

  console.log("Im being redirected to home page from sentiment analysis page");
  redirect('/sentimentAnalysis/home');
}
