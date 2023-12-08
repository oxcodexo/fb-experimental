import Accounts from "@/components/Accounts";
import VideoToRedirectTo from "@/components/VideoToRedirectTo";
import Head from "next/head";
import React from "react";

function AccountsPage() {
  return (
    <>
      <Head>
        <title>Accounts </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="h-screen">
        <VideoToRedirectTo />
        <Accounts />
      </main>
    </>
  );
}

export default AccountsPage;
