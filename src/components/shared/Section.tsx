import { cb } from '@/lib/cx'
import { PropsWithChildren } from 'react'
import styles from './Section.module.scss'

const cx = cb(styles)

interface SectionProps {
  className?: string
  title?: React.ReactNode
}

export default function Section({
  children,
  className,
  title,
}: PropsWithChildren<SectionProps>) {
  return (
    <section className={cx(['container', className])}>
      {title !== undefined ? (
        <div className={cx('txt-title')}>{title}</div>
      ) : null}
      {children}
    </section>
  )
}
