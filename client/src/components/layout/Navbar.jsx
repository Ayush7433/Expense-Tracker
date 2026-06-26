import { Bell, Menu } from "lucide-react";
import React from "react";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b px-4 flex items-center justify-between">
      <div className="flex gap-3 items-center">
        <div>
          <button className="cursor-pointer hover:text-gray-600">
            <Menu size={16} />
          </button>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <div>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search expenses..."
            className="border focus:outline-none rounded-sm px-2 text-sm py-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
