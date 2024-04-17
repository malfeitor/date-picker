import { makeObservable, observable, action, computed } from 'mobx'

export class Store {
  date = new Date()
  visible = false
  format = 'YYYY-MM-DD'
  datePicked = false
  weekStartingDay = 0

  constructor() {
    makeObservable(this, {
      date: observable,
      setNewDate: action,
      format: observable,
      formatedDate: computed,
      visible: observable,
      setPickerVisibility: action,
      pickerVisible: computed,
      datePicked: observable,
      dateHaveBeenPicked: computed,
      weekStartingDay: observable,
      setWeekStartingDayIndex: action,
      getDate: computed,
      setPreviousMonth: action,
      setNextMonth: action,
      getFirstDayOfCalendar: computed,
    })
  }

  setNewDate(newDate: Date) {
    this.date = newDate
  }
  get formatedDate(): string {
    return this.format
      .replace('YYYY', `${this.date.getFullYear()}`)
      .replace('MM', `${this.date.getMonth() + 1}`.padStart(2, '0'))
      .replace('DD', `${this.date.getDate()}`.padStart(2, '0'))
  }
  setPickerVisibility(visible: boolean) {
    this.visible = visible
  }
  get pickerVisible() {
    return this.visible
  }
  setFormat(format: string) {
    const yearPosition = format.includes('YYYY')
    const monthPosition = format.includes('MM')
    const dayPosition = format.includes('DD')
    if (yearPosition && monthPosition && dayPosition) {
      this.format = format
    } else {
      console.error('Date format unknown')
    }
  }
  setDatePicked(value: boolean) {
    this.datePicked = value
  }
  get dateHaveBeenPicked() {
    return this.datePicked
  }
  get weekStartingDayIndex() {
    return this.weekStartingDay
  }
  setWeekStartingDayIndex(index: number) {
    this.weekStartingDay = index
  }
  get getDate() {
    return new Date(this.date)
  }
  setPreviousMonth() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() - 1))
  }
  setNextMonth() {
    this.date = new Date(this.date.setMonth(this.date.getMonth() + 1))
  }
  get getFirstDayOfCalendar() {
    // getMonth start at 0, when creating a date it begin at 1
    const firstDayOfCalendar = new Date(
      `${this.date.getFullYear()}-${this.date.getMonth() + 1}-01`
    )
    // week begin sunday, index 0
    if (firstDayOfCalendar.getDay() === 0 && this.weekStartingDayIndex !== 0) {
      firstDayOfCalendar.setDate(-(6 - this.weekStartingDayIndex))
    } else {
      firstDayOfCalendar.setDate(
        1 + this.weekStartingDayIndex - firstDayOfCalendar.getDay()
      )
    }
    return firstDayOfCalendar
  }
}
