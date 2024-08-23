import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export function auth() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/signin");
  }
}
