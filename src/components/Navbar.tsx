import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useState } from "react";

const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { highContrast, toggleHighContrast } = useAccessibility();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/catalogo", label: "Catálogo" },
    { to: "/nosotros", label: "Nosotros" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="navigation" aria-label="Navegación principal">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Inclúyete Moda - Inicio">
          <span className="text-2xl font-display font-bold text-primary">Inclúyete</span>
          <span className="text-sm font-body text-muted-foreground tracking-widest uppercase">Moda</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body text-sm font-medium transition-colors hover:text-primary ${isActive(l.to) ? "text-primary" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className={`font-body text-sm font-medium transition-colors hover:text-primary ${isActive("/admin") ? "text-primary" : "text-muted-foreground"}`}>
              Admin
            </Link>
          )}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleHighContrast} aria-label={highContrast ? "Desactivar alto contraste" : "Activar alto contraste"}>
            {highContrast ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </Button>

          <Link to="/carrito">
            <Button variant="ghost" size="icon" className="relative" aria-label={`Carrito con ${itemCount} artículos`}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link to="/perfil">
                <Button variant="ghost" size="sm" className="font-body">{user.name}</Button>
              </Link>
              <Button variant="outline" size="sm" onClick={logout} className="font-body">Salir</Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon" aria-label="Iniciar sesión">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menú">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block font-body text-sm py-2 hover:text-primary" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link to="/admin" className="block font-body text-sm py-2 hover:text-primary" onClick={() => setMobileOpen(false)}>Admin</Link>
          )}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button variant="ghost" size="icon" onClick={toggleHighContrast} aria-label="Alto contraste">
              {highContrast ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
            <Link to="/carrito" onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center">{itemCount}</span>}
              </Button>
            </Link>
            {user ? (
              <>
                <Link to="/perfil" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm">{user.name}</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => { logout(); setMobileOpen(false); }}>Salir</Button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm">Ingresar</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
