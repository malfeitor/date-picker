import React, { LegacyRef, SyntheticEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { Store } from '../../store'
import { isInputRef } from '../../utils/types'
import { Day } from '../../features/day'

interface CalendarCell extends HTMLTableCellElement {
  focus: () => void
}

export const Calendar = observer(
  ({
    store,
    inputRef,
  }: {
    store: Store
    inputRef: LegacyRef<HTMLInputElement>
  }) => {
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
    const firstDayOfCalendar = store.getFirstDayOfCalendar
    const currentMonth = createCalendarDays(firstDayOfCalendar)
    const animationDirection = store.animationDirection
    const weekStartingDay = store.weekStartingDay

    const animationVariants = {
      enter: (direction: number) => ({ x: 300 * direction }),
      center: () => ({ x: 0 }),
      exit: (direction: number) => ({ x: -300 * direction }),
    }

    const handleClick = (e: SyntheticEvent, day: Day) => {
      e.preventDefault()
      e.stopPropagation()
      store.setNewDate(new Date(day.day))
      store.setPickerVisibility(false)
      if (isInputRef(inputRef)) {
        inputRef.current.value = store.formatedDate
      }
    }

    const onKeyDown = (
      e: React.KeyboardEvent<HTMLTableCellElement>,
      day: Day
    ) => {
      const target = e.target as HTMLTableCellElement
      const date = new Date(day.day)
      switch (e.code) {
        case 'Enter':
        case 'Space':
          handleClick(e, day)
          break
        case 'ArrowRight':
          try {
            ;(target?.nextSibling as CalendarCell).focus()
          } catch {}
          break
        case 'ArrowLeft':
          try {
            ;(target?.previousSibling as CalendarCell).focus()
          } catch {}
          break
        case 'ArrowUp':
          try {
            ;(
              target?.parentElement?.previousSibling?.childNodes[
                date.getDay() - weekStartingDay
              ] as CalendarCell
            ).focus()
          } catch {}
          break
        case 'ArrowDown':
          try {
            ;(
              target?.parentElement?.nextSibling?.childNodes[
                date.getDay() - weekStartingDay
              ] as CalendarCell
            ).focus()
          } catch {}
          break
        case 'Escape':
          store.setPickerVisibility(false)
          break
      }
    }

    return (
      <AnimatePresence initial={false} custom={animationDirection}>
        <motion.tbody
          key={`calendar-${firstDayOfCalendar.getTime()}`}
          variants={animationVariants}
          custom={animationDirection}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          {currentMonth.map((week, index) => (
            <tr
              key={`${store.getDate.getFullYear()}-${store.getDate.getMonth()}-week-${index}`}
              className="date-picker__calendar--week"
            >
              {week.map((day) => (
                <td
                  key={day.day}
                  className={
                    new Date(day.day).getMonth() === store.getDate.getMonth()
                      ? 'date-picker__calendar--day'
                      : 'date-picker__calendar--filler'
                  }
                  onClick={(e) => handleClick(e, day)}
                  onKeyDown={(e) => onKeyDown(e, day)}
                  tabIndex={0}
                >
                  {day.number}
                </td>
              ))}
            </tr>
          ))}
        </motion.tbody>
      </AnimatePresence>
    )
  }
)
