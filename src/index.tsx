import React, { Ref, forwardRef, useState } from 'react'
import './index.scss'

type Props = {
  format?: string
}

export const DatePicker = forwardRef(function DatePicker(
  { format = 'YYYY-MM-DD' }: Props,
  ref: Ref<HTMLInputElement>
) {
  const current_date = new Date()

  const [picker_visible, set_picker_visibility] = useState(false)
  const [picked_day, pick_day] = useState(current_date.getDate())
  const [picked_month, pick_month] = useState(current_date.getMonth())
  const [picked_year, pick_year] = useState(current_date.getFullYear())

  return (
    <div>
      <input
        ref={ref}
        type="text"
        onFocus={() => set_picker_visibility(true)}
      />
      <div className={picker_visible ? 'date-picker' : 'date-picker__hidden'}>
        <div className="date-picker__month-year">
          ⇦ {picked_month} {picked_year} ⇨
        </div>
      </div>
    </div>
  )
})
