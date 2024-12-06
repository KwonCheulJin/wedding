import { cb } from '@/lib/cx'
import { PropsWithChildren } from 'react'
import styles from './Section.module.scss'

const cx = cb(styles)

interface SectionProps {
  className?: string
}

export default function Section({
  children,
  className,
}: PropsWithChildren<SectionProps>) {
  return <section className={cx(['container', className])}>{children}</section>
}
