interface KeyboardEvent {
  key: string
  preventDefault: () => void
}

export default function mimicInputReadOnly(e: KeyboardEvent) {
  if (e.key != 'Tab') {
    e.preventDefault()
    return false
  }
}
