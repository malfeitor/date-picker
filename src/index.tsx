import React, { Ref, forwardRef, useState } from 'react'
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
  const [pickedDay, pickDay] = useState(pickedDate.getDate())
  // getMonth start at 0, when creating a date it begin at 1
  const [pickedMonth, pickMonth] = useState(pickedDate.getMonth())
  const [pickedYear, pickYear] = useState(pickedDate.getFullYear())

  function getFirstDayOfCalendar() {
    const firstDayOfCalendar = new Date(`${pickedYear}-${pickedMonth + 1}-01`)
    // week begin sunday, index 0
    firstDayOfCalendar.setDate(
      1 + weekStartingDay - firstDayOfCalendar.getDay()
    )
    return firstDayOfCalendar
  }

  function createCalendarDays() {
    const currentMonth = []
    const firstDayOfCalendar = getFirstDayOfCalendar()
    for (let i = 0; i < 5; i++) {
      const week_days: Day[] = []
      for (let j = 0; j < 7; j++) {
        const day: Day = {
          day: firstDayOfCalendar.getDay().toString(),
          number: firstDayOfCalendar.getDate(),
        }
        week_days.push(day)
        firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() + 1)
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
            <tr key={`${pickedYear}-${pickedMonth}-week-${index}`}>
              {week.map((day) => {
                return (
                  <td key={`${pickedYear}-${pickedMonth + 1}-${day.number}`}>
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
    return `${pickedYear}-${pickedMonth}-${pickedDay}`
  }

  return (
    <div>
      <input
        ref={ref}
        type="text"
        onFocus={() => setPickerVisibility(true)}
        // onChange={() => showCurrentMonth()}
        // value={getPickedDate()}
      />
      <div className={pickerVisible ? 'date-picker' : 'date-picker__hidden'}>
        <div className="date-picker__month-year">
          ⇦ {pickedMonth + 1} {pickedYear} ⇨
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
