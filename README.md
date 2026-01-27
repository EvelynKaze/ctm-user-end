# CopyTrading Markets

A comprehensive trading platform that enables users to copy trades from expert traders in cryptocurrency and stock markets. Built with Next.js 15, this application provides a seamless experience for both novice and experienced investors to participate in automated trading strategies.

## 🚀 Features

### Core Functionality
- **Copy Trading**: Automatically replicate trades from verified expert traders
- **Multi-Asset Support**: Trade cryptocurrencies and stocks across major exchanges
- **Real-Time Data**: Live market data and trading charts
- **Portfolio Management**: Comprehensive portfolio tracking and analytics
- **Secure Authentication**: Google OAuth and manual signup with JWT tokens

### Trading Features
- **Expert Trader Selection**: Browse and select from vetted trading professionals
- **Risk Management**: Configurable risk levels and investment amounts
- **Automated Execution**: Real-time trade copying without manual intervention
- **Performance Tracking**: Detailed ROI and profit/loss analytics

### Financial Operations
- **Deposits & Withdrawals**: Secure fund management with multiple payment options
- **KYC Verification**: Compliant identity verification process
- **Transaction History**: Complete audit trail of all trading activities

### User Experience
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern UI with customizable themes
- **Real-Time Notifications**: Toast notifications for important updates
- **Interactive Charts**: TradingView integration for market analysis

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives

### State Management
- **Redux Toolkit** - Predictable state management
- **React Query** - Server state management and caching

### Blockchain & Wallets
- **Wagmi** - Ethereum interaction library
- **RainbowKit** - Wallet connection UI
- **Viem** - Low-level Ethereum utilities

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
├── app/                          # Next.js app directory
│   ├── (landing-pages)/         # Public landing pages
│   │   ├── (overview)/          # Home page
│   │   ├── about/               # About page
│   │   ├── buy-crypto/          # Crypto purchase page
│   │   ├── copy-trading/        # Copy trading info
│   │   ├── contact/             # Contact page
│   │   └── ...
│   ├── actions/                 # Server actions
│   ├── auth/                    # Authentication pages
│   ├── dashboard/               # Protected dashboard
│   │   ├── (overview)/          # Dashboard home
│   │   ├── buy-sell/            # Trading interface
│   │   ├── copytrade/           # Copy trading options
│   │   ├── deposit/             # Deposit funds
│   │   ├── withdraw/            # Withdraw funds
│   │   ├── portfolio/           # Portfolio view
│   │   ├── history/             # Transaction history
│   │   ├── kyc/                 # KYC verification
│   │   ├── profile/             # User profile
│   │   └── support/             # Support tickets
│   ├── loading/                 # Loading page
│   ├── sign-in/                 # Sign in page
│   └── sign-up/                 # Sign up page
├── components/                  # Reusable components
│   ├── landing/                 # Landing page components
│   ├── ui/                      # UI primitives
│   ├── modals/                  # Modal components
│   └── ...
├── constants/                   # Application constants
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
├── store/                       # Redux store and slices
├── types/                       # TypeScript type definitions
└── public/                      # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ctm-user-end
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   API_URL=https://ctm-backend-production.up.railway.app/api/v1
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
- `API_URL` - Backend API endpoint
- `NEXT_PUBLIC_APP_URL` - Frontend application URL

### Build Configuration
The project uses Next.js configuration in `next.config.ts` and Tailwind CSS configuration in `tailwind.config.ts`.

## 🎨 UI Components

The application uses a custom component library built on top of Radix UI primitives and styled with Tailwind CSS. Key components include:

- **Navigation**: Responsive navbar with mobile menu
- **Cards**: Various card components for displaying information
- **Forms**: Form components with validation
- **Modals**: Dialog components for user interactions
- **Charts**: TradingView integration for market data

## 🔐 Authentication

The application supports multiple authentication methods:
- **Manual Registration**: Email and password signup
- **Google OAuth**: Social login with Google
- **JWT Tokens**: Secure token-based authentication

## 💰 Trading Logic

### Copy Trading Process
1. User selects an expert trader
2. User specifies investment amount
3. System automatically copies trades in real-time
4. Profits/losses are reflected in user's portfolio

### Risk Management
- Minimum and maximum investment limits
- Risk level categorization (Low, Medium, High)
- Portfolio diversification recommendations

## 📊 Data Flow

1. **Frontend** → Server Actions → **Backend API**
2. **Real-time Updates** via polling and WebSocket connections
3. **State Management** through Redux and React Query
4. **Caching** implemented for improved performance

## 🧪 Testing

Currently, the project focuses on manual testing and user acceptance testing. Future updates may include:
- Unit tests with Jest
- Integration tests with Playwright
- E2E testing workflows

## 🚀 Deployment

The application is designed for deployment on Vercel, Netlify, or any Node.js-compatible platform:

1. Build the application: `npm run build`
2. Deploy the `.next` folder contents
3. Configure environment variables on the hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support, please contact:
- Email: support@copytradingmarkets.com
- Dashboard: Support section in user dashboard

## 🔄 Version History

- **v0.1.0** - Initial release with core copy trading functionality

---

**CopyTrading Markets** - Democratizing access to expert trading strategies.
