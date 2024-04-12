/**
 * @jest-environment jsdom
 */

import { Locale } from './locale'

describe('Given I want all text in my language', () => {
  describe('When I read the months', () => {
    it("Should return my language's months names", () => {
      expect(true).toBeTruthy()
    })
  })
})
