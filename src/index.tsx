import React, { Ref, forwardRef } from 'react'

type Props = {
  format?: string
}

export const DatePicker = forwardRef(function DatePicker(
  { format = 'YYYY-MM-DD' }: Props,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div>
      <input ref={ref} type="text" />
      Date picker ok, format is {format}
    </div>
  )
})
