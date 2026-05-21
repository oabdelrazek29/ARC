import { redirect } from "next/navigation";

/** Course creation lives under Learn OS */
export default function NewGoalRedirect() {
  redirect("/learn/create");
}
