import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para completar tu compra");
      navigate("/login");
      return;
    }
    clearCart();
    toast.success("¡Pedido realizado con éxito! Recibirás un correo de confirmación.", { duration: 5000 });
    navigate("/perfil");
  };

  if (items.length === 0) {
    return (
      <main className="container py-20 text-center space-y-4">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50" aria-hidden="true" />
        <h1 className="font-display text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="font-body text-muted-foreground">Explora nuestro catálogo y encuentra la prenda perfecta.</p>
        <Link to="/catalogo"><Button className="font-body">Ir al catálogo</Button></Link>
      </main>
    );
  }

  return (
    <main className="py-10">
      <div className="container">
        <h1 className="font-display text-3xl font-bold mb-8">Carrito de compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="border-border/50">
                <CardContent className="p-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 rounded-md object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="font-display font-semibold">{item.product.name}</h3>
                    <p className="font-body text-sm text-muted-foreground">Talla: {item.size}</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} aria-label="Reducir cantidad">
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-16 h-8 text-center font-body"
                        aria-label="Cantidad"
                        min={1}
                        type="number"
                      />
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} aria-label="Aumentar cantidad">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-display font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeItem(item.product.id)} aria-label={`Eliminar ${item.product.name}`}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="h-fit border-border/50">
            <CardHeader>
              <CardTitle className="font-display">Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-primary font-medium">Gratis</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-display font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full font-body" size="lg" onClick={handleCheckout}>
                Pagar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Cart;
