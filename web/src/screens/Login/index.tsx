import React, { useCallback, useRef, useState } from 'react'

import Link from 'next/link'

import { useAuth } from 'src/hooks/auth'
import * as Yup from 'yup'

import Button from '@components/Button'
import Input from '@components/Input'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { Container } from './styles'

interface IFormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      setLoading(true)

      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Precisa ser um e-mail válido.')
            .required('O e-mail é obrigatório.'),
          password: Yup.string()
            .min(8, 'A senha precisa ter pelo menos 8 caracteres.')
            .required('A senha é obrigatória.'),
        })

        schema.validateSync(data, { abortEarly: false })

        await login(data)

        setLoading(false)
      } catch (err) {
        const validationErrors = {}
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message
          })
          formRef.current.setErrors(validationErrors)
        }

        setLoading(false)
      }
    },
    [login]
  )

  return (
    <Container>
      <h1>Login</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="E-mail" icon="FiMail" />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          icon="FiLock"
          containerStyle={{ marginBottom: 16 }}
        />
        <Button type="submit" disabled={loading} loading={loading}>
          Entrar
        </Button>
      </Form>

      <Link href="/criar-conta">
        <a>Criar conta</a>
      </Link>
    </Container>
  )
}

export default Login
