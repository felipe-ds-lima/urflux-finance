import React, { useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container } from './styles'

interface IMenuItemProps {
  href: string
}

const MenuItem: React.FC<IMenuItemProps> = ({ href, children }) => {
  const router = useRouter()

  const isCurrentPage = useMemo(() => {
    return href === router.asPath.split('?')[0]
  }, [href, router.asPath])

  return (
    <Link href={href}>
      <Container active={isCurrentPage}>{children}</Container>
    </Link>
  )
}

export default MenuItem
