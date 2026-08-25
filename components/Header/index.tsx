"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  // Close dropdown and mobile navigation when menu item is clicked
  const handleMenuItemClick = () => {
    setOpenDropdown(null);
    setNavigationOpen(false);
  };

  // Toggle dropdown
  const toggleDropdown = (menuId: number) => {
    setOpenDropdown(openDropdown === menuId ? null : menuId);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  useEffect(() => {
    document.body.style.overflow = navigationOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navigationOpen]);

  return (
    <header
      className={`fixed left-0 top-0 z-[9999] w-full ${
        stickyMenu || navigationOpen
          ? "bg-white shadow transition duration-100 dark:bg-black"
          : "bg-white/80 backdrop-blur-sm dark:bg-black/80"
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between py-2.5 sm:py-3 xl:w-1/4 xl:py-3">
          <a href="/" className="shrink-0">
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              width={140}
              height={140}
              className="h-9 w-auto object-contain dark:hidden sm:h-10 xl:h-16 xl:w-auto"
            />
            <Image
              src="/images/logo/logo.png"
              alt="logo"
              width={140}
              height={140}
              className="hidden h-9 w-auto object-contain dark:block sm:h-10 xl:h-16 xl:w-auto"
            />
          </a>

          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="absolute right-0 block h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-300" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "delay-400 !w-full" : "w-0"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!w-full delay-500" : "w-0"
                  }`}
                ></span>
              </span>
              <span className="du-block absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-[0]" : "h-full"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !navigationOpen ? "!h-0 delay-200" : "h-0.5"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        {/* Nav Menu Start */}
        <div
          className={cn(
            "xl:flex xl:w-full xl:items-center xl:justify-between",
            navigationOpen
              ? "fixed inset-x-0 top-14 z-[9999] flex max-h-[calc(100dvh-3.5rem)] flex-col overflow-y-auto border-t border-stroke bg-white p-7.5 shadow-solid-5 dark:border-strokedark dark:bg-blacksection"
              : "hidden",
            "xl:static xl:max-h-none xl:flex-row xl:overflow-visible xl:border-0 xl:bg-transparent xl:p-0 xl:shadow-none xl:dark:bg-transparent",
          )}
        >
          <nav>
            <ul className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-5 2xl:gap-8">
              {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "group relative"}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(menuItem.id)}
                        className="flex cursor-pointer items-center justify-between gap-1.5 whitespace-nowrap text-sm hover:text-primary 2xl:gap-2 2xl:text-base"
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className={`h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary transition-transform duration-200 ${
                              openDropdown === menuItem.id ? "rotate-180" : ""
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button>

                      <ul
                        className={cn(
                          "dropdown",
                          openDropdown === menuItem.id &&
                            "mt-3 !flex flex-col gap-3 pl-4 xl:mt-0 xl:pl-0",
                        )}
                      >
                        {menuItem.submenu.map((item, key) => (
                          <li key={key} className="hover:text-primary">
                            <Link href={item.path || "#"} onClick={handleMenuItemClick}>
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      onClick={handleMenuItemClick}
                      className={cn(
                        "whitespace-nowrap text-sm 2xl:text-base",
                        pathUrl === menuItem.path
                          ? "text-primary hover:text-primary"
                          : "hover:text-primary",
                      )}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-7 flex items-center gap-4 xl:mt-0 xl:shrink-0">
            <ThemeToggler />

            <Link
              href="https://www.linkedin.com/company/dataverseafrica/"
              className="flex items-center justify-center whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm text-white duration-300 ease-in-out 2xl:px-7.5 2xl:text-regular"
            >
              Join The Community 🔥
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

// w-full delay-300

export default Header;
