import React, { createContext, useCallback, useContext, useState } from 'react'

import { IInvoice } from 'src/models/IInvoice'

interface IInvoiceState {
  invoice: IInvoice
}

interface IInvoiceContext {
  invoice: IInvoice
  setInvoice(data: IInvoice): void
}

const InvoiceContext = createContext<IInvoiceContext>({} as IInvoiceContext)

export const InvoiceProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    if (typeof window !== 'undefined') {
      const invoice = localStorage.getItem('@urFluxFinance:invoice')

      if (invoice) {
        return { invoice: JSON.parse(invoice) }
      }
    }

    return {} as IInvoiceState
  })

  const setInvoice = useCallback((invoice: IInvoice) => {
    setData({ invoice })
    localStorage.setItem('@urFluxFinance:invoice', JSON.stringify(invoice))
  }, [])

  return (
    <InvoiceContext.Provider value={{ invoice: data.invoice, setInvoice }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export const useInvoice = (): IInvoiceContext => {
  const context = useContext(InvoiceContext)

  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider')
  }

  return context
}
