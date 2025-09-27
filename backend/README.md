# Mangaba Assistente

## Overview
Mangaba Assistente is a backend application built with TypeScript and Prisma, designed to manage user authentication and data. It provides a robust API for user management, including registration, login, and session handling.

## Features
- User registration and authentication
- Secure token-based authentication
- User management (CRUD operations)
- Database migrations and seeding with Prisma

## Project Structure
```
backend
├── src
│   ├── config               # Configuration files
│   │   └── database.ts      # Database connection setup
│   ├── middleware           # Middleware functions
│   │   ├── auth.ts          # Authentication middleware
│   │   └── errorHandler.ts   # Error handling middleware
│   ├── models               # Database models
│   │   └── User.ts          # User model
│   ├── routes               # API routes
│   │   ├── auth.ts          # Authentication routes
│   │   └── users.ts         # User management routes
│   ├── scripts              # Scripts for database operations
│   │   ├── migrate.ts       # Database migration script
│   │   └── seed.ts          # Database seeding script
│   ├── server.ts            # Entry point of the application
│   └── types                # TypeScript types and interfaces
│       └── index.ts         # Common types
├── prisma                   # Prisma setup
│   ├── schema.prisma        # Database schema definition
│   └── migrations/          # Migration files
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── ENVIRONMENT_SETUP.md     # Setup instructions
├── package.json             # Project metadata and dependencies
├── pnpm-lock.yaml           # Dependency lock file
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd Mangaba-Assistente/backend
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` and fill in the required values.

4. Run database migrations:
   ```
   pnpm run migrate
   ```

5. Seed the database (optional):
   ```
   pnpm run seed
   ```

## Usage
To start the server, run:
```
pnpm start
```

The API will be available at `http://localhost:3000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.