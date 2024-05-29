import { makeObservable, observable, action, computed } from 'mobx'

export class Store {
  date = new Date()
  visible = false
  format = 'YYYY-MM-DD'
  weekStartingDay = 0
  animationDirection = 0

  constructor() {
    makeObservable(this, {
      date: observable,
      setNewDate: action,
      format: observable,
      formatedDate: computed,
      visible: observable,
      setPickerVisibility: action,
      weekStartingDay: observable,
      setWeekStartingDay: action,
      getDate: computed,
      setPreviousMonth: action,
      setNextMonth: action,
      getFirstDayOfCalendar: computed,
      setMonth: action,
      setYear: action,
      animationDirection: observable,
      setAnimationDirection: action,
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
  setWeekStartingDay(index: number) {
    this.weekStartingDay = index
  }
  get getDate() {
    return new Date(this.date)
  }
  setPreviousMonth() {
    const oldDate = new Date(this.date)
    const newDate = new Date(this.date)
    newDate.setMonth(this.date.getMonth() - 1)
    this.animationDirection = this.date.getTime() > oldDate.getTime() ? 1 : -1
    this.date = newDate
  }
  setNextMonth() {
    const oldDate = new Date(this.date)
    const newDate = new Date(this.date)
    newDate.setMonth(this.date.getMonth() + 1)
    this.animationDirection = newDate.getTime() > oldDate.getTime() ? 1 : -1
    this.date = newDate
  }
  setMonth(newMonth: number) {
    const oldDate = new Date(this.date)
    const newDate = new Date(this.date)
    newDate.setMonth(newMonth)
    this.animationDirection = newDate.getTime() > oldDate.getTime() ? 1 : -1
    this.date = newDate
  }
  setYear(newYear: number) {
    const oldDate = new Date(this.date)
    const newDate = new Date(this.date)
    newDate.setFullYear(newYear)
    this.animationDirection = newDate.getTime() > oldDate.getTime() ? 1 : -1
    this.date = newDate
  }
  get getFirstDayOfCalendar() {
    // getMonth start at 0, when creating a date it begin at 1
    const firstDayOfCalendar = new Date(
      `${this.date.getFullYear()}-${this.date.getMonth() + 1}-01`
    )
    // week begin sunday, index 0
    if (firstDayOfCalendar.getDay() === 0 && this.weekStartingDay !== 0) {
      firstDayOfCalendar.setDate(-(6 - this.weekStartingDay))
    } else {
      firstDayOfCalendar.setDate(
        1 + this.weekStartingDay - firstDayOfCalendar.getDay()
      )
    }
    return firstDayOfCalendar
  }
  setAnimationDirection(direction: number) {
    this.animationDirection = direction
  }
}
