import { memo } from "react";

const Footer = memo(() => {
    return (
      <footer className="w-full bg-neutral-900 py-6 mt-8 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Mofie. All rights reserved.</p>
      </footer>
    );
  });

Footer.displayName = "Footer";
export default Footer;
  