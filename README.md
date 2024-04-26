# React Date Picker

An easy to use date picker tool for react projects. \
It is written in TypeScript with MobX state manager.

## How to use it

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [React](https://react.dev/)
- [MobX](https://mobx.js.org/)
- Install build version from [npm](https://www.npmjs.com/) with `npm install @malfeitor/date-picker`
- OR clone this repo to get dev version with `git clone https://github.com/malfeitor/date-picker.git`

### Instructions

1. Import to your project : `import {DatePicker} from '@malfeitor/date-picker'`
1. Create a ref (if you use TS, it's an HTMLInput ref) : `const datePickerRef = useRef(null)`
1. Add the component to your page : `<DatePicker ref={datePickerRef} />`
1. Use the value when needed : `datePickerRef.current.value`

### Properties

- (required) `ref` : the ref you'll use to access input's data
- (optional) `format` : the date format you want to have in your input, use YYYY for year, MM for month and DD for day (default: `YYYY-MM-DD`)
- (optional) `language` : the short language letters, only `fr` and `en` available for now (default: en)
- (optional) `weekStartingDay` : the first day of you weeks (default: Sunday)

## Screenshots
