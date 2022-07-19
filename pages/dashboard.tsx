import { signOut, useSession } from "next-auth/react";
import Dashboard from "../componets/Dashboard/Dashboard";

export default function dashboard() {
  return (
    <>
      <Dashboard />
    </>
  );
}
