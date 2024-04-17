import React, { forwardRef } from 'react'
import './index.scss'
import { DatePickerProps } from './types'
import { Store } from './store'

import { DatePickerView } from './view'
import { Locale } from './features/locale'

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker(
    {
      format = 'YYYY-MM-DD',
      weekStartingDay = 'Monday',
      language = 'en',
      minimumYear = 1950,
    },
    inputRef
  ) {
    const L = new Locale({ language, weekStartingDay })
    const store = new Store()
    store.setFormat(format)
    store.setWeekStartingDayIndex(L.getWeekStartingDayNumber())

    return (
      <DatePickerView
        ref={inputRef}
        store={store}
        L={L}
        minimumYear={minimumYear}
      />
    )
  }
)
