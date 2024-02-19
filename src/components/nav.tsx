import {
  Protect,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import { Button } from "./ui/button";
import CustomSignInButton from "./sign-in-button";

export default async function Nav() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-12 py-8 text-lg text-primary-foreground antialiased">
      <nav className="flex gap-6 font-light">
        <Link className="tracking-wide" href="#">
          Sobre Catrina Mía
        </Link>
        <Link className="tracking-wide" href="/">
          Home
        </Link>
        <Link className="tracking-wide" href="#">
          Galería
        </Link>
        <Protect role="org:admin">
          <Link className="tracking-wide" href="/admin">
            Administrar
          </Link>
        </Protect>
      </nav>
      <div className="flex items-center gap-4">
        <SignedOut>
          <CustomSignInButton size="lg" />
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <ShoppingBag />
        </SignedIn>
      </div>
    </header>
  );
}
