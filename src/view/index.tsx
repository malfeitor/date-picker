import React, { Ref } from 'react'
import { observer } from 'mobx-react-lite'

import { DatePickerViewProps } from '../utils/types'
import { Header } from '../components/Header'
import { Calendar } from '../components/Calendar'
import mimicInputReadOnly from '../utils/mimicInputReadOnly'
import { Form } from 'react-bootstrap'

export const DatePickerView = observer(
  React.forwardRef(
    (
      {
        store,
        L,
        minimumYear,
        errorInvalidDate = 'Error, invalid date',
        ...restProps
      }: DatePickerViewProps,
      ref: Ref<HTMLInputElement>
    ) => {
      return (
        <div className="date-picker">
          <Form.Control
            name="datepicker-input"
            type="text"
            className="date-picker__input"
            onFocus={() => store.setPickerVisibility(true)}
            placeholder={L.getInputPlaceholder()}
            onKeyDown={(e) => mimicInputReadOnly(e)}
            {...restProps}
            ref={ref}
          />
          <Form.Control.Feedback type="invalid">
            {errorInvalidDate}
          </Form.Control.Feedback>
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
