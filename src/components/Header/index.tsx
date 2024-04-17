import React from 'react'

interface Props {
  store: any
  minimumYear: number
  L: any
}

export default function Header({ store, minimumYear, L }: Props) {
  return (
    <div className="date-picker__month-year">
      <span
        className="date-picker__month-year--arrow"
        onClick={() => store.setPreviousMonth()}
      >
        ⇦
      </span>
      <select
        className="date-picker__month-year--dropdown"
        defaultValue={store.date.getMonth()}
        // onChange={(e) => setPickedMonth(e)}
        // ref={monthRef}
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
        className="date-picker__month-year--dropdown"
        defaultValue={store.date.getFullYear()}
        // onChange={(e) => setPickedYear(e)}
        // ref={yearRef}
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
        // onClick={() => setNextMonth()}
      >
        ⇨
      </span>
    </div>
  )
}
