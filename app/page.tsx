import { authOptions } from "./lib/auth";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Navbar from "./components/Navbar/Navbar";
import Feed from "./feed/Feed";

async function getUser() {
  //@ts-ignore
  const session = await getServerSession(authOptions);
  return session;
}

export default async function Home() {
  const session = await getUser();

  return (
    <div>
      <Navbar></Navbar>
      <Feed></Feed>
      {/* {JSON.stringify(session)} */}
    </div>
  );
}
