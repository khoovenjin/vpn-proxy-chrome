type TTimeUnit = "hour" | "minute" | "second"

// sec to millisec
export const parseMsec = (seconds: number) => seconds * 1000

// sec to units
export const getTimeInUnit = (unit: TTimeUnit) => {
  const metric = 60

  const timeMap = {
    hour: (seconds) => Math.floor(seconds / Math.pow(metric, 2)),
    minute: (seconds) => Math.floor((seconds % Math.pow(metric, 2)) / metric),
    second: (seconds) => seconds % 60,
  } as const satisfies Record<TTimeUnit, (seconds: number) => number>

  return timeMap[unit]
}

// standardise char
export const format2ch = (text: string, place = 2, fill = "0") =>
  text.padStart(place, fill)

// timer format hours.minutes.seconds
export const getTimeInFormat = (seconds: number) => {
  const sequence: Array<TTimeUnit> = ["hour", "minute", "second"]

  const formatSeq = sequence.map((unit) =>
    format2ch(getTimeInUnit(unit)(seconds).toString())
  )

  return formatSeq.join(".")
}
