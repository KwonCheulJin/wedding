import Calendar from '@/components/sections/Calendar'
import Contact from '@/components/sections/Contact'
import Heading from '@/components/sections/Heading'
import ImageGallery from '@/components/sections/ImageGallery'
import Intro from '@/components/sections/Intro'
import Invitation from '@/components/sections/Invitation'
import Map from '@/components/sections/Map'
import Video from '@/components/sections/Video'
import FullScreenMessage from '@/components/shared/FullScreenMessage'
import { cb } from '@/lib/cx'
import { Wedding } from '@/models/wedding'
import { useEffect, useState } from 'react'

import styles from './App.module.scss'

const cx = cb(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8888/wedding')
      .then((res) => {
        if (res.ok === false) {
          throw new Error('청첩장 정보를 가져오지 못했습니다.')
        }
        return res.json()
      })
      .then((data) => {
        setWedding(data)
        setLoading(false)
      })
      .catch((e) => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <FullScreenMessage type="loading" />
  }

  if (error) {
    return <FullScreenMessage type="error" />
  }

  if (wedding === null) {
    return null
  }
  const {
    date,
    galleryImages,
    groom,
    bride,
    location,
    message: { intro, invitation },
  } = wedding
  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
      <Intro
        groomName={groom.name}
        brideName={bride.name}
        locationName={location.name}
        date={date}
        message={intro}
      />
      <Invitation message={invitation} />
      <ImageGallery images={galleryImages} />
      <Calendar date={date} />
      <Map location={location} />
      <Contact groom={groom} bride={bride} />
    </div>
  )
}

export default App
