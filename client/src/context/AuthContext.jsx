import React, { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('internsphere_user') || 'null')
  )

  const [token, setToken] = useState(() =>
    localStorage.getItem('internsphere_token')
  )

  const persist = (data) => {
    setUser(data.user)
    setToken(data.token)

    localStorage.setItem(
      'internsphere_user',
      JSON.stringify(data.user)
    )

    localStorage.setItem(
      'internsphere_token',
      data.token
    )
  }

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload)
    persist(data)
    return data
  }

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload)
    persist(data)
    return data
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem('internsphere_user')
    localStorage.removeItem('internsphere_token')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)