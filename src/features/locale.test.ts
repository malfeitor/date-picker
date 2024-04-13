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
  describe('When I read the week days', () => {
    it('Should return english week days in right order', () => {
      const L = new Locale({ language: 'en' })
      expect(L.getWeekDays()).toStrictEqual([
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ])
    })
    it('Should return french week days in right order', () => {
      const L = new Locale({ language: 'fr' })
      expect(L.getWeekDays()).toStrictEqual([
        'Dimanche',
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
      ])
    })
  })
  describe('When I set first day to Monday', () => {
    it('Should return english week days starting from Monday', () => {
      const L = new Locale({ language: 'en', weekStartingDay: 'Monday' })
      expect(L.getWeekDays()).toStrictEqual([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ])
    })
    it('Should return french week days starting from Monday', () => {
      const L = new Locale({ language: 'fr', weekStartingDay: 'Lundi' })
      expect(L.getWeekDays()).toStrictEqual([
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
      ])
    })
  })
  describe("When I try a language who isn't available", () => {
    it('Should set english by default', () => {
      const L = new Locale({ language: 'zaer' })
      expect(L.getMonthName(0)).toBe('January')
    })
    it("Should warn in the console this language isn't available", () => {
      const consoleError = jest.fn()
      console.error = consoleError
      const L = new Locale({ language: 'zaer' })
      expect(consoleError).toHaveBeenCalledWith(
        'Unavailable Language, default to english.'
      )
    })
    it('Should set sunday as the first day of week', () => {
      const L = new Locale({ language: 'zaer', weekStartingDay: 'Monday' })
      expect(L.getWeekStartingDayNumber()).toEqual(0)
    })
  })
})
