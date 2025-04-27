# EventBoard

A responsive, interactive calendar application built with Next.js featuring draggable navigation and event management.

[Demo](https://event-calendar-board.vercel.app/)

## Features

- Drag/swipe navigation between days and months
- Responsive design for both desktop and mobile
- Event management with color labels
- Interactive date selection and viewing

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org)
- **Styling**: CSS/SCSS modules
- **Font**: [Geist](https://vercel.com/font) - automatically optimized via `next/font`
- **Deployment**: Optimized for [Vercel](https://vercel.com)

## Project Structure

- `app/page.tsx` - Main entry point for the application
- `components/` - Reusable UI components
- `lib/` - Utility functions and data models

## Known Issues

- Calendar header selection doesn't synchronize with calendar body scroll position, the Calendar header active date is not updated on scroll in mobile view
- Some responsive design inconsistencies across different viewport sizes

## Roadmap

### Near-term

- Unify calendar header and calendar body components for better state management
- Implement event creation functionality
- Add event filtering by label/day
- Create color/label selector for events
- Add notes to event details
- optimise images

### Future Enhancements

- Utilize Next.js parallel routes for event details modal
- Implement React Native view transitions for smooth morphing between views
- Explore alternative calendar day views for mobile (carousel, etc.)
- Improve accessibility features
- Add favicon and PWA support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Deployment

This application is optimized for deployment on the [Vercel Platform](https://vercel.com), the creators of Next.js.

For more details on deploying Next.js applications, check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment).

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js/) - feedback and contributions are welcome!

## License

[MIT](LICENSE)