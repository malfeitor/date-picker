import React, {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { observer } from 'mobx-react-lite'

import { DatePickerViewProps } from '../utils/types'
import { Header } from '../components/Header'
import { Calendar } from '../components/Calendar'
import mimicInputReadOnly from '../utils/mimicInputReadOnly'
import { Form } from 'react-bootstrap'
import { reaction } from 'mobx'

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
      ref: ForwardedRef<HTMLInputElement>
    ) => {
      const datePickerContentRef = useRef<HTMLDivElement>(null)
      const inputRef = useRef<HTMLInputElement>(null)
      const [contentStyle, setContentStyle] = useState({
        display: 'none',
      })

      useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])

      const blurDatePicker = (e: MouseEvent) => {
        if (
          !datePickerContentRef.current?.parentNode?.contains(e.target as Node)
        ) {
          store.setPickerVisibility(false)
        }
      }

      reaction(
        () => store.pickerVisible,
        (visible) => {
          setContentStyle((contentStyle) => ({
            ...contentStyle,
            display: visible ? 'block' : 'none',
          }))
        }
      )

      useEffect(() => {
        window.addEventListener('click', blurDatePicker)
        return () => {
          window.removeEventListener('click', blurDatePicker)
        }
      }, [])

      useEffect(() => {
        const documentBodyWidth = document.body.clientWidth
        const { x, width } =
          datePickerContentRef.current!.getBoundingClientRect()
        if (x + width > documentBodyWidth) {
          const distanceFromLeft = documentBodyWidth - (x + width)
          const newStyle = {
            ...contentStyle,
            left: distanceFromLeft,
          }
          if (JSON.stringify(newStyle) !== JSON.stringify(contentStyle)) {
            setContentStyle(newStyle)
          }
        }
      }, [contentStyle])

      return (
        <div className="date-picker" tabIndex={-1}>
          <Form.Control
            name="datepicker-input"
            type="text"
            className="date-picker__input"
            onFocus={() => store.setPickerVisibility(true)}
            placeholder={L.getInputPlaceholder()}
            onKeyDown={(e) => mimicInputReadOnly(e)}
            {...restProps}
            ref={inputRef}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {errorInvalidDate}
          </Form.Control.Feedback>
          <div
            style={contentStyle}
            className="date-picker__content"
            ref={datePickerContentRef}
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
