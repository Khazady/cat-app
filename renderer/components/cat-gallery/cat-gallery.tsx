import { CatApiResponse, fetchCatImages } from '../../services/cat-api'
import React, { useState, useEffect } from 'react'

type Props = {isCalled: boolean, handleChange: () => void}

const CatGallery: React.FC<Props> = ({isCalled, handleChange}) => {
  const [catImages, setCatImages] = useState<CatApiResponse>([])
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)

  useEffect(() => {
    const loadCatImages = async () => {
      const images = await fetchCatImages()
      setCatImages(images)
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
        <img
          src={catImages[currentImageIndex].url}
          alt={`Cat № ${currentImageIndex} - ${catImages[currentImageIndex].id}`}
        />
      )}
    </section>
  )
}

export default CatGallery
