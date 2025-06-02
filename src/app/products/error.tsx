'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='m-auto'>
      <h2>Algo deu errado ao exibir os produtos!</h2>
    <h3>Atualize a página ou tente mais tarde.</h3>
    </div>
  )
}