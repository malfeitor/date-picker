import React from 'react'
import { Store } from '../../store'

class Day {
  number = 0
  day = ''
}

export default function Calendar({ store }: { store: Store }) {
  console.log(store.getDate)
  const currentMonth = createCalendarDays(store)
  return (
    <tbody>
      {currentMonth.map((week, index) => {
        return (
          <tr
            key={`${store.getDate.getFullYear()}-${store.getDate.getMonth()}-week-${index}`}
            className="date-picker__calendar--week"
          >
            {week.map((day) => {
              return (
                <td
                  key={day.day}
                  className={
                    new Date(day.day).getMonth() === store.getDate.getMonth()
                      ? 'date-picker__calendar--day'
                      : 'date-picker__calendar--filler'
                  }
                  onClick={() => {
                    // setPickedDate(day.day)
                  }}
                >
                  {day.number}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}

function getFirstDayOfCalendar(store: Store) {
  // getMonth start at 0, when creating a date it begin at 1
  const firstDayOfCalendar = new Date(
    `${store.getDate.getFullYear()}-${store.getDate.getMonth() + 1}-01`
  )
  // week begin sunday, index 0
  if (firstDayOfCalendar.getDay() === 0 && store.weekStartingDayIndex !== 0) {
    firstDayOfCalendar.setDate(-(6 - store.weekStartingDayIndex))
  } else {
    firstDayOfCalendar.setDate(
      1 + store.weekStartingDayIndex - firstDayOfCalendar.getDay()
    )
  }
  return firstDayOfCalendar
}

function createCalendarDays(store: Store) {
  const currentMonth = []
  const currentDay = getFirstDayOfCalendar(store)
  for (let i = 0; i < 6; i++) {
    const week_days: Day[] = []
    for (let j = 0; j < 7; j++) {
      const day: Day = {
        day: `${currentDay.getFullYear()}-${
          currentDay.getMonth() + 1
        }-${currentDay.getDate()}`,
        number: currentDay.getDate(),
      }
      week_days.push(day)
      currentDay.setDate(currentDay.getDate() + 1)
    }
    currentMonth.push(week_days)
  }
  return currentMonth
}
