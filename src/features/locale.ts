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
    return (this[this.language] as Map<string, Array<string>>).get(
      'weekDays'
    ) as string[]
  }

  getWeekStartingDayNumber(weekStartingDay: string): number {
    const index = this.getWeekDays().indexOf(weekStartingDay)
    return index === -1 ? 0 : index
  }
}
