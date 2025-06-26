import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { smoothScrollTo } from "@/lib/utils";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Experience", href: "experience" },
  { label: "Education", href: "education" },
  { label: "Projects", href: "projects" },
  { label: "Achievements", href: "publications" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      // Scroll-spy logic
      const sectionOffsets = navItems.map((item) => {
        const el = document.getElementById(item.href);
        return el ? { id: item.href, top: el.getBoundingClientRect().top + window.scrollY } : null;
      }).filter(Boolean) as { id: string; top: number }[];
      const scrollPosition = window.scrollY + 100;
      let current = "about";
      for (let i = 0; i < sectionOffsets.length; i++) {
        if (scrollPosition >= sectionOffsets[i].top) {
          current = sectionOffsets[i].id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleNavClick = (href: string) => {
    smoothScrollTo(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 navbar-blur border-b",
        isScrolled
          ? "bg-background/95 border-border"
          : "bg-background/80 border-transparent"
      )}
      aria-label="Main navigation"
    >
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold text-foreground">
            Hanzla Nawaz
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "text-muted-foreground hover:text-primary transition-colors duration-200 relative px-2 py-1 focus:outline-none",
                  activeSection === item.href && "text-primary font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                )}
                aria-current={activeSection === item.href ? "page" : undefined}
              >
                {item.label}
              </button>
            ))}

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-4"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "text-left px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200 relative",
                    activeSection === item.href && "text-primary font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary after:rounded-full"
                  )}
                  aria-current={activeSection === item.href ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
