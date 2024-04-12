import React, { forwardRef, useEffect, useState } from 'react'
import './index.scss'
import { Day } from './features/day'
import { isInputRef } from './utils/types'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  format?: string
}

export const DatePicker = forwardRef<HTMLInputElement, InputProps>(
  function DatePicker({ format = 'YYYY-MM-DD' }, inputRef) {
    const weekStartingDay = 1 // 1 for monday, 0 for sunday

    const [pickerVisible, setPickerVisibility] = useState(true)
    const [pickedDate, pickDate] = useState(new Date())

    useEffect(() => {
      if (isInputRef(inputRef)) {
        inputRef.current.value = getPickedDate()
      }
    }, [pickedDate])

    function getFirstDayOfCalendar() {
      // getMonth start at 0, when creating a date it begin at 1
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

    function setPreviousMonth() {
      pickDate(new Date(pickedDate.setMonth(pickedDate.getMonth() - 1)))
    }

    function setNextMonth() {
      pickDate(new Date(pickedDate.setMonth(pickedDate.getMonth() + 1)))
    }

    return (
      <div>
        <input
          ref={inputRef}
          type="text"
          onFocus={() => setPickerVisibility(true)}
        />
        <div className={pickerVisible ? 'date-picker' : 'date-picker__hidden'}>
          <div className="date-picker__month-year">
            <span
              className="date-picker__month-year--arrow"
              onClick={() => setPreviousMonth()}
            >
              ⇦
            </span>
            {pickedDate.getMonth() + 1} {pickedDate.getFullYear()}
            <span
              className="date-picker__month-year--arrow"
              onClick={() => setNextMonth()}
            >
              ⇨
            </span>
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
  }
)
