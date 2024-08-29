import { computed, onBeforeUnmount, ref } from "vue"
import { getTimeInFormat, parseMsec } from "@/utils/timer"

export const useTimer = (intervalSec = 1) => {
  const isRunning = ref(false)
  const time = ref(0)
  let interval: ReturnType<typeof setInterval> | undefined

  const start = () =>
    (interval = setInterval(
      () => (time.value += intervalSec),
      parseMsec(intervalSec)
    ))

  const stop = () => clearInterval(interval)

  const reset = () => {
    stop()
    time.value = 0
  }

  const toggle = () => {
    isRunning.value = !isRunning.value

    isRunning.value ? start() : reset()
  }

  const formatTime = computed(() =>
    time.value ? getTimeInFormat(time.value) : "Tap to Connect"
  )

  onBeforeUnmount(stop)

  return { start, reset, toggle, time, formatTime }
}
