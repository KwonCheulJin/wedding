import { cb } from '@/lib/cx'
import { PropsWithChildren } from 'react'
import styles from './Dimmed.module.scss'

const cx = cb(styles)
export default function Dimmed({ children }: PropsWithChildren) {
  return <div className={cx('dimmed')}>{children}</div>
}
