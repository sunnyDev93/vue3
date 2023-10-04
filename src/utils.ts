export const checkIfImageExists = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' })

    return !!(response.ok)
  }
  catch (error) {
    console.error('Error checking image existence:', error)

    return false
  }
}
