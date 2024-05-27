export interface InputRef {
  current: HTMLInputElement
}

import { Ref } from 'react'
import { Locale } from '../features/locale'
import { Store } from '../store'

export interface InputRef {
  current: HTMLInputElement
}

export type Day = {
  day: string
  number: number
}

export function isInputRef(ref: any): ref is InputRef {
  if (ref.current.value !== undefined) {
    return true
  } else {
    return false
  }
}

export interface DatePickerViewProps {
  ref: Ref<HTMLInputElement>
  store: Store
  L: Locale
  minimumYear: number
  errorInvalidDate: string
}

export interface DatePickerProps
  extends React.ComponentPropsWithoutRef<'input'> {
  format?: string
  weekStartingDay?: string
  language?: string
  minimumYear?: number
}
