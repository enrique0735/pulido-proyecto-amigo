import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'administrador' | 'operador_medios' | 'despachador' | 'supervisor_motorizado'

interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simular autenticación (reemplazar con llamada real)
    const mockUsers = [
      { id: '1', email: 'admin@despacho.com', password: 'admin123', name: 'Administrador', role: 'administrador' as UserRole },
      { id: '2', email: 'operador@despacho.com', password: 'op123', name: 'Operador Medios', role: 'operador_medios' as UserRole },
      { id: '3', email: 'despachador@despacho.com', password: 'desp123', name: 'Despachador', role: 'despachador' as UserRole },
      { id: '4', email: 'supervisor@despacho.com', password: 'sup123', name: 'Supervisor', role: 'supervisor_motorizado' as UserRole },
    ]

    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}