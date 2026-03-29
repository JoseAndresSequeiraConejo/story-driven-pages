import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-secondary/50 mt-16" role="contentinfo">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg font-bold text-primary mb-3">Inclúyete Moda</h3>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Ropa adaptativa diseñada para personas con discapacidad. Moda funcional, inclusiva y con estilo.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Navegación</h4>
          <ul className="space-y-2 font-body text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition-colors">Inicio</Link></li>
            <li><Link to="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link></li>
            <li><Link to="/nosotros" className="hover:text-primary transition-colors">Nuestra historia</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold mb-3">Accesibilidad</h4>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Nuestro sitio es accesible por teclado, compatible con lectores de pantalla y ofrece modo de alto contraste.
          </p>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center">
        <p className="font-body text-xs text-muted-foreground flex items-center justify-center gap-1">
          Hecho con <Heart className="h-3 w-3 text-accent" aria-hidden="true" /> por Inclúyete Moda © 2024
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
