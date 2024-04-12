# React Date Picker

An easy to use date picker tool for react projects. \
It is written in TypeScript.

## How to use it

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [React](https://react.dev/)
- Install build version from [npm]() with `npm install @malfeitor/date-picker`
- OR clone this repo to get dev version with `git clone https://github.com/malfeitor/date-picker.git`

### Instructions

1. Import to your project : `import {DatePicker} from '@malfeitor/date-picker'`
1. Create a ref (if you use TS, it's an HTMLInput ref) : `const datePickerRef = useRef(null)`
1. Add the component to your page : `<DatePicker ref={datePickerRef} />`
1. Use the value when needed : `datePickerRef.current.value`

## Screenshots
