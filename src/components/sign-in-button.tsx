import { SignInButton } from "@clerk/nextjs";
import { Button, type ButtonProps } from "./ui/button";

interface Props {
  size?: ButtonProps["size"];
}

export default function CustomSignInButton({ size }: Props) {
  return (
    <SignInButton mode="modal" aria-label="Iniciar sesión">
      <Button variant="secondary" className="font-semibold" size={size}>
        Iniciar sesión
      </Button>
    </SignInButton>
  );
}
