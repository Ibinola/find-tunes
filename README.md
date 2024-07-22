## find-tunes

Find-tunes allows users to search for albums by artist name using the Spotify API. It includes form validation with zod and react-hook-form, and displays album data with responsive UI components

## Features

- Search for albums by artist name.
- Display album information, including image, name, release date, and a link to the album on Spotify.
- Show Skeleton loaders while fetching data

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Ibinola/find-tunes.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo-name
   ```

3. **Install dependencies:**

   ```bash
   yarn install
    # or
    npm install
    # or
    pnpm install
   ```

### Required Environment Variables

1. `NEXT_PUBLIC_CLIENT_ID` - Your Spotify API Client ID
2. `NEXT_PUBLIC_CLIENT_SECRET` - Your Spotify API Client Secret

## Usage

To run the project locally:

1. Start the development server
   ```sh
   yarn dev
   ```
2. Visit `http://localhost:3000` in your browser.

### Project Structure

- `app/page.tsx` - Main page where the album search form and results are displayed.
- `components/` - Contains reusable UI components such as Input, Button, Card, and Skeleton.
- `lib/utils.ts` - Utility functions and types, including albumType.
- `components/ui/` - Includes custom UI components used in the project.
