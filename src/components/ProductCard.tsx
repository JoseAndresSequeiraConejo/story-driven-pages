import { Product } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const categoryLabels: Record<string, string> = {
  amelia: "Amelia",
  paralisis: "Parálisis",
  universal: "Universal",
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/producto/${product.id}`} aria-label={`Ver detalle de ${product.name}. ${product.description}. Precio: ${product.price} dólares`}>
        <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={`${product.name}: ${product.functionalDescription}`}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
              loading="lazy"
            />
            {isOutOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                <Badge variant="destructive" className="text-sm px-4 py-1">Agotado</Badge>
              </div>
            )}
            <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs">
              {categoryLabels[product.category]}
            </Badge>
          </div>
          <CardContent className="p-4 space-y-2">
            <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="font-body text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <p className="font-display text-xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
