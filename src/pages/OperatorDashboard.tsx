import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Radio, Headphones, Wifi, WifiOff, Activity, AlertTriangle } from 'lucide-react'

const OperatorDashboard = () => {
  const { user, logout } = useAuth()

  // Mock data
  const [radios] = useState([
    { id: '001', unit: 'Patrulla 1', frequency: '156.75 MHz', status: 'Conectado', signal: 85, battery: 78 },
    { id: '002', unit: 'Patrulla 2', frequency: '156.80 MHz', status: 'Conectado', signal: 92, battery: 65 },
    { id: '003', unit: 'Patrulla 3', frequency: '156.85 MHz', status: 'Desconectado', signal: 0, battery: 12 },
    { id: '004', unit: 'Supervisor A', frequency: '157.00 MHz', status: 'Conectado', signal: 76, battery: 89 },
  ])

  const [communications] = useState([
    { time: '14:32', from: 'Patrulla 1', to: 'Central', message: 'Llegada a punto de control Alpha', priority: 'Normal' },
    { time: '14:28', from: 'Central', to: 'Patrulla 2', message: 'Proceder a zona comercial', priority: 'Alta' },
    { time: '14:25', from: 'Supervisor A', to: 'Central', message: 'Reporte de situación - Todo normal', priority: 'Normal' },
    { time: '14:20', from: 'Patrulla 3', to: 'Central', message: 'Requiero apoyo técnico', priority: 'Urgente' },
  ])

  const getStatusColor = (status: string) => {
    return status === 'Conectado' ? 'default' : 'destructive'
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'Urgente': return 'destructive'
      case 'Alta': return 'secondary'
      default: return 'outline'
    }
  }

  const getSignalIcon = (signal: number) => {
    return signal > 70 ? <Wifi className="h-4 w-4 text-green-500" /> : 
           signal > 0 ? <Wifi className="h-4 w-4 text-yellow-500" /> : 
           <WifiOff className="h-4 w-4 text-red-500" />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Radio className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Centro de Comunicaciones</h1>
              <p className="text-sm text-muted-foreground">Operador de Medios - {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">Sistema Operativo</span>
            </div>
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
                <Radio className="h-4 w-4" />
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
                <Wifi className="h-4 w-4 text-green-500" />
                Conectadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">3</div>
              <p className="text-xs text-muted-foreground">75% del total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <WifiOff className="h-4 w-4 text-red-500" />
                Desconectadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">1</div>
              <p className="text-xs text-muted-foreground">Requiere atención</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">2</div>
              <p className="text-xs text-muted-foreground">Batería baja</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="equipment" className="space-y-6">
          <TabsList>
            <TabsTrigger value="equipment">Equipos</TabsTrigger>
            <TabsTrigger value="communications">Comunicaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="equipment">
            <Card>
              <CardHeader>
                <CardTitle>Estado de Equipos</CardTitle>
                <CardDescription>
                  Monitoreo en tiempo real de radios y equipos de comunicación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Frecuencia</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Señal</TableHead>
                      <TableHead>Batería</TableHead>
                      <TableHead>Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {radios.map((radio) => (
                      <TableRow key={radio.id}>
                        <TableCell className="font-mono">{radio.id}</TableCell>
                        <TableCell className="font-medium">{radio.unit}</TableCell>
                        <TableCell>{radio.frequency}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(radio.status)}>
                            {radio.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getSignalIcon(radio.signal)}
                            <span className="text-sm">{radio.signal}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`text-sm ${radio.battery < 20 ? 'text-red-500' : radio.battery < 50 ? 'text-yellow-500' : 'text-green-500'}`}>
                            {radio.battery}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Headphones className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications">
            <Card>
              <CardHeader>
                <CardTitle>Log de Comunicaciones</CardTitle>
                <CardDescription>
                  Registro de mensajes y comunicaciones del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hora</TableHead>
                      <TableHead>De</TableHead>
                      <TableHead>Para</TableHead>
                      <TableHead>Mensaje</TableHead>
                      <TableHead>Prioridad</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {communications.map((comm, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-mono">{comm.time}</TableCell>
                        <TableCell className="font-medium">{comm.from}</TableCell>
                        <TableCell>{comm.to}</TableCell>
                        <TableCell className="max-w-md truncate">{comm.message}</TableCell>
                        <TableCell>
                          <Badge variant={getPriorityColor(comm.priority)}>
                            {comm.priority}
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

export default OperatorDashboard