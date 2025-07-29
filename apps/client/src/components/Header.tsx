"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-white">
            {activeLink === "/" ? "Random Users" : "Saved Users"}
          </h1>
          <nav className="flex space-x-4">
            <Link
              href="/"
              className={`font-medium transition-colors duration-200 hover:text-blue-700 ${
                activeLink === "/" ? "text-blue-600" : "text-white"
              }`}
              onClick={() => handleLinkClick("/")}
            >
              Users
            </Link>
            <Link
              href="/saved"
              className={`font-medium transition-colors duration-200 hover:text-blue-700 ${
                activeLink === "/saved" ? "text-blue-600" : "text-white"
              }`}
              onClick={() => handleLinkClick("/saved")}
            >
              Saved Users
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
