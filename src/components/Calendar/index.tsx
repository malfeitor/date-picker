import React from 'react'
import { Store } from '../../store'
import { observer } from 'mobx-react-lite'

class Day {
  number = 0
  day = ''
}

export const Calendar = observer(({ store }: { store: Store }) => {
  function createCalendarDays(firstDayOfCalendar: Date) {
    const calendarLines = 6
    const weekDays = 7
    const currentMonth = []
    const currentDay = new Date(firstDayOfCalendar)
    for (let i = 0; i < calendarLines; i++) {
      const week_days: Day[] = []
      for (let j = 0; j < weekDays; j++) {
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

  const currentMonth = createCalendarDays(store.getFirstDayOfCalendar)

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
})
