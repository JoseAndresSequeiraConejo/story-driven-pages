import { useState, useMemo } from "react";
import { products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const categories = [
  { value: "all", label: "Todas" },
  { value: "amelia", label: "Amelia" },
  { value: "paralisis", label: "Parálisis" },
  { value: "universal", label: "Universal" },
];

const Catalog = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = filter === "all" || p.category === filter;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

  return (
    <main className="py-10">
      <div className="container">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Catálogo</h1>
        <p className="font-body text-muted-foreground mb-8">Explora nuestras prendas adaptativas por tipo de condición</p>

        {/* Filters (HU-001) */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder="Buscar prendas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 font-body"
              aria-label="Buscar prendas en el catálogo"
            />
          </div>
          <div className="flex gap-2 flex-wrap" role="group" aria-label="Filtrar por tipo de discapacidad">
            {categories.map((c) => (
              <Button
                key={c.value}
                variant={filter === c.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(c.value)}
                className="font-body"
                aria-pressed={filter === c.value}
              >
                {c.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground text-lg">No se encontraron prendas con esos filtros.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Catalog;
