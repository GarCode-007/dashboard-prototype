# Survey Creation - Jakpat Dashboard v2

Quick prototype untuk halaman survey creation.

## Tech Stack

- **Next.js 13.5** - React framework dengan SSR
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Bootstrap 5** - UI components
- **Sass** - CSS preprocessor

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Run Development Server

```bash
yarn dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 3. Build for Production

```bash
yarn build
yarn serve
```

## Features

✓ Survey title editor
✓ Question list sidebar dengan multiple question types
✓ Question editor dengan rich text toolbar
✓ Multiple question types: SA, MA, DL, CF, OE
✓ Add/delete options
✓ Random order & skip logic toggles
✓ Responsive design

## Question Types

- **SA** - Single Answer
- **MA** - Multiple Answer
- **DL** - Dropdown List
- **CF** - Checkbox
- **OE** - Open Ended

## Project Structure

```
src/
├── components/
│   └── Survey/
│       ├── SurveyHeader.tsx
│       ├── QuestionList.tsx
│       └── QuestionEditor.tsx
├── pages/
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── index.tsx
│   └── survey/
│       └── create.tsx
├── store/
│   ├── index.ts
│   └── slices/
│       └── surveySlice.ts
├── hooks/
│   └── redux.ts
└── styles/
    └── globals.scss
```

## Notes

Ini adalah quick prototype. Beberapa fitur yang belum diimplementasi:
- Rich text editor (menggunakan textarea sementara)
- Drag & drop untuk reorder questions
- Image upload
- Skip logic implementation
- API integration
