import React, { LegacyRef } from 'react'
import { observer } from 'mobx-react-lite'

import { DatePickerViewProps } from '../types'
import { Header } from '../components/Header'
import { Calendar } from '../components/Calendar'

export const DatePickerView = observer(
  React.forwardRef(
    (
      { store, L, minimumYear, required }: DatePickerViewProps,
      ref: LegacyRef<HTMLInputElement>
    ) => {
      return (
        <div>
          <input
            type="text"
            className="date-picker__input"
            onFocus={() => store.setPickerVisibility(true)}
            placeholder={L.getInputPlaceholder()}
            readOnly={true}
            ref={ref}
            required={required}
          />
          <div
            className={
              store.pickerVisible ? 'date-picker' : 'date-picker__hidden'
            }
          >
            <Header store={store} minimumYear={minimumYear} L={L} />
            <table className="date-picker__calendar">
              <thead className="date-picker__calendar--day-names">
                <tr>
                  {L.getShortWeekDays().map((day: string, index: number) => (
                    <th key={`day-name-${index}`}>{day}</th>
                  ))}
                </tr>
              </thead>
              <Calendar store={store} inputRef={ref} />
            </table>
          </div>
        </div>
      )
    }
  )
)