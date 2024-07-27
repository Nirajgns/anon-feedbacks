"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        signed in as {session?.user?.email}
        <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-orange-500 px-3 m-4 py-2 rounded"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
