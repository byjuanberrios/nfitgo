import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="fixed z-40 px-4 py-8 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-12">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="w-25"
            width={115}
            height={36}
          />
          <div className="hidden md:flex gap-8">
            <Link href="/">Explorar</Link>
            <Link href="/">Inscribe tu centro</Link>
          </div>
        </div>
        <div className="hidden md:flex gap-8">
          <Link href="/">Ingresa</Link>
          <Link href="/">Registrar</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
