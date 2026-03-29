import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { products } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Edit, PlusCircle } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return (
      <main className="container py-20 text-center">
        <h1 className="font-display text-3xl font-bold text-destructive mb-4">Error 403</h1>
        <p className="font-body text-muted-foreground">No tienes permisos para acceder a esta sección.</p>
      </main>
    );
  }

  return (
    <main className="py-10">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Panel de administración</h1>
            <p className="font-body text-muted-foreground">Gestiona el inventario de Inclúyete Moda</p>
          </div>
          <Button className="font-body gap-2" onClick={() => toast.info("Formulario de creación (demo)")}>
            <PlusCircle className="h-4 w-4" /> Nuevo producto
          </Button>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Package className="h-5 w-5" /> Productos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body">Producto</TableHead>
                  <TableHead className="font-body">Categoría</TableHead>
                  <TableHead className="font-body">Precio</TableHead>
                  <TableHead className="font-body">Stock</TableHead>
                  <TableHead className="font-body">Estado</TableHead>
                  <TableHead className="font-body text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-body text-sm font-medium">{p.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-body text-xs capitalize">{p.category}</Badge>
                    </TableCell>
                    <TableCell className="font-body text-sm">${p.price.toFixed(2)}</TableCell>
                    <TableCell className="font-body text-sm">{p.stock}</TableCell>
                    <TableCell>
                      {p.stock === 0 ? (
                        <Badge variant="destructive" className="text-xs">Agotado</Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Activo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => toast.info(`Editando ${p.name} (demo)`)} aria-label={`Editar ${p.name}`}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Admin;
