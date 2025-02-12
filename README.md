# AssetFlow - Inventory Management System

AssetFlow is a modern, user-friendly inventory management system built with React and TypeScript. It helps organizations track, manage, and optimize their assets with powerful tools and real-time insights.

![AssetFlow Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=600)

## Features

- **Asset Tracking**: Keep track of all organization assets in real-time
- **Borrowing Management**: Streamlined process for lending and returning items
- **Damage Reports**: Track and manage item damages and repairs
- **User Management**: Role-based access control for secure asset management
- **Dark Mode Support**: Built-in dark mode for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend Framework**: React 18
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/assetflow.git
cd assetflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── layout/        # Layout components (Header, Sidebar)
│   └── ui/            # UI components (Button, etc.)
├── pages/             # Page components
│   ├── auth/          # Authentication pages
│   ├── inventory/     # Inventory management
│   ├── borrowing/     # Borrowing management
│   └── damage-reports/# Damage reporting
├── lib/               # Utility functions
└── App.tsx           # Main application component
```

## Key Features Explained

### Asset Management
- Add, edit, and remove inventory items
- Track item status and condition
- Assign unique serial numbers
- Categorize items

### Borrowing System
- Track item borrowing history
- Set due dates for returns
- Monitor overdue items
- Record item condition at checkout/return

### Damage Reporting
- Submit detailed damage reports
- Track repair status
- Document damage with photos
- Prioritize repairs by severity

### User Management
- User roles and permissions
- Department-based organization
- Track user borrowing history
- Profile management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons provided by [Lucide](https://lucide.dev)
- UI components inspired by [Tailwind UI](https://tailwindui.com)