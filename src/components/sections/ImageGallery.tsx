import ImageViewer from '@/components/image-viewer'
import Section from '@/components/shared/Section'
import { cb } from '@/lib/cx'
import { useState } from 'react'
import styles from './ImageGallery.module.scss'

const cx = cb(styles)

interface ImageGalleryProps {
  images: string[]
}
export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIdx, setSelectedIds] = useState(-1)

  const open = selectedIdx > -1

  const handleSelectedImage = (idx: number) => {
    setSelectedIds(idx)
  }

  const handleClose = () => {
    setSelectedIds(-1)
  }
  return (
    <>
      <Section title="사진첩">
        <ul className={cx('wrap-images')}>
          {images.map((image, index) => (
            <li
              key={index}
              className={cx('wrap-image')}
              onClick={() => handleSelectedImage(index)}
            >
              <img
                src={image}
                alt={`wedding_${(index + 1).toString().padStart(2, '0')}`}
              />
            </li>
          ))}
        </ul>
      </Section>
      <ImageViewer
        images={images}
        open={open}
        selectedIdx={selectedIdx}
        onClose={handleClose}
      />
    </>
  )
}
