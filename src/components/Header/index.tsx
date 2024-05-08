import React, { useRef } from 'react'
import { Store } from '../../store'
import { Locale } from '../../features/locale'
import { observer } from 'mobx-react-lite'
import { reaction } from 'mobx'

interface Props {
  store: Store
  minimumYear: number
  L: Locale
}

export const Header = observer(({ store, minimumYear, L }: Props) => {
  const monthRef = useRef<HTMLSelectElement>(null)
  const yearRef = useRef<HTMLSelectElement>(null)
  reaction(
    () => store.getDate,
    (date): void => {
      if (monthRef.current !== null && yearRef.current !== null) {
        monthRef.current.value = date.getMonth().toString()
        yearRef.current.value = date.getFullYear().toString()
      }
    }
  )
  return (
    <div className="date-picker__month-year">
      <span
        className="date-picker__month-year--arrow"
        onClick={() => store.setPreviousMonth()}
      >
        ⇦
      </span>
      <select
        name="month-select"
        className="date-picker__month-year--dropdown"
        defaultValue={store.getDate.getMonth()}
        onChange={(e) => store.setMonth(Number(e.target.value))}
        ref={monthRef}
        disabled={!store.pickerVisible}
      >
        {L.getAllMonthsNames().map((name: string, index: number) => {
          return (
            <option value={index} key={`month-${index}`}>
              {name}
            </option>
          )
        })}
      </select>
      <select
        name="year-select"
        className="date-picker__month-year--dropdown"
        defaultValue={store.getDate.getFullYear()}
        onChange={(e) => store.setYear(Number(e.target.value))}
        ref={yearRef}
        disabled={!store.pickerVisible}
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
        onClick={() => store.setNextMonth()}
      >
        ⇨
      </span>
    </div>
  )
})
