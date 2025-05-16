"use client";

import { memo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import menus from "@/core/route/menus";

interface NavbarProps {
  onClickSearch: () => void;
}

const Navbar = memo((props: NavbarProps) => {
  const {onClickSearch} = props;
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname(); // current path

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = useCallback((item: string) => pathname === item, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-5 bg-background" : "bg-gradient-to-b from-black/80 to-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Section: Logo + Menu */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-red-600 mr-20">MOFIE</h1>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-10">
              {menus.map((item, index) => (
                <NavigationMenuItem key={`link-${index}`}>
                  {item.type === "link" ? (
                    <NavigationMenuLink className="px-6" asChild>
                      <Link
                        href={item.href ?? "#"}
                        className={cn(
                          "text-sm",
                          isActive(item.href ?? "")
                            ? "text-white font-bold"
                            : "text-white hover:text-black"
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  ) : (
                    <>
                      <NavigationMenuTrigger
                        className={"text-sm px-6 bg-transparent"}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="bg-black border border-gray-800 rounded-md shadow-lg">
                        {item.content}
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-4">
          <Button onClick={onClickSearch} variant="ghost" size="icon" className="text-white">
            <Search size={24} />
          </Button>
          {/* Mobile Menu Icon */}
          <Button variant="ghost" size="icon" className="text-white md:hidden">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </nav>
  );
});
Navbar.displayName = "Navbar";
export default Navbar;
