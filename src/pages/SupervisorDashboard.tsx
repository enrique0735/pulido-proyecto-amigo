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
import { Shield, MapPin, Clock, AlertTriangle, FileText, Plus, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const SupervisorDashboard = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [newReport, setNewReport] = useState({
    type: '',
    location: '',
    priority: '',
    description: ''
  })

  // Mock data
  const [patrols] = useState([
    { id: '001', officer: 'Ofc. García', sector: 'Norte', startTime: '06:00', status: 'Activo', incidents: 2 },
    { id: '002', officer: 'Ofc. López', sector: 'Centro', startTime: '06:00', status: 'Activo', incidents: 1 },
    { id: '003', officer: 'Ofc. Martínez', sector: 'Sur', startTime: '14:00', status: 'Descanso', incidents: 0 },
    { id: '004', officer: 'Ofc. Rodríguez', sector: 'Este', startTime: '14:00', status: 'Activo', incidents: 3 },
  ])

  const [reports] = useState([
    { 
      id: '001', 
      time: '15:20', 
      type: 'Patrullaje', 
      location: 'Sector Norte - Zona A', 
      officer: 'Ofc. García',
      status: 'Completado',
      priority: 'Normal'
    },
    { 
      id: '002', 
      time: '14:45', 
      type: 'Incidente', 
      location: 'Centro Comercial', 
      officer: 'Ofc. López',
      status: 'En Proceso',
      priority: 'Media'
    },
    { 
      id: '003', 
      time: '14:30', 
      type: 'Inspección', 
      location: 'Sector Este - Zona Industrial', 
      officer: 'Ofc. Rodríguez',
      status: 'Completado',
      priority: 'Alta'
    },
  ])

  const [incidents] = useState([
    { 
      id: '001', 
      time: '15:15', 
      type: 'Disturbio menor', 
      location: 'Av. Principal #456',
      officer: 'Ofc. García',
      status: 'Resuelto',
      severity: 'Baja'
    },
    { 
      id: '002', 
      time: '14:50', 
      type: 'Vehículo sospechoso', 
      location: 'Plaza Central',
      officer: 'Ofc. López',
      status: 'Investigando',
      severity: 'Media'
    },
    { 
      id: '003', 
      time: '14:35', 
      type: 'Alarma activada', 
      location: 'Sector Industrial Lote 12',
      officer: 'Ofc. Rodríguez',
      status: 'Falsa alarma',
      severity: 'Alta'
    },
  ])

  const getPatrolStatusColor = (status: string) => {
    switch(status) {
      case 'Activo': return 'default'
      case 'Descanso': return 'secondary'
      case 'Fuera de Servicio': return 'destructive'
      default: return 'outline'
    }
  }

  const getReportStatusColor = (status: string) => {
    switch(status) {
      case 'Completado': return 'default'
      case 'En Proceso': return 'secondary'
      case 'Pendiente': return 'outline'
      default: return 'outline'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Alta': return 'destructive'
      case 'Media': return 'secondary'
      case 'Baja': case 'Normal': return 'outline'
      default: return 'outline'
    }
  }

  const getIncidentStatusColor = (status: string) => {
    switch(status) {
      case 'Resuelto': return 'default'
      case 'Investigando': return 'secondary'
      case 'Falsa alarma': return 'outline'
      default: return 'outline'
    }
  }

  const handleCreateReport = () => {
    if (!newReport.type || !newReport.location || !newReport.priority || !newReport.description) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        variant: "destructive"
      })
      return
    }

    toast({
      title: "Reporte creado",
      description: `Reporte de ${newReport.type} enviado exitosamente`
    })
    
    setNewReport({ type: '', location: '', priority: '', description: '' })
    setIsReportOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Centro de Supervisión</h1>
              <p className="text-sm text-muted-foreground">Supervisor Motorizado - {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Reporte
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Crear Nuevo Reporte</DialogTitle>
                  <DialogDescription>
                    Registra un nuevo reporte de supervisión o incidente.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo de Reporte</Label>
                    <Select value={newReport.type} onValueChange={(value) => setNewReport({...newReport, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Patrullaje">Patrullaje</SelectItem>
                        <SelectItem value="Incidente">Incidente</SelectItem>
                        <SelectItem value="Inspección">Inspección</SelectItem>
                        <SelectItem value="Emergencia">Emergencia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Ubicación</Label>
                    <Input
                      id="location"
                      value={newReport.location}
                      onChange={(e) => setNewReport({...newReport, location: e.target.value})}
                      placeholder="Ej: Sector Norte - Zona A"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Prioridad</Label>
                    <Select value={newReport.priority} onValueChange={(value) => setNewReport({...newReport, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alta">Alta</SelectItem>
                        <SelectItem value="Media">Media</SelectItem>
                        <SelectItem value="Baja">Baja</SelectItem>
                        <SelectItem value="Normal">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={newReport.description}
                      onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                      placeholder="Descripción detallada del reporte..."
                      rows={4}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsReportOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateReport}>
                    <FileText className="h-4 w-4 mr-2" />
                    Crear Reporte
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
                <Shield className="h-4 w-4" />
                Oficiales Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">De 4 totales</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Sectores Cubiertos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">100% cobertura</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Incidentes Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">6</div>
              <p className="text-xs text-muted-foreground">2 en proceso</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Casos Resueltos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">4</div>
              <p className="text-xs text-muted-foreground">67% completados</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patrols" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patrols">Patrullas</TabsTrigger>
            <TabsTrigger value="reports">Reportes</TabsTrigger>
            <TabsTrigger value="incidents">Incidentes</TabsTrigger>
          </TabsList>

          <TabsContent value="patrols">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Patrullas</CardTitle>
                <CardDescription>
                  Supervisión en tiempo real de todos los oficiales en servicio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Oficial</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Hora Inicio</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Incidentes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patrols.map((patrol) => (
                      <TableRow key={patrol.id}>
                        <TableCell className="font-mono">{patrol.id}</TableCell>
                        <TableCell className="font-medium">{patrol.officer}</TableCell>
                        <TableCell>{patrol.sector}</TableCell>
                        <TableCell>{patrol.startTime}</TableCell>
                        <TableCell>
                          <Badge variant={getPatrolStatusColor(patrol.status)}>
                            {patrol.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={patrol.incidents > 2 ? 'text-yellow-500 font-medium' : ''}>
                            {patrol.incidents}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reportes de Supervisión</CardTitle>
                <CardDescription>
                  Registro de reportes y actividades de supervisión
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hora</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Oficial</TableHead>
                      <TableHead>Prioridad</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-mono">{report.time}</TableCell>
                        <TableCell className="font-medium">{report.type}</TableCell>
                        <TableCell className="max-w-xs truncate">{report.location}</TableCell>
                        <TableCell>{report.officer}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(report.priority)}>
                            {report.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getReportStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incidents">
            <Card>
              <CardHeader>
                <CardTitle>Registro de Incidentes</CardTitle>
                <CardDescription>
                  Seguimiento de todos los incidentes reportados y su resolución
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hora</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Oficial</TableHead>
                      <TableHead>Severidad</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-mono">{incident.time}</TableCell>
                        <TableCell className="font-medium">{incident.type}</TableCell>
                        <TableCell className="max-w-xs truncate">{incident.location}</TableCell>
                        <TableCell>{incident.officer}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(incident.severity)}>
                            {incident.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getIncidentStatusColor(incident.status)}>
                            {incident.status}
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

export default SupervisorDashboard