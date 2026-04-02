import { useUser } from "@/context/UserContext";
import UserMenu from "./UserMenu";
import Link from "next/link";

export default function NavLinks() {
  const { user } = useUser();
  return (
    <div className="flex flex-row items-center gap-4 text-sm font-semibold">
      <Link href="/" className="hover:text-primary transition-colors">
        Home
      </Link>
      <Link href="/about" className="hover:text-primary transition-colors">
        About
      </Link>
      <Link href="/contact" className="hover:text-primary transition-colors">
        Contact
      </Link>
      <UserMenu />
    </div>
  );
}
