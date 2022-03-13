export const getTime = (): { hours: string; minutes: string} => {
  const date = new Date()
  const rawMinutes = date.getMinutes()
  const rawHours = date.getHours()
  const hours = (rawHours < 10 ? '0' : '') + rawHours.toLocaleString()
  const minutes = (rawMinutes < 10 ? '0' : '') + rawMinutes.toLocaleString()
  return { hours, minutes }
};

export const log = (message: string) => {
  const { hours, minutes } = getTime()
  const timestamp = `${hours}:${minutes}`
  console.log(`[${timestamp}] ${message}`)
}