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
    if (this.languagesAvailables.indexOf(language) === -1) {
      console.error('Unavailable Language, default to english.')
      this.language = 'en'
    } else {
      this.language = language
    }
    this.weekStartingDay = this.getWeekDays().indexOf(weekStartingDay)
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
}
