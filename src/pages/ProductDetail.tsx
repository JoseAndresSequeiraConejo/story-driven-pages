import { useParams, Link } from "react-router-dom";
import { products } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const categoryLabels: Record<string, string> = {
  amelia: "Amelia",
  paralisis: "Parálisis",
  universal: "Universal",
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return (
      <main className="container py-20 text-center">
        <p className="font-body text-lg text-muted-foreground">Producto no encontrado.</p>
        <Link to="/catalogo"><Button variant="outline" className="mt-4">Volver al catálogo</Button></Link>
      </main>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <main className="py-10">
      <div className="container">
        <Link to="/catalogo" className="inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="aspect-[4/5] rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={`${product.name}: ${product.functionalDescription}`}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-3">
                {categoryLabels[product.category]}
              </Badge>
              <h1 className="font-display text-3xl font-bold">{product.name}</h1>
            </div>

            <p className="font-display text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>

            <div className="space-y-2">
              <h2 className="font-display text-lg font-semibold">Descripción</h2>
              <p className="font-body text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-lg font-semibold">Características funcionales</h2>
              <p className="font-body text-muted-foreground leading-relaxed">{product.functionalDescription}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h2 className="font-display text-lg font-semibold">Talla</h2>
              <div className="flex gap-2 flex-wrap" role="group" aria-label="Seleccionar talla">
                {product.sizes.map((s) => (
                  <Button
                    key={s}
                    variant={selectedSize === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(s)}
                    className="font-body min-w-[3rem]"
                    aria-pressed={selectedSize === s}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>

            {isOutOfStock ? (
              <Badge variant="destructive" className="text-base px-6 py-2">Agotado</Badge>
            ) : (
              <Button
                size="lg"
                className="w-full font-body gap-2"
                disabled={!selectedSize}
                onClick={() => addItem(product, selectedSize)}
              >
                <ShoppingCart className="h-5 w-5" />
                {selectedSize ? "Agregar al carrito" : "Selecciona una talla"}
              </Button>
            )}

            <p className="font-body text-xs text-muted-foreground">
              {product.stock > 0 ? `${product.stock} unidades disponibles` : ""}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
