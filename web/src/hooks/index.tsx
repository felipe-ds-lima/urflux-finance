import React from 'react'

import { AuthProvider } from './auth'
import { InvoiceProvider } from './invoice'

const Hooks: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <InvoiceProvider>{children}</InvoiceProvider>
    </AuthProvider>
  )
}

export default Hooks
