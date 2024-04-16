interface LArgs {
  language?: string
  weekStartingDay?: string
}

export class Locale {
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
    | ((monthIndex: number) => string)

  constructor({ language = 'en', weekStartingDay = 'Sunday' }: LArgs) {
    this.languagesAvailables = ['en', 'fr']

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
    this.en.set('months', [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ])
    this.en.set('inputPlaceholder', ['Click to pick a date'])
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
    this.fr.set('months', [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ])
    this.fr.set('inputPlaceholder', ['Cliquez pour choisir une date'])
    if (this.languagesAvailables.indexOf(language) === -1) {
      console.error('Unavailable Language, default to english.')
      this.language = 'en'
      this.weekStartingDay = 0
    } else {
      this.language = language
      this.weekStartingDay = this.getWeekDays().indexOf(weekStartingDay)
      if (this.weekStartingDay < 0) {
        this.weekStartingDay = 0
      }
    }
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

  getMonthName(monthIndex: number): string {
    return (
      (this[this.language] as Map<string, Array<string>>).get(
        'months'
      ) as string[]
    )[monthIndex]
  }

  getAllMonthsNames(): string[] {
    return (this[this.language] as Map<string, Array<string>>).get(
      'months'
    ) as string[]
  }
  getInputPlaceholder(): string {
    return (this[this.language] as Map<string, Array<string>>).get(
      'inputPlaceholder'
    )![0] as string
  }
}
