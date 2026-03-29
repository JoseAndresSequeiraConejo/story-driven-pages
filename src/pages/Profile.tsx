import { useAuth } from "@/context/AuthContext";
import { sampleOrders } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronUp, Package } from "lucide-react";
import type { Order } from "@/lib/data";

const statusColors: Record<string, string> = {
  procesando: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "en preparación": "bg-blue-100 text-blue-800 border-blue-200",
  enviado: "bg-purple-100 text-purple-800 border-purple-200",
  entregado: "bg-green-100 text-green-800 border-green-200",
};

const Profile = () => {
  const { user } = useAuth();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!user) return <Navigate to="/login" />;

  return (
    <main className="py-10">
      <div className="container max-w-4xl">
        <h1 className="font-display text-3xl font-bold mb-2">Mi perfil</h1>
        <p className="font-body text-muted-foreground mb-8">Bienvenido, {user.name}</p>

        {/* Orders (HU-004) */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Package className="h-5 w-5" /> Mis pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sampleOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="font-body text-muted-foreground">Aún no tienes pedidos.</p>
                <Link to="/catalogo"><Button variant="outline" className="mt-3 font-body">Explorar catálogo</Button></Link>
              </div>
            ) : (
              <div className="space-y-4">
                {sampleOrders.map((order) => (
                  <OrderCard key={order.id} order={order} expanded={expandedOrder === order.id} onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

const OrderCard = ({ order, expanded, onToggle }: { order: Order; expanded: boolean; onToggle: () => void }) => (
  <Card className="border-border/50">
    <CardContent className="p-4">
      <button onClick={onToggle} className="w-full flex items-center justify-between" aria-expanded={expanded} aria-label={`Pedido ${order.id}`}>
        <div className="flex items-center gap-4 text-left">
          <div>
            <p className="font-body text-sm font-semibold">{order.id}</p>
            <p className="font-body text-xs text-muted-foreground">{order.date}</p>
          </div>
          <Badge className={statusColors[order.status]}>{order.status}</Badge>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-display font-bold">${order.total.toFixed(2)}</span>
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-body">Producto</TableHead>
                <TableHead className="font-body">Talla</TableHead>
                <TableHead className="font-body">Cant.</TableHead>
                <TableHead className="font-body text-right">Precio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.product.id}>
                  <TableCell className="font-body text-sm">{item.product.name}</TableCell>
                  <TableCell className="font-body text-sm">{item.size}</TableCell>
                  <TableCell className="font-body text-sm">{item.quantity}</TableCell>
                  <TableCell className="font-body text-sm text-right">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div>
            <h4 className="font-body text-sm font-semibold mb-2">Historial de estados</h4>
            <div className="space-y-1">
              {order.statusHistory.map((s, i) => (
                <div key={i} className="flex items-center gap-2 font-body text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="capitalize">{s.status}</span>
                  <span className="text-muted-foreground">— {s.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

export default Profile;
