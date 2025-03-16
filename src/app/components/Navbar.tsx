import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../../../auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white font-sans shadow-md">
      <nav className="flex justify-between items-center text-black">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit" className="cursor-pointer">
                  Signout
                </button>
              </form>

              <Link href="">
                <span>{session?.user.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button type="submit" className="cursor-pointer">
                Signin
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
