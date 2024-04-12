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
