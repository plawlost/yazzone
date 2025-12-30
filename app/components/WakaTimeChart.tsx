const WAKATIME_LANGS_URL = 'https://wakatime.com/share/@plawlost/cca3129e-4e74-4ebc-b604-4c359f9ed701.json'
const WAKATIME_HOURS_URL = 'https://wakatime.com/share/@plawlost/49ff702b-5d53-4766-9a12-0b3257993dcd.json'

interface LangData {
  name: string
  percent: number
  color: string
}

interface DayData {
  range: {
    date: string
    text: string
  }
  grand_total: {
    hours: number
    minutes: number
    total_seconds: number
    text: string
  }
}

async function fetchWakaTimeData(): Promise<{ langs: LangData[], days: DayData[] }> {
  try {
    const [langsRes, hoursRes] = await Promise.all([
      fetch(WAKATIME_LANGS_URL, { next: { revalidate: 900 } }),
      fetch(WAKATIME_HOURS_URL, { next: { revalidate: 900 } })
    ])
    const langsJson = await langsRes.json()
    const hoursJson = await hoursRes.json()
    return {
      langs: langsJson.data || [],
      days: hoursJson.data || []
    }
  } catch {
    return { langs: [], days: [] }
  }
}

export async function WakaTimeChart() {
  const { langs, days } = await fetchWakaTimeData()
  
  if (!langs.length) {
    return (
      <div className="text-sm text-zinc-400 dark:text-zinc-500 italic">
        No recent coding activity
      </div>
    )
  }

  // Filter out non-code items like images
  const filteredLangs = langs.filter(lang => 
    !lang.name.toLowerCase().includes('image') &&
    !lang.name.toLowerCase().includes('png') &&
    !lang.name.toLowerCase().includes('svg') &&
    !lang.name.toLowerCase().includes('jpg') &&
    !lang.name.toLowerCase().includes('jpeg') &&
    !lang.name.toLowerCase().includes('gif') &&
    !lang.name.toLowerCase().includes('binary')
  )
  const top6 = filteredLangs.slice(0, 6)
  const totalPercent = top6.reduce((sum, d) => sum + d.percent, 0)
  
  // Calculate total hours this week
  const totalSeconds = days.reduce((sum, d) => sum + (d.grand_total?.total_seconds || 0), 0)
  const totalHours = Math.floor(totalSeconds / 3600)
  const totalMins = Math.floor((totalSeconds % 3600) / 60)

  return (
    <div className="w-full sm:w-96 lg:w-[460px] space-y-3">
      {/* Total hours */}
      {days.length > 0 && (
        <div className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          {totalHours}h {totalMins}m <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">this week</span>
        </div>
      )}
      
      {/* Stacked bar */}
      <div className="h-3 rounded-full overflow-hidden flex bg-zinc-200 dark:bg-zinc-800">
        {top6.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${(lang.percent / totalPercent) * 100}%`,
              backgroundColor: lang.color || '#8b8b8b',
            }}
            title={`${lang.name}: ${lang.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {top6.map(lang => (
          <div key={lang.name} className="flex items-center gap-1.5 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: lang.color || '#8b8b8b' }}
            />
            <span className="text-zinc-600 dark:text-zinc-400">{lang.name}</span>
            <span className="text-zinc-400 dark:text-zinc-500">{lang.percent.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
