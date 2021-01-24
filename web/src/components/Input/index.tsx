import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import * as FeatherIcon from 'react-icons/fi'

import { useField } from '@unform/core'

import { Container, Info } from './styles'

interface IOwnProps {
  icon: string
  containerStyle?: CSSProperties
  message?: string
  positionX?: 'left' | 'right'
  positionY?: 'top' | 'bottom'
}

type IInputProps = IOwnProps & JSX.IntrinsicElements['input']

const Input: React.FC<IInputProps> = ({
  name,
  icon,
  containerStyle,
  message,
  positionX = 'left',
  positionY = 'top',
  ...rest
}) => {
  const inputRef = useRef(null)
  const [status, setStatus] = useState<'normal' | 'focus' | 'error'>('normal')
  const {
    fieldName,
    defaultValue,
    registerField,
    error,
    clearError,
  } = useField(name)
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField])

  const Icon = useMemo(() => {
    return FeatherIcon[icon]
  }, [icon])

  const handleFocus = useCallback(() => {
    setStatus('focus')
    clearError()
  }, [clearError])

  const handleBlur = useCallback(() => {
    setStatus('normal')
  }, [])

  const info = useMemo(() => {
    return error ? 'error' : 'info'
  }, [error])

  return (
    <Container style={containerStyle} status={error ? 'error' : status}>
      <div>
        <Icon size={20} />
      </div>
      <input
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        defaultValue={defaultValue}
        {...rest}
      />
      {(message || error) && (
        <div className={info}>
          <FeatherIcon.FiInfo size={20} />
          <Info positionX={positionX} positionY={positionY} type={info}>
            {error || message}
          </Info>
        </div>
      )}
    </Container>
  )
}

export default Input
