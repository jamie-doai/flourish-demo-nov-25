# Flourish - Nursery Management Platform

Digital platform for production nurseries managing the full plant lifecycle from seed to sale. Track batches, manage tasks, and grow with clarity.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd flourish-grow-master-24331
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies

This project is built with:

- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **React** - UI framework
- **shadcn-ui** - Component library
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Zustand** - State management (if used)
- **React Query** - Server state management

## Deployment

Build the project for production:

```sh
npm run build
```

The production-ready files will be in the `dist/` directory, ready to be deployed to any static hosting service (Vercel, Netlify, AWS S3, etc.).

## Project Structure

```
src/
├── components/    # React components
├── pages/         # Page components
├── lib/           # Utility functions
├── types/         # TypeScript types
├── data/          # Mock data and utilities
└── hooks/         # Custom React hooks
```

## License

Private project
