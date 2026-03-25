import { useState, useEffect } from 'react'

/**
 * Requests browser geolocation once on mount.
 * Returns { coords, error, loading }
 */
export function useGeolocation() {
  const [state, setState] = useState({ coords: null, error: null, loading: true })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({ coords: null, error: 'Geolocation not supported', loading: false })
      return
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setState({
          coords: { lat: coords.latitude, lon: coords.longitude },
          error: null,
          loading: false,
        })
      },
      (err) => {
        // Fallback to New Delhi if user denies
        setState({
          coords: { lat: 28.6139, lon: 77.209 },
          error: err.message,
          loading: false,
        })
      },
      { timeout: 8000, maximumAge: 300000 }
    )
  }, [])

  return state
}
