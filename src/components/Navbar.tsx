import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

// Estratégia simplificada: removida lógica de autenticação e manifesto.
// CTA único para entrada na comunidade via WhatsApp.
export const Navbar = ({ onOpenManifesto }: { onOpenManifesto?: () => void }) => {
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
    { name: "Manifesto", path: "/quem-somos" },
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
              className={`text-2xl font-bold font-poppins transition-colors duration-500 ${
                scrolled ? "text-foreground" : "text-background"
              }`}
            >
              +Creator
            </span>
          </Link>

          {/* Center Links (desktop) */}
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

          {/* Small Manifesto trigger if parent provides handler */}
          {onOpenManifesto && (
            <div className="hidden md:block ml-6">
              <button
                onClick={onOpenManifesto}
                className={`text-sm font-medium underline ${scrolled ? 'text-foreground' : 'text-background'}`}
              >
                Assinar Manifesto
              </button>
            </div>
          )}

          {/* Right area: desktop CTA vs mobile menu */}
          <div className="flex items-center">
            {/* Desktop CTA único */}
            <div className="hidden md:block">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-glow transition-all duration-300 hover:scale-105">
                <a
                  href="https://wa.me/55XXXXXXXXXX" // TODO: substituir pelo número definitivo
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Entrar na Comunidade
                </a>
              </Button>
            </div>

            {/* Mobile: menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    aria-label="Abrir menu"
                    className={`inline-flex items-center justify-center rounded-md p-2 transition-colors ${
                      scrolled ? "text-foreground hover:bg-muted" : "text-background hover:bg-white/10"
                    }`}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] sm:w-[380px]">
                  <div className="space-y-1">
                    {navLinks.map((l) => (
                      <SheetClose asChild key={l.path}>
                        <Link to={l.path} className="block rounded-md px-3 py-2 text-base hover:bg-muted">
                          {l.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <a
                        href="https://wa.me/55XXXXXXXXXX" // TODO: substituir pelo número definitivo
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Entrar na Comunidade
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
