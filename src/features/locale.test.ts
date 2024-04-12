/**
 * @jest-environment jsdom
 */

import { Locale } from './locale'

describe('Given I want all text in my language', () => {
  describe('When I read the months', () => {
    it('Should return english months in right order', () => {
      const L = new Locale({ language: 'en' })
      ;[
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
      ].forEach((name, index) => {
        expect(L.getMonthName(index)).toBe(name)
      })
    })
    it('Should return french months in right order', () => {
      const L = new Locale({ language: 'fr' })
      ;[
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
      ].forEach((name, index) => {
        expect(L.getMonthName(index)).toBe(name)
      })
    })
  })
})
