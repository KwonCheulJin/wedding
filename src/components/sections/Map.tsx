import Section from '@/components/shared/Section'
import { cb } from '@/lib/cx'
import { Location } from '@/models/wedding'
import { useEffect, useRef } from 'react'
import styles from './Map.module.scss'
const cx = cb(styles)

declare global {
  interface Window {
    kakao: any
  }
}
interface Props {
  location: Location
}
export default function Map({ location }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`
    script.async = true

    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(() => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        )

        const options = {
          center: position,
          level: 3,
        }

        const marker = new window.kakao.maps.Marker({
          position,
        })

        const map = new window.kakao.maps.Map(mapContainer.current, options)
        marker.setMap(map)
      })
    }
    return () => script.remove()
  }, [location])
  return (
    <Section
      title={
        <div className={cx('wrap-header')}>
          <span className={cx('txt-title')}>오시는길</span>
          <span className={cx('txt-subtitle')}>{location.name}</span>
          <span className={cx('txt-subtitle')}>{location.address}</span>
        </div>
      }
    >
      <div className={cx('wrap-map')}>
        <div className={cx('map')} ref={mapContainer}></div>
        <a
          href={location.link}
          className={cx('btn-find-way')}
          target="_blank"
          rel="noreferrer"
        >
          길찾기
        </a>
      </div>

      <div>
        <WayToCome label="버스" list={location.waytocome.bus} />
        <WayToCome label="지하철" list={location.waytocome.metro} />
      </div>
    </Section>
  )
}

interface WayToComeProps {
  label: React.ReactNode
  list: string[]
}

function WayToCome({ label, list }: WayToComeProps) {
  return (
    <div className={cx('wrap-waytocome')}>
      <div className={cx('txt-label')}>{label}</div>
      <ul>
        {list.map((waytocome, idx) => (
          <li key={idx}>{waytocome}</li>
        ))}
      </ul>
    </div>
  )
}
