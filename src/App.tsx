import Heading from '@/components/sections/Heading'
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
  const { date } = wedding
  return (
    <div className={cx('container')}>
      <Heading date={date} />
      <Video />
    </div>
  )
}

export default App
