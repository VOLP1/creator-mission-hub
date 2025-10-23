import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // On home page, change navbar when scrolling past hero section
      if (isHome) {
        const scrollPosition = window.scrollY;
        setScrolled(scrollPosition > window.innerHeight * 0.8);
      } else {
        // On other pages, always show light navbar
        setScrolled(true);
      }
    };

    handleScroll(); // Check initial state
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "O Problema", path: "/alarme" },
    { name: "Quem Somos", path: "/quem-somos" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span
              className={`text-2xl font-bold font-serif transition-colors duration-500 ${
                scrolled ? "text-foreground" : "text-background"
              }`}
            >
              +Creator
            </span>
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-500 hover:text-primary ${
                  scrolled ? "text-foreground" : "text-background"
                } ${
                  location.pathname === link.path
                    ? "text-primary"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/projetos">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow transition-all duration-300 hover:scale-105"
            >
              Apoie a Missão
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};
