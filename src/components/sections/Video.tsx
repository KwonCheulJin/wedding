import Section from '@/components/shared/Section'
import { cb } from '@/lib/cx'
import styles from './Video.module.scss'

const cx = cb(styles)

export default function Video() {
  return (
    <Section className={cx('container')}>
      <video
        autoPlay={true}
        muted={true}
        loop={true}
        poster="/aseets/poster.jpg"
      >
        <source src="/assets/main.mp4" />
      </video>
    </Section>
  )
}
