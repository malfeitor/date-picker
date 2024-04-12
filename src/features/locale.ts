const WEEK_DAYS = new Map()
WEEK_DAYS.set('en', [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
])
WEEK_DAYS.set('fr', [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
])

export function getWeekStartingDayNumber(weekStartingDay: string) {
  let index = -1
  ;[...WEEK_DAYS].filter((locale) => {
    locale.filter((week) => {
      if (week.indexOf(weekStartingDay) != -1) {
        index = week.indexOf(weekStartingDay)
      }
    })
  })
  return index != -1 ? index : 1
}
