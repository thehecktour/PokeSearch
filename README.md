# PokéSearch

A React web application for exploring Pokémon information using PokéAPI. Users can search, filter, and view detailed information about different Pokémons.

## Features

-  Search Pokémons by name
-  Filter Pokémons by type 
-  Random Pokémon generator
-  Responsive design
-  Detailed Pokémon statistics and information

## Technologies Used

- React 
- Vite 
- TailwindCSS 
- Motion (Framer Motion)
- React Router
- ESLint + Prettier
- PokéAPI

## Prerequisites

- Node.js

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ytraddan/pokesearch
   cd pokesearch
   ```

2. **Install Dependencies**

   ```bash
   npm i
   ```

3. **Environment Setup**

   - No environment variables are required

4. **Start Development Server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Usage

### Navigation

The application features three main sections accessible from the navigation bar:

- 🏠 Home - Overview and introduction
- 🔍 Search - Search and filter Pokémon
- 🎲 Random - Discover random Pokémon

### Search Features

1. **Basic Search**

   - Use the search bar to find Pokémon by name
   - Search is case-insensitive and updates results in real-time
   - Your search terms are automatically saved and restored on page reload

2. **Type Filtering**

   - Filter Pokémon by their elemental type
   - Click on type badges to toggle filtering
    
3. **Pagination**
   - Navigate through results using prev/next buttons
   - Results are displayed in pages for better performance
   - Current page is maintained during filtering

### Random Pokémon Generator

1. **Random Selection**

   - Click the Random section to get three random Pokémon
   - Each Pokémon card displays:
     - Name
     - Official artwork
     - Primary ability description

2. **Detailed View**
   - Click on any Pokémon card to view detailed information
   - Confirm selection in the modal to navigate to details page

### Detailed Pokémon Information

The detailed view shows comprehensive information including:

- Base stats with visual indicators
- Height and weight
- All abilities with descriptions
- Type classifications
- Complete move list
- Evolution chain (if applicable)

### Responsive Design

- The application is fully responsive and works on:
  - Desktop computers
  - Tablets
  - Mobile phones
- UI elements automatically adjust based on screen size
- Touch-friendly interface for mobile devices

### Data Persistence

The application saves your:

- Last search term
- Selected type filters
- These preferences are restored when you return to the app

### Performance Considerations

- Images are lazy-loaded for better performance
- API requests are cached to minimize server load
- Smooth animations for better user experience

## Contributing

We welcome contributions to PokéSearch! Here's how you can help:

1. **Fork & Clone**

   - Fork the repository
   - Clone your fork locally

2. **Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Submit**
   - Push your changes
   - Create a Pull Request with description of your changes

## License

This project is licensed under the MIT License.
