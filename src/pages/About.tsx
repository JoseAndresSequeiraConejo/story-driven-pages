import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/lib/data";
import { Star, Heart, Users, Target, Eye } from "lucide-react";

const About = () => (
  <main className="py-10">
    <div className="container max-w-4xl">
      {/* Hero */}
      <div className="text-center space-y-4 mb-16">
        <Badge className="bg-primary/10 text-primary border-primary/20 font-body">Nuestra historia</Badge>
        <h1 className="font-display text-4xl md:text-5xl font-bold">Inclúyete Moda</h1>
        <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Somos una marca de moda adaptativa comprometida con la inclusión, la funcionalidad y el estilo para todas las personas.
        </p>
      </div>

      {/* Mission, Vision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: Target, title: "Misión", text: "Diseñar y ofrecer ropa adaptativa de alta calidad que empodere a personas con discapacidad física para vestirse de forma autónoma, cómoda y con estilo." },
          { icon: Eye, title: "Visión", text: "Ser la marca líder en moda inclusiva a nivel global, donde ninguna persona sea excluida de expresar su identidad a través de la ropa." },
          { icon: Users, title: "Beneficiarios", text: "Personas con amelia, parálisis, movilidad reducida y cualquier condición que dificulte el uso de ropa convencional. Cada prenda es un paso hacia la independencia." },
        ].map((item) => (
          <Card key={item.title} className="border-border/50 p-6">
            <CardContent className="pt-0 space-y-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h2 className="font-display text-xl font-bold">{item.title}</h2>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Impact */}
      <section className="bg-primary/5 rounded-2xl p-8 md:p-12 mb-16" aria-labelledby="impacto-heading">
        <h2 id="impacto-heading" className="font-display text-3xl font-bold text-center mb-4">Nuestro impacto</h2>
        <p className="font-body text-center text-muted-foreground max-w-xl mx-auto mb-8">
          Cada prenda que creamos transforma vidas. Estos son algunos de los testimonios de personas que han recuperado su independencia con Inclúyete Moda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.id} className="border-border/50 p-5">
              <CardContent className="pt-0 space-y-3">
                <div className="flex gap-1" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="font-body text-sm text-muted-foreground italic">"{t.quote}"</blockquote>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-xs">{t.avatar}</div>
                  <div>
                    <p className="font-body text-xs font-semibold">{t.name}</p>
                    <p className="font-body text-xs text-muted-foreground">{t.condition}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="text-center space-y-4">
        <Heart className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
        <h2 className="font-display text-2xl font-bold">Moda con propósito</h2>
        <p className="font-body text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Utilizamos un lenguaje claro e inclusivo. Nuestro compromiso es que cada persona se sienta representada, respetada y empoderada a través de nuestras prendas y nuestra comunicación.
        </p>
      </section>
    </div>
  </main>
);

export default About;
