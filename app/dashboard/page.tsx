import { redirect } from "next/navigation";

/** Mission control lives at /learn */
export default function DashboardRedirect() {
  redirect("/learn");
}
