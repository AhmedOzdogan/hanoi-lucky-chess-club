import { FaFacebook } from "react-icons/fa";
import {SiZalo} from "react-icons/si";

function Footer () {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-20 bg-club-primary text-club-dark flex items-center justify-between px-6">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Hanoi Lucky Chess Club. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
      <SiZalo className="h-6 w-6 hover:text-club-secondary transition-colors duration-300 cursor-pointer" />
      <FaFacebook className="h-6 w-6 hover:text-club-secondary transition-colors duration-300 cursor-pointer" />
      </div>
    </footer>
  );
}

export default Footer;