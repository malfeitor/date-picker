import React, {
  SyntheticEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react'
import './index.scss'
import { Day } from './features/day'
import { isInputRef } from './utils/types'
import { Locale } from './features/locale'

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  format?: string
  weekStartingDay?: string
  language?: string
  minimumYear?: number
}

export const DatePicker = forwardRef<HTMLInputElement, InputProps>(
  function DatePicker(
    {
      format = 'YYYY-MM-DD',
      weekStartingDay = 'Lundi',
      language = 'fr',
      minimumYear = 1950,
    },
    inputRef
  ) {
    const L = new Locale({ language, weekStartingDay })

    const weekStartingDayIndex = L.getWeekStartingDayNumber()
    const [pickerVisible, setPickerVisibility] = useState(true)
    const [pickedDate, pickDate] = useState(new Date())
    const [pickedMonth, pickMonth] = useState(pickedDate.getMonth())
    const [pickedYear, pickYear] = useState(pickedDate.getFullYear())
    const monthRef = useRef<HTMLSelectElement>(null)
    const yearRef = useRef<HTMLSelectElement>(null)

    useEffect(() => {
      if (isInputRef(inputRef)) {
        inputRef.current.value = getFormatedDate()
      }
      monthRef.current!.selectedIndex = pickedDate.getMonth()
      yearRef.current!.selectedIndex = pickedDate.getFullYear() - minimumYear
    }, [pickedDate])

    useEffect(() => {
      pickDate(
        new Date(
          `${pickedDate.getFullYear()}-${
            pickedMonth + 1
          }-${pickedDate.getDate()}`
        )
      )
    }, [pickedMonth])

    useEffect(() => {
      pickDate(
        new Date(
          `${pickedYear}-${pickedDate.getMonth() + 1}-${pickedDate.getDate()}`
        )
      )
    }, [pickedYear])

    function getFirstDayOfCalendar() {
      // getMonth start at 0, when creating a date it begin at 1
      const firstDayOfCalendar = new Date(
        `${pickedDate.getFullYear()}-${pickedDate.getMonth() + 1}-01`
      )
      // week begin sunday, index 0
      if (firstDayOfCalendar.getDay() === 0 && weekStartingDayIndex !== 0) {
        firstDayOfCalendar.setDate(-(6 - weekStartingDayIndex))
      } else {
        firstDayOfCalendar.setDate(
          1 + weekStartingDayIndex - firstDayOfCalendar.getDay()
        )
      }
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
                      className={
                        new Date(day.day).getMonth() === pickedDate.getMonth()
                          ? 'date-picker__calendar'
                          : 'date-picker__calendar--filler'
                      }
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

    function getFormatedDate() {
      const yearPosition = format.includes('YYYY')
      const monthPosition = format.includes('MM')
      const dayPosition = format.includes('DD')
      if (yearPosition && monthPosition && dayPosition) {
        return format
          .replace('YYYY', `${pickedDate.getFullYear()}`)
          .replace('MM', `${pickedDate.getMonth() + 1}`.padStart(2, '0'))
          .replace('DD', `${pickedDate.getDate()}`.padStart(2, '0'))
      } else {
        return `${pickedDate.getFullYear()}-${
          pickedDate.getMonth() + 1
        }-${pickedDate.getDate()}`
      }
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

    function setPickedMonth(e: SyntheticEvent) {
      pickMonth((e.target as HTMLSelectElement).selectedIndex)
    }

    function setPickedYear(e: SyntheticEvent) {
      pickYear(Number((e.target as HTMLSelectElement).selectedOptions[0].value))
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
            <select
              className="date-picker__month-year--dropdown"
              defaultValue={pickedDate.getMonth()}
              onChange={(e) => setPickedMonth(e)}
              ref={monthRef}
            >
              {L.getAllMonthsNames().map((name, index) => {
                return (
                  <option value={index} key={`month-${index}`}>
                    {name}
                  </option>
                )
              })}
            </select>
            <select
              className="date-picker__month-year--dropdown"
              defaultValue={pickedDate.getFullYear()}
              onChange={(e) => setPickedYear(e)}
              ref={yearRef}
            >
              {[...Array(100)].map((_, index) => {
                return (
                  <option
                    key={`year-${index + minimumYear}`}
                    value={index + minimumYear}
                  >
                    {index + minimumYear}
                  </option>
                )
              })}
            </select>
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
                {L.getShortWeekDays().map((day, index) => (
                  <th key={`day-name-${index}`}>{day}</th>
                ))}
              </tr>
            </thead>
            {showCurrentMonth()}
          </table>
        </div>
      </div>
    )
  }
)
