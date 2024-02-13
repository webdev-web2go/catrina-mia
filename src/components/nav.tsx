import {
  Protect,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

export default async function Nav() {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between px-12 py-8 text-lg text-primary-foreground">
      <nav className="flex gap-6 font-extralight">
        <Link className="tracking-wide" href="#">
          Sobre Catrina Mía
        </Link>
        <Link className="tracking-wide" href="#">
          Home
        </Link>
        <Link className="tracking-wide" href="#">
          Galería
        </Link>
        <Protect role="org:admin">
          <Link className="tracking-wide" href="#">
            Administrar
          </Link>
        </Protect>
      </nav>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <User className="cursor-pointer" />
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
          <ShoppingBag />
        </SignedIn>
      </div>
    </header>
  );
}
