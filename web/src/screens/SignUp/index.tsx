import React, { useCallback, useRef, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import api from 'src/services/api'
import * as Yup from 'yup'

import Button from '@components/Button'
import Input from '@components/Input'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { Container } from './styles'

interface IFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      setLoading(true)

      try {
        const schema = Yup.object().shape({
          name: Yup.string()
            .min(3, 'Mínimo de 3 caracteres.')
            .required('O nome é obrigatório.'),
          email: Yup.string()
            .email('Precisa ser um e-mail válido.')
            .required('O e-mail é obrigatório.'),
          password: Yup.string()
            .min(8, 'A senha precisa ter pelo menos 8 caracteres.')
            .required('A senha é obrigatória.'),
        })

        schema.validateSync(data, { abortEarly: false })

        await api.post('users', data)

        setLoading(false)

        router.push('/entrar')
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
    [router]
  )

  return (
    <Container>
      <h1>Criar conta</h1>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome" icon="FiUser" />
        <Input name="email" type="email" placeholder="E-mail" icon="FiMail" />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          icon="FiLock"
          containerStyle={{ marginBottom: 16 }}
        />
        <Button type="submit" disabled={loading} loading={loading}>
          Criar conta
        </Button>
      </Form>

      <Link href="/criar-conta">
        <a>Já tenho uma conta</a>
      </Link>
    </Container>
  )
}

export default SignUp
