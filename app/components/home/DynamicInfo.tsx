'use client'

import { useEffect, useState } from 'react'

export function DynamicInfo() {
  const [time, setTime] = useState('')
  const [dayPeriod, setDayPeriod] = useState('')
  const [daysUntilDeadline, setDaysUntilDeadline] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  const deadlineDate = new Date('2025-08-30')

  useEffect(() => {
    const calculateDeadline = () => {
      const now = new Date()
      const diffTime = deadlineDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysUntilDeadline(diffDays)
    }

    const updateTime = () => {
      const now = new Date()
      const ankaraTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }))
      const hours = ankaraTime.getHours()
      
      setTime(ankaraTime.toLocaleTimeString('en-GB'))
      setDayPeriod(hours >= 7 && hours < 19 ? 'day' : 'night')
      setLoading(false)
    }

    calculateDeadline()
    updateTime()

    const timer = setInterval(updateTime, 1000)
    const deadlineTimer = setInterval(calculateDeadline, 1000 * 60 * 60) // Recalculate every hour

    return () => {
      clearInterval(timer)
      clearInterval(deadlineTimer)
    }
  }, [])

  const getCountdownText = () => {
    if (daysUntilDeadline <= 0) return "The leap has begun"
    if (daysUntilDeadline === 1) return "1 day until the leap"
    return `${daysUntilDeadline} days until the leap`
  }

  const InfoItem = ({ icon, text }) => (
    <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-700 dark:text-neutral-300">
      <span>{icon}</span>
      <p>{text}</p>
    </div>
  )

  return (
    <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 rounded-lg bg-neutral-100 dark:bg-neutral-900 p-4 border border-neutral-200 dark:border-neutral-800">
        <InfoItem icon="📍" text="Ankara, Turkey" />
        <InfoItem icon="⏳" text={getCountdownText()} />
        {time && <InfoItem icon="⏰" text={`${time} local time`} />}
      </div>
    </div>
  )
} 