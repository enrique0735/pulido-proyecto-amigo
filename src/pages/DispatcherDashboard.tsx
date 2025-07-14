import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Car, MapPin, Clock, AlertCircle, Send, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const DispatcherDashboard = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isDispatchOpen, setIsDispatchOpen] = useState(false)
  const [newDispatch, setNewDispatch] = useState({
    unit: '',
    location: '',
    priority: '',
    description: ''
  })

  // Mock data
  const [units] = useState([
    { id: '001', name: 'Patrulla 1', status: 'Disponible', location: 'Sector Norte', officer: 'Sgt. García' },
    { id: '002', name: 'Patrulla 2', status: 'En Servicio', location: 'Centro Comercial', officer: 'Ofc. López' },
    { id: '003', name: 'Patrulla 3', status: 'Fuera de Servicio', location: 'Base', officer: 'Sgt. Martínez' },
    { id: '004', name: 'Supervisor A', status: 'Disponible', location: 'Sector Sur', officer: 'Lt. Rodríguez' },
  ])

  const [dispatches] = useState([
    { 
      id: '001', 
      time: '14:45', 
      unit: 'Patrulla 1', 
      incident: 'Disturbio menor', 
      location: 'Av. Principal #123', 
      priority: 'Media',
      status: 'Asignado'
    },
    { 
      id: '002', 
      time: '14:32', 
      unit: 'Patrulla 2', 
      incident: 'Patrullaje rutinario', 
      location: 'Centro Comercial Plaza', 
      priority: 'Baja',
      status: 'En Progreso'
    },
    { 
      id: '003', 
      time: '14:28', 
      unit: 'Supervisor A', 
      incident: 'Inspección de zona', 
      location: 'Sector Industrial', 
      priority: 'Media',
      status: 'Completado'
    },
  ])

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Disponible': return 'default'
      case 'En Servicio': return 'secondary'
      case 'Fuera de Servicio': return 'destructive'
      default: return 'outline'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Alta': return 'destructive'
      case 'Media': return 'secondary'
      case 'Baja': return 'outline'
      default: return 'outline'
    }
  }

  const getDispatchStatusColor = (status: string) => {
    switch(status) {
      case 'Asignado': return 'secondary'
      case 'En Progreso': return 'default'
      case 'Completado': return 'outline'
      default: return 'outline'
    }
  }

  const handleCreateDispatch = () => {
    if (!newDispatch.unit || !newDispatch.location || !newDispatch.priority || !newDispatch.description) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Despacho creado",
      description: `Asignación enviada a ${newDispatch.unit}`
    })
    
    setNewDispatch({ unit: '', location: '', priority: '', description: '' })
    setIsDispatchOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Centro de Despacho</h1>
              <p className="text-sm text-muted-foreground">Despachador - {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isDispatchOpen} onOpenChange={setIsDispatchOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Despacho
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Despacho</DialogTitle>
                  <DialogDescription>
                    Asigna una nueva tarea o servicio a una unidad disponible.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="unit">Unidad</Label>
                    <Select value={newDispatch.unit} onValueChange={(value) => setNewDispatch({...newDispatch, unit: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar unidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {units.filter(u => u.status === 'Disponible').map(unit => (
                          <SelectItem key={unit.id} value={unit.name}>
                            {unit.name} - {unit.officer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={newDispatch.location}
                      onChange={(e) => setNewDispatch({...newDispatch, location: e.target.value})}
                      placeholder="Ej: Av. Principal #123"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Prioridad</Label>
                    <Select value={newDispatch.priority} onValueChange={(value) => setNewDispatch({...newDispatch, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={newDispatch.description}
                      onChange={(e) => setNewDispatch({...newDispatch, description: e.target.value})}
                      placeholder="Descripción del incidente o tarea..."
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDispatchOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateDispatch}>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Despacho
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={logout}>
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Car className="h-4 w-4" />
                Unidades Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">En el sistema</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-500" />
                Disponibles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">2</div>
              <p className="text-xs text-muted-foreground">50% del total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                En Servicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">1</div>
              <p className="text-xs text-muted-foreground">Actualmente activa</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Fuera de Servicio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">1</div>
              <p className="text-xs text-muted-foreground">Requiere atención</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="units" className="space-y-6">
          <TabsList>
            <TabsTrigger value="units">Unidades</TabsTrigger>
            <TabsTrigger value="dispatches">Despachos</TabsTrigger>
          </TabsList>

          <TabsContent value="units">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Unidades</CardTitle>
                <CardDescription>
                  Monitoreo en tiempo real de todas las unidades del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Oficial</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {units.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell className="font-mono">{unit.id}</TableCell>
                        <TableCell className="font-medium">{unit.name}</TableCell>
                        <TableCell>{unit.officer}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(unit.status)}>
                            {unit.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{unit.location}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            disabled={unit.status !== 'Disponible'}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Asignar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dispatches">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Despachos</CardTitle>
                <CardDescription>
                  Registro de asignaciones y servicios enviados a las unidades
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hora</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Incidente</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dispatches.map((dispatch) => (
                      <TableRow key={dispatch.id}>
                        <TableCell className="font-mono">{dispatch.time}</TableCell>
                        <TableCell className="font-medium">{dispatch.unit}</TableCell>
                        <TableCell>{dispatch.incident}</TableCell>
                        <TableCell className="max-w-xs truncate">{dispatch.location}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(dispatch.priority)}>
                            {dispatch.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getDispatchStatusColor(dispatch.status)}>
                            {dispatch.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DispatcherDashboard