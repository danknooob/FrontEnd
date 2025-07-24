# ByteBazaar Frontend

ByteBazaar is a modern SaaS marketplace and business platform that allows users to discover, compare, and deploy leading SaaS solutions with ease. This is the frontend (React + Vite) for ByteBazaar, featuring a beautiful UI, advanced search, authentication (including Google OAuth), and a dynamic dashboard.

## Features
- Modern React UI with Tailwind CSS and DaisyUI
- Product listing, search, and filtering
- User authentication (register, login, Google OAuth)
- User dashboard with purchase and cart management
- Seller and buyer account types
- Cart and order management
- Testimonials, SaaS discounts, and more
- Responsive and mobile-friendly design

## Tech Stack
- [React](https://react.dev/) (with Vite)
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Firebase](https://firebase.google.com/) for Google OAuth
- [Chart.js](https://www.chartjs.org/) for dashboard graphs
- [React Router](https://reactrouter.com/) for routing
- [Express/MongoDB Backend](../Backend) (see backend README)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bytebazaar.git
   cd bytebazaar/FrontEND/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file if needed for API URLs or Firebase config.

### Running the App
```bash
npm run dev
# or
yarn dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production
```bash
npm run build
# or
yarn build
```

## Project Structure
- `src/` — Main source code
  - `components/` — Reusable UI components
  - `pages/` — Main app pages (Landing, SignIn, SignUp, Dashboard, etc.)
  - `redux/` — Redux slices and store
  - `assets/` — Images and static assets
  - `public/` — Public static files

## Backend
The backend is an Express/MongoDB API located in the `../Backend` directory. See its README or `index.js` for setup and endpoints.

## Web Scraping Utility
A Python Flask-based web scraping utility is available in the `../../WebScraping` directory for extracting and structuring SaaS product data.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)
