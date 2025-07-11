import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { Shield, Radio, MapPin, Users } from 'lucide-react'

const HomePage = () => {
  const { user, logout } = useAuth()

  const features = [
    {
      icon: Shield,
      title: 'Control de Supervisores',
      description: 'Gestión completa de supervisores motorizados en tiempo real'
    },
    {
      icon: Radio,
      title: 'Comunicación Instantánea',
      description: 'Sistema de comunicación bidireccional con operadores de medios'
    },
    {
      icon: MapPin,
      title: 'Seguimiento GPS',
      description: 'Ubicación en tiempo real de todos los supervisores en campo'
    },
    {
      icon: Users,
      title: 'Gestión de Roles',
      description: 'Sistema de roles para administradores, despachadores y operadores'
    }
  ]

  const getRoleDashboard = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'administrador': return '/admin'
      case 'operador_medios': return '/operador'
      case 'despachador': return '/despachador'
      case 'supervisor_motorizado': return '/supervisor'
      default: return '/'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Despacho Supervisores</h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Badge variant="secondary">{user.name}</Badge>
                <Button asChild>
                  <Link to={getRoleDashboard()}>Mi Dashboard</Link>
                </Button>
                <Button variant="outline" onClick={logout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Plataforma de Despacho de
            <span className="text-primary block">Supervisores Motorizados</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistema integral para la gestión, comunicación y seguimiento de supervisores motorizados 
            con roles diferenciados para administradores, operadores y despachadores.
          </p>
          {!user && (
            <Button size="lg" asChild>
              <Link to="/login">Acceder al Sistema</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Características Principales
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Roles del Sistema
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Administrador</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Creación y gestión de operadores, configuración del sistema y supervisión general.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Operador de Medios</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Comunicación con supervisores, gestión de canales de radio y coordinación.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Despachador</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Asignación de tareas, seguimiento de supervisores y coordinación de operaciones.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Supervisor Motorizado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Recepción de asignaciones, reporte de estado y comunicación en campo.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Despacho Supervisores Motorizados. Sistema de gestión integral.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage