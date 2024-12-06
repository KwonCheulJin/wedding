import Section from '@/components/shared/Section'
import { cb } from '@/lib/cx'
import { format, getDay, parseISO } from 'date-fns'
import styles from './Heading.module.scss'

const cx = cb(styles)

interface HeadingProps {
  date: string
}
const DAYS = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

export default function Heading({ date }: HeadingProps) {
  const weddingDate = parseISO(date)

  return (
    <Section className={cx('container')}>
      <div className={cx('txt-date')}>{format(weddingDate, 'yy.MM.dd')}</div>
      <div className={cx('txt-day')}>{DAYS[getDay(weddingDate)]}</div>
    </Section>
  )
}
