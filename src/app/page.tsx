import { redirect } from "next/navigation";

export default function AppPage() {
    console.log("Im redirecting to home here AppPage");
    redirect('/sentimentAnalysis/home')
}
