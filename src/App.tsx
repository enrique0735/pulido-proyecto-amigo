import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import AdminDashboard from '@/pages/AdminDashboard'
import OperatorDashboard from '@/pages/OperatorDashboard'
import DispatcherDashboard from '@/pages/DispatcherDashboard'
import SupervisorDashboard from '@/pages/SupervisorDashboard'
import ProtectedRoute from '@/components/ProtectedRoute'
import { AuthProvider } from '@/contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['administrador']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/operador" 
              element={
                <ProtectedRoute allowedRoles={['operador_medios']}>
                  <OperatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/despachador" 
              element={
                <ProtectedRoute allowedRoles={['despachador']}>
                  <DispatcherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/supervisor" 
              element={
                <ProtectedRoute allowedRoles={['supervisor_motorizado']}>
                  <SupervisorDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App