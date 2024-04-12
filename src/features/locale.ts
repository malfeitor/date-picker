export class L {
  language: string
  languagesAvailables: Array<string>
  weekStartingDay: number;
  [key: string]:
    | number
    | string
    | Array<string>
    | Map<string, Array<string>>
    | (() => Array<string> | undefined)
    | ((weekStartingDay: string) => number)
    | ((weekStartingDay: string) => void)

  constructor(language: string) {
    this.languagesAvailables = ['en', 'fr']
    if (this.languagesAvailables.indexOf(language) === -1) {
      console.error('Unavailable Language, default to english.')
      this.language = 'en'
    } else {
      this.language = language
    }
    this.weekStartingDay = 0
    this.en = new Map<string, string[]>()
    this.en.set('weekDays', [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ])
    this.fr = new Map<string, string[]>()
    this.fr.set('weekDays', [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
    ])
  }

  getWeekDays(): Array<string> {
    let weekDays = [
      ...((this[this.language] as Map<string, Array<string>>).get(
        'weekDays'
      ) as string[]),
    ]
    for (let i = 0; i < this.weekStartingDay; i++) {
      weekDays.push(weekDays.shift() as string)
    }
    return weekDays
  }

  getShortWeekDays(): Array<string> {
    return this.getWeekDays().map((day) => day.substring(0, 3))
  }

  getWeekStartingDayNumber(): number {
    return this.weekStartingDay
  }

  setWeekStartingDay(weekStartingDay: string): void {
    const index = this.getWeekDays().indexOf(weekStartingDay)
    this.weekStartingDay = index
  }
}
