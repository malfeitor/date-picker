import React, { LegacyRef } from 'react'
import { observer } from 'mobx-react-lite'

import { DatePickerViewProps } from '../utils/types'
import { Header } from '../components/Header'
import { Calendar } from '../components/Calendar'
import mimicInputReadOnly from '../utils/mimicInputReadOnly'

export const DatePickerView = observer(
  React.forwardRef(
    (
      { store, L, minimumYear, ...restProps }: DatePickerViewProps,
      ref: LegacyRef<HTMLInputElement>
    ) => {
      return (
        <div className="date-picker">
          <input
            name="datepicker-input"
            type="text"
            className="date-picker__input"
            onFocus={() => store.setPickerVisibility(true)}
            placeholder={L.getInputPlaceholder()}
            onKeyDown={(e) => mimicInputReadOnly(e)}
            ref={ref}
            {...restProps}
          />
          <div
            style={{
              display: store.pickerVisible ? 'block' : 'none',
            }}
            className="date-picker__content"
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
