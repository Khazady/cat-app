const API_URL = 'https://api.thecatapi.com/v1/images/'

type CatImage = {
  id: number
  url: string
  width: number
  height: number
}

export type CatApiResponse = Array<CatImage>

export const fetchCatImages = async (limit = 10): Promise<CatApiResponse> => {
  try {
    const response = await fetch(`${API_URL}search?limit=${limit}`)
    return await response.json()
  } catch (error) {
    console.error('Error fetching cat images:', error)
    return []
  }
}
