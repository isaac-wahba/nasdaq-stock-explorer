# NASDAQ Stock Explorer

A modern React application for exploring stocks listed on the NASDAQ exchange.

## Features

- View NASDAQ-listed stocks
- Infinite scroll loading for better performance
- Real-time search functionality
- Responsive design for all devices
- Redux Toolkit for state management
- TypeScript for type safety
- Loading states

## Setup

1. Clone the repository
2. Add `.env` in the root directory:
3. Update `.env` with your Polygon.io API key:
   ```
   VITE_POLYGON_API_KEY=your_api_key_here
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```


## Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Vite
- Lodash for utility functions

## Project Structure

```
src/
├── components/      # React components
├── store/          # Redux store and slices
├── types/          # TypeScript interfaces
├── config/         # Environment and app configuration
└── tests/          # Test files
```

## API Integration

This project uses the Polygon.io API for stock data. The application implements

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
