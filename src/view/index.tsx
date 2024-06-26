import React, {
  CSSProperties,
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
import { Form, InputGroup } from 'react-bootstrap'
import { reaction } from 'mobx'
import { FaRegCalendarDays } from 'react-icons/fa6'

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
      const [contentStyle, setContentStyle] = useState<CSSProperties>({})

      useImperativeHandle(ref, () => inputRef.current as HTMLInputElement, [])

      function blurDatePicker(e: Event) {
        const target =
          e.type === 'focusout' ? (e as FocusEvent).relatedTarget : e.target
        if (
          !datePickerContentRef.current?.parentNode?.contains(target as Node)
        ) {
          store.setPickerVisibility(false)
        } else {
          /* If we dont set it to true, MobX reactions will fail
            because i doesn't set picker visibility as observable for this function*/
          store.setPickerVisibility(true)
        }
      }

      reaction(
        () => store.visible,
        (visible) => {
          setContentStyle({
            ...contentStyle,
            display: visible ? 'block' : 'none',
          })
        }
      )

      useEffect(() => {
        window.addEventListener('click', blurDatePicker)
        datePickerContentRef.current?.parentNode?.addEventListener(
          'focusout',
          blurDatePicker
        )
        return () => {
          window.removeEventListener('click', blurDatePicker)
          datePickerContentRef.current?.parentNode?.removeEventListener(
            'focusout',
            blurDatePicker
          )
        }
      }, [])

      useEffect(() => {
        let newStyle = { ...contentStyle, display: 'none' }
        const documentBodyWidth = document.body.clientWidth
        const { x, width } =
          datePickerContentRef.current!.getBoundingClientRect()
        if (x + width > documentBodyWidth) {
          const distanceFromLeft = documentBodyWidth - (x + width)
          newStyle = {
            ...newStyle,
            left: distanceFromLeft,
          }
        }
        setContentStyle(newStyle)
      }, [])

      return (
        <div className="date-picker" tabIndex={-1}>
          <div className="date-picker__inputContainer">
            <InputGroup hasValidation>
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
              <InputGroup.Text>
                <FaRegCalendarDays className="date-picker__input--icon" />
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                {errorInvalidDate}
              </Form.Control.Feedback>
            </InputGroup>
          </div>
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
