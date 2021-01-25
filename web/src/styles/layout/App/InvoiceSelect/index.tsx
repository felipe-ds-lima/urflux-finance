import React, { useCallback, useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

import { useInvoice } from 'src/hooks/invoice'
import { IInvoice } from 'src/models/IInvoice'
import api from 'src/services/api'

import { Container, InvoiceList } from './styles'

const InvoiceSelect: React.FC = () => {
  const { invoice: currentInvoice, setInvoice } = useInvoice()

  const [active, setActive] = useState(false)
  const [invoices, setInvoices] = useState<IInvoice[]>([])

  const toggleActive = useCallback(() => {
    setActive(!active)
  }, [active])

  const handleChooseInvoice = useCallback(
    (id: string) => {
      const invoice = invoices.find(invoice => invoice.id === id)
      if (invoice) {
        setInvoice(invoice)
      }

      setActive(false)
    },
    [invoices, setInvoice]
  )

  useEffect(() => {
    if (!currentInvoice && invoices[0]) {
      setInvoice(invoices[0])
    }
  }, [currentInvoice, invoices, setInvoice])

  useEffect(() => {
    async function getInvoices() {
      const response = await api.get<IInvoice[]>('invoices')

      setInvoices(response.data)
    }

    getInvoices()
  }, [])

  return (
    <Container>
      <p>{currentInvoice?.name}</p>
      <button type="button" onClick={toggleActive}>
        <FiChevronDown size={24} />
      </button>

      {active && (
        <InvoiceList>
          {invoices.map(invoice => (
            <li key={invoice.id}>
              <button onClick={() => handleChooseInvoice(invoice.id)}>
                {invoice.name}
              </button>
            </li>
          ))}
        </InvoiceList>
      )}
    </Container>
  )
}

export default InvoiceSelect
