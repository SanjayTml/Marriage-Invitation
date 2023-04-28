import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import InviteCard from "@/components/InviteCard";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

// import "jquery-sakura";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [showCard, setShowCard] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Get data from the form.
    const filter = event.currentTarget.filter.value;
    console.log(filter);

    if(filter == "") {
      setErrorMessage("Please enter a phone number.");
      setShowError(true);
      return;
    }

    getUserByPhoneNumber(filter);
  };

  async function getUserByPhoneNumber(phoneNumber) {
    // get name by phone number from guests table
    const { data, error } = await supabase
      .from("guests")
      .select(`name`)
      .eq("phone", phoneNumber);

    if (error) {
      console.error(error);
      setErrorMessage(error.message);
      setShowError(true);
      return;
    } else if (data.length === 0) {
      setErrorMessage("Sorry, the phone number doesn't exist in the list.");
      setShowError(true);
      console.log(data);
      return;
    }

    const name = data[0].name;
    // setShowError(false);
    console.log(name);
    setDisplayName(name);
    setShowCard(true);
  }

  return (
    <>
      <Head>
        <title>Wedding Invitation | Baisakh 19</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link
          href="https://fonts.googleapis.com/css?family=Arvo"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Dancing+Script&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/style.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <div className="h-screen">
        <Image
          src={"https://i.imgur.com/dGOOfnA.png"}
          alt="Image-top-right"
          className="top-right-decoration"
          width={200}
          height={200}
        />
        <Image
          src="https://i.imgur.com/t6ffnbn.png"
          alt="image-top-left"
          className="top-left-decoration"
          width={200}
          height={200}
        />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col h-screen items-center justify-center">
            {showCard ? (
              <InviteCard guestName={displayName} />
            ) : (
              <div>
                <p className="mb-2 text-center">
                  {showError ? (
                    <span className="text-red-400">
                      {errorMessage}
                    </span>
                  ) : (
                    "Please enter your phone number where you received the sms."
                  )}
                </p>
                <div className="px-20 mx-auto">
                  <form
                    onSubmit={handleSubmit}
                    className="rounded-lg p-4 shadow-md"
                  >
                    <div className="flex mb-1 items-center">
                      <input
                        type="text"
                        className="w-full rounded-lg border border-violet-400 p-2 focus:outline-violet-600"
                        placeholder="98XXXXXXXX"
                        name="filter"
                      />
                      <button
                        type="submit"
                        className="ml-2 mt-0 rounded-lg border border-violet-600 p-2 px-4 hover:text-white hover:bg-violet-600"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Script src="https://cdn.jsdelivr.net/gh/timoschaefer/jQuery-Sakura/jquery-sakura.min.js"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></Script> */}
    </>
  );
}
