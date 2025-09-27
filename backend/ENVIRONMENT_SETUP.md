# ENVIRONMENT SETUP

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm or pnpm (package managers)
- PostgreSQL (or your preferred database)

## Setup Instructions

1. **Clone the Repository**
   Clone the project repository to your local machine using:
   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**
   Navigate to the project directory and install the required dependencies:
   ```
   npm install
   ```
   or if you are using pnpm:
   ```
   pnpm install
   ```

3. **Configure Environment Variables**
   Copy the `.env.example` file to `.env` and update the values as necessary:
   ```
   cp .env.example .env
   ```
   Ensure you set the correct database connection string and any other required environment variables.

4. **Set Up the Database**
   Ensure your PostgreSQL server is running. Then, run the following command to create the database:
   ```
   npx prisma migrate dev --name init
   ```
   This command will apply the migrations defined in `prisma/schema.prisma` and create the necessary tables.

5. **Seed the Database (Optional)**
   If you want to populate the database with initial data, run:
   ```
   npx ts-node src/scripts/seed.ts
   ```

6. **Run the Application**
   Start the application using:
   ```
   npx ts-node src/server.ts
   ```
   The server should now be running, and you can access it at `http://localhost:3000` (or the port specified in your configuration).

## Additional Notes
- For development, you may want to use tools like Postman or Insomnia to test the API endpoints.
- Make sure to check the `README.md` for more detailed usage instructions and API documentation.