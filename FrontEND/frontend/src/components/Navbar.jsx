import React, { useState, useEffect } from "react";
import {
  ArrowLeftRightIcon,
  BarChart3Icon,
  Clock4Icon,
  LayoutDashboard,
  HelpCircleIcon,
  ArrowLeft,
  ArrowRight
} from "lucide-react"; // Ensure correct imports
import { motion } from "framer-motion";

const variants = {
  expanded: { width: "220px" },
  nonexpanded: { width: "60px" },
};

const navLinks = [
  {
    link: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    link: "Activity",
    icon: Clock4Icon,
  },
  {
    link: "Analytics",
    icon: BarChart3Icon,
  },
  {
    link: "Transactions",
    icon: ArrowLeftRightIcon,
  },
  {
    link: "Support",
    icon: HelpCircleIcon,
  },
];

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // screen resize
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      animate={isExpanded ? "expanded" : "nonexpanded"}
      variants={variants}
      className={`py-10 h-screen flex flex-col border border-r-1 bg-[#FDFDFD] relative ${
        isExpanded ? "px-10" : "px-2 duration-500"
      }`}
    >
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer absolute -right-3 top-10 rounded-full w-6 h-6 bg-[#FF8C8C] md:flex hidden justify-center items-center"
      >
        {isExpanded ? <ArrowLeft size={12} /> : <ArrowRight size={12} />}
      </div>

      <div className="flex flex-col space-y-8 mt-12">
        {navLinks.map((item, index) => (
          <div className="nav-links w-full" key={index}>
            <div
              onClick={() => setActiveIndex(index)}
              className={`flex space-x-3 w-full p-2 rounded ${
                activeIndex === index ? "bg-[#FF8C8C] text-white" : "text-black"
              } ${!isExpanded ? "pl-3" : ""}`}
            >
              <item.icon className="md:w-6 w-4" />
              <span className={!isExpanded ? "hidden" : "block"}>
                {item.link}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Navbar;
