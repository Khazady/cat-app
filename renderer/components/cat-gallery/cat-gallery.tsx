import { CatApiResponse, fetchCatImages } from '../../services/cat-api'
import React, {useState, useEffect, useRef} from 'react'
import {Image} from "../ui/image/image";

type Props = {
  isCalled: boolean
  handleChange: () => void
}

const CatGallery: React.FC<Props> = ({isCalled, handleChange}) => {
  const [catImages, setCatImages] = useState<CatApiResponse>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const ref = useRef(null)

  useEffect(() => {
    const loadCatImages = async () => {
      if (ref.current) {
        ref.current.setLoaded(false);
      }
      const images = await fetchCatImages()
      setCatImages(images)
      if (ref.current) {
        ref.current.setLoaded(true);
      }
    }

    loadCatImages()
  }, [])

  const loadNextCatImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % catImages.length)
    handleChange()
  }

  useEffect(() => {
    if(isCalled) {
      loadNextCatImage()
    }
  }, [isCalled]);

  return (
    <section>
      {catImages.length > 0 && (
        <Image
          ref={ref}
          src={catImages[currentImageIndex].url}
          alt={`Cat № ${currentImageIndex} - ${catImages[currentImageIndex].id}`}
        />
      )}
    </section>
  )
}

export default CatGallery
