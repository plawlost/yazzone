'use client'

import { useEffect, useState } from 'react'
import { WikipediaLink } from 'app/components/WikipediaLink'

export function DynamicInfo() {
  const [time, setTime] = useState('')
  const [dayPeriod, setDayPeriod] = useState('')
  const [distance, setDistance] = useState<number | null>(null)
  const [daysUntilDeadline, setDaysUntilDeadline] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  const myLocation = { lat: 39.8829, lon: 32.7960 }
  const deadlineDate = new Date('2025-08-30') // August 30th deadline

  useEffect(() => {
    // Function to calculate distance
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371 // Radius of the Earth in km
      const dLat = (lat2 - lat1) * (Math.PI / 180)
      const dLon = (lon2 - lon1) * (Math.PI / 180)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      return R * c
    }

    // Calculate days until deadline
    const now = new Date()
    const diffTime = deadlineDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDaysUntilDeadline(diffDays)

    // Get visitor's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const dist = calculateDistance(myLocation.lat, myLocation.lon, latitude, longitude)
          setDistance(Math.round(dist))
        },
        () => {
          // Handle error or permission denial
          setDistance(null)
        }
      )
    }

    // Update time every second
    const timer = setInterval(() => {
      const now = new Date()
      const ankaraTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }))
      
      const hours = ankaraTime.getHours()
      const formattedTime = ankaraTime.toLocaleTimeString('en-GB')
      setTime(formattedTime)

      if (hours >= 7 && hours < 19) {
        setDayPeriod('day')
      } else {
        setDayPeriod('night')
      }
      setLoading(false)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getCountdownText = () => {
    if (daysUntilDeadline <= 0) {
      return "The leap has begun"
    } else if (daysUntilDeadline === 1) {
      return "1 day until the leap"
    } else {
      return `${daysUntilDeadline} days until the leap`
    }
  }

  return (
    <section className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center text-base text-black/60 dark:text-white/60 sm:space-x-2">
        <span>Currently in <WikipediaLink keyword="Southeast Europe">Southeast Europe</WikipediaLink></span>
        <span className="hidden sm:inline text-black/30 dark:text-white/30">|</span>
        <span>{getCountdownText()}</span>
        {distance !== null && (
          <>
            <span className="hidden sm:inline text-black/30 dark:text-white/30">|</span>
            <span>About {distance.toLocaleString()} km away from you</span>
          </>
        )}
        {time && (
          <>
            <span className="hidden sm:inline text-black/30 dark:text-white/30">|</span>
            <span>{time} local time, busy this {dayPeriod}</span>
          </>
        )}
      </div>
    </section>
  )
} 
