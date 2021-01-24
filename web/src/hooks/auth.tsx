import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import api from 'src/services/api'

interface IUser {
  id: string
  email: string
  name: string
}

interface ILoginData {
  email: string
  password: string
}

interface IAuthState {
  user: IUser
  loading: boolean
}

interface IAuthContext {
  user: IUser
  loading: boolean
  login(data: ILoginData): Promise<void>
  logout(): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({ loading: true } as IAuthState)

  const login = useCallback(async (data: ILoginData) => {
    const response = await api.post('auth/login', data)

    setData({ user: response.data.user, loading: false })
    localStorage.setItem('@urFluxFinance:token', response.data.token)
    api.defaults.headers.authorization = `Bearer ${response.data.token}`
  }, [])

  const logout = useCallback(() => {
    setData({ loading: false } as IAuthState)
    localStorage.removeItem('@urFluxFinance:token')
  }, [])

  useEffect(() => {
    async function validateUser() {
      const token = localStorage.getItem('@urFluxFinance:token')
      console.log('token', token)
      if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`

        try {
          const response = await api.get('profile')

          setData({ loading: false, user: response.data })
          console.log(response.data)

          return
        } catch {}
      }

      setData({ loading: false } as IAuthState)
      localStorage.removeItem('@urFluxFinance:token')
    }

    validateUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: data.user, loading: data.loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
