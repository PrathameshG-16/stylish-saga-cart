
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const { items } = useCart();
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "Designer", href: "/designer" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">FASHION</Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-gray-900 py-2"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 min-w-[18px] h-[18px] rounded-full p-0 flex items-center justify-center text-xs">
                  {items.length}
                </Badge>
              )}
            </Link>
            
            <Link to="/designer">
              <Button size="sm" variant="outline" className="hidden md:flex">
                <Pencil className="mr-2 h-4 w-4" />
                Design Your Own
              </Button>
            </Link>

            {/* Mobile menu button */}
            {isMobile && (
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="px-2 py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                    
                    <div className="mt-8 flex flex-col space-y-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          className="px-3 py-2 text-lg rounded-md hover:bg-gray-100"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <Link 
                        to="/designer"
                        className="mt-4 flex items-center px-3 py-2 text-lg rounded-md hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Pencil className="mr-2 h-5 w-5" />
                        Design Your Own
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
