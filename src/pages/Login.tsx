import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      toast.error("Completa todos los campos");
      return;
    }
    if (isRegister) {
      register(name, email, password);
    } else {
      login(email, password);
    }
    navigate("/");
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center py-10">
      <Card className="w-full max-w-md border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="font-display text-2xl">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </CardTitle>
          <CardDescription className="font-body">
            {isRegister
              ? "Regístrate para guardar pedidos y preferencias"
              : "Ingresa a tu cuenta de Inclúyete Moda"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="space-y-2">
                <Label htmlFor="name" className="font-body">Nombre</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="font-body" />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body">Correo electrónico</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" className="font-body" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-body">Contraseña</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="font-body" />
            </div>

            <Button type="submit" className="w-full font-body" size="lg">
              {isRegister ? "Crear cuenta" : "Ingresar"}
            </Button>

            {!isRegister && (
              <p className="text-center">
                <button type="button" className="font-body text-sm text-primary hover:underline" onClick={() => toast.info("Se enviará un enlace de recuperación a tu correo")}>
                  ¿Olvidaste tu contraseña?
                </button>
              </p>
            )}

            <p className="text-center font-body text-sm text-muted-foreground">
              {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
              <button type="button" className="text-primary hover:underline font-medium" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "Inicia sesión" : "Regístrate"}
              </button>
            </p>
          </form>

          <p className="text-center font-body text-xs text-muted-foreground mt-4">
            Demo: usa <strong>admin@incluyete.com</strong> para acceso de administrador
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
