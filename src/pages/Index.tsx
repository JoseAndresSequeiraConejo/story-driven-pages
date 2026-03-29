import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Accessibility, ShieldCheck, Truck, Star } from "lucide-react";
import { products, testimonials } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

const Index = () => {
  const featured = products.filter((p) => p.featured);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-teal-light via-background to-sand py-20 md:py-32">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl space-y-6"
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 font-body text-sm px-4 py-1">
              Moda Inclusiva & Adaptativa
            </Badge>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight text-foreground">
              Ropa que se adapta a{" "}
              <span className="text-gradient">tu vida</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-lg">
              Prendas diseñadas para personas con discapacidad física. Funcionales, elegantes y pensadas para brindarte independencia cada día.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/catalogo">
                <Button size="lg" className="font-body gap-2">
                  Explorar catálogo <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/nosotros">
                <Button size="lg" variant="outline" className="font-body">
                  Nuestra historia
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-gradient-to-l from-primary/30 to-transparent" aria-hidden="true" />
      </section>

      {/* Values */}
      <section className="py-16 bg-card" aria-labelledby="valores-heading">
        <div className="container">
          <h2 id="valores-heading" className="sr-only">Nuestros valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Accessibility, title: "Accesibilidad primero", desc: "Cada prenda está diseñada para facilitar el vestido de manera autónoma." },
              { icon: ShieldCheck, title: "Compra segura", desc: "Pasarela de pago encriptada y confirmación inmediata de tu pedido." },
              { icon: Truck, title: "Envío a todo el mundo", desc: "Llevamos la moda adaptativa a donde tú estés, sin fronteras." },
            ].map((v) => (
              <Card key={v.title} className="text-center p-6 border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <v.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                  <p className="font-body text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16" aria-labelledby="destacados-heading">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 id="destacados-heading" className="font-display text-3xl font-bold">Prendas destacadas</h2>
            <Link to="/catalogo">
              <Button variant="ghost" className="font-body gap-1">
                Ver todo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section (HU-007) */}
      <section className="py-16 bg-primary/5" aria-labelledby="mision-heading">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 id="mision-heading" className="font-display text-3xl md:text-4xl font-bold">Nuestra misión</h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              En <strong>Inclúyete Moda</strong>, creemos que la moda es un derecho de todas las personas. Diseñamos ropa adaptativa que permite a personas con amelia, parálisis y otras condiciones físicas vestirse con independencia, comodidad y estilo.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Nuestra visión es un mundo donde ninguna persona sea excluida de la moda por su condición física. Cada prenda que creamos es un paso hacia esa realidad.
            </p>
            <Link to="/nosotros">
              <Button variant="outline" className="font-body mt-4">Conoce más sobre nosotros</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials (HU-007) */}
      <section className="py-16" aria-labelledby="testimonios-heading">
        <div className="container">
          <h2 id="testimonios-heading" className="font-display text-3xl font-bold text-center mb-10">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6 border-border/50">
                <CardContent className="pt-0 space-y-4">
                  <div className="flex gap-1" aria-hidden="true">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="font-body text-sm text-muted-foreground italic leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold">{t.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{t.condition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
