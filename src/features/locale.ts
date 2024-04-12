export class L {
  language: string
  languagesAvailables: Array<string>;
  [key: string]:
    | string
    | Array<string>
    | Map<string, Array<string>>
    | (() => Array<string> | undefined)
    | ((weekStartingDay: string) => number)

  constructor(language: string) {
    this.languagesAvailables = ['en', 'fr']
    if (this.languagesAvailables.indexOf(language) === -1) {
      console.error('Unavailable Language, default to english.')
      this.language = 'en'
    } else {
      this.language = language
    }
    this.en = new Map<'weekDays', string[]>()
    this.en.set('weekDays', [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ])
    this.fr = new Map<'weekDays', string[]>()
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
    return (this[this.language] as Map<string, Array<string>>).get(
      'weekDays'
    ) as string[]
  }

  getWeekStartingDayNumber(weekStartingDay: string): number {
    return this.getWeekDays().indexOf(weekStartingDay)
  }
}
