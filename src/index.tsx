import React, { Ref, forwardRef, useEffect, useState } from 'react'
import './index.scss'
import { Day } from './features/day'

type Props = {
  format?: string
}

export const DatePicker = forwardRef(function DatePicker(
  { format = 'YYYY-MM-DD' }: Props,
  ref: Ref<HTMLInputElement>
) {
  const weekStartingDay = 1 // 1 for monday, 0 for sunday

  const [pickerVisible, setPickerVisibility] = useState(true)
  const [pickedDate, pickDate] = useState(new Date())
  // getMonth start at 0, when creating a date it begin at 1

  useEffect(() => {
    ref!.current!.value = getPickedDate()
  }, [pickedDate])

  function getFirstDayOfCalendar() {
    const firstDayOfCalendar = new Date(
      `${pickedDate.getFullYear()}-${pickedDate.getMonth() + 1}-01`
    )
    // week begin sunday, index 0
    firstDayOfCalendar.setDate(
      1 + weekStartingDay - firstDayOfCalendar.getDay()
    )
    return firstDayOfCalendar
  }

  function createCalendarDays() {
    const currentMonth = []
    const currentDay = getFirstDayOfCalendar()
    for (let i = 0; i < 5; i++) {
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

  function showCurrentMonth() {
    const currentMonth = createCalendarDays()
    return (
      <tbody>
        {currentMonth.map((week, index) => {
          return (
            <tr
              key={`${pickedDate.getFullYear()}-${pickedDate.getMonth()}-week-${index}`}
            >
              {week.map((day) => {
                return (
                  <td
                    key={day.day}
                    onClick={() => {
                      setPickedDate(day.day)
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

  function getPickedDate() {
    /* formats : 
    YYYY-MM-DD
    DD/MM/YYYY 
    etc
    */
    const year_position = format.indexOf('YYYY')
    const month_position = format.indexOf('MM')
    const day_position = format.indexOf('DD')
    return `${pickedDate.getFullYear()}-${pickedDate.getMonth()}-${pickedDate.getDate()}`
  }

  function setPickedDate(clickedDate: string) {
    pickDate(new Date(clickedDate))
  }

  return (
    <div>
      <input ref={ref} type="text" onFocus={() => setPickerVisibility(true)} />
      <div className={pickerVisible ? 'date-picker' : 'date-picker__hidden'}>
        <div className="date-picker__month-year">
          ⇦ {pickedDate.getMonth() + 1} {pickedDate.getFullYear()} ⇨
        </div>
        <table>
          <thead>
            <tr>
              <th>Lun</th>
              <th>Mar</th>
              <th>Mer</th>
              <th>Jeu</th>
              <th>Ven</th>
              <th>Sam</th>
              <th>Dim</th>
            </tr>
          </thead>
          {showCurrentMonth()}
        </table>
      </div>
    </div>
  )
})
