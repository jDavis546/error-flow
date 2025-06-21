# ErrorFlow

![ErrorFlow Logo](path/to/logo.png)

ErrorFlow is a modern, full-stack support ticketing system designed to streamline issue tracking and resolution. Built with **Next.js**, **Neon PostgreSQL**, **Prisma**, and integrated with **Sentry** for robust error tracking and logging, ErrorFlow empowers teams to manage support tickets efficiently while monitoring application errors in real-time.

## Features

- **Seamless Ticketing System**: Create, track, and resolve support tickets with an intuitive interface.
- **Real-Time Error Monitoring**: Integrated with Sentry for comprehensive error tracking and logging.
- **Scalable Backend**: Powered by Neon PostgreSQL and Prisma for efficient data management.
- **Responsive Frontend**: Built with Next.js for a fast, dynamic user experience.
- **Customizable Workflows**: Adapt the system to fit your team's support processes.

## Tech Stack

- **Frontend & Backend**: [Next.js](https://nextjs.org/) - React framework for server-side rendering and API routes.
- **Database**: [Neon PostgreSQL](https://neon.tech/) - Serverless PostgreSQL for scalability and performance.
- **ORM**: [Prisma](https://www.prisma.io/) - Type-safe database client for simplified queries.
- **Error Tracking**: [Sentry](https://sentry.io/) - Real-time error monitoring and logging.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Neon PostgreSQL account
- Sentry account
- Git and a GitHub account

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/jDavis546/errorflow.git
   cd errorflow

2. **Install dependencies**:

   ```bash
   npm install

3. **Set up environment variables**:

   Create a .env file in the root directory and add the following:

   ```bash
   DATABASE_URL="your-neon-postgresql-connection-string"
   NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn"
   SENTRY_AUTH_TOKEN="your-sentry-auth-token"
   NEXTAUTH_URL="<http://localhost:3000>"
   NEXTAUTH_SECRET="your-nextauth-secret"

4. **Set up the database**:

   ```bash
   npx prisma migrate dev --name init

5. **Set up the database**:

   ```bash
   npm run dev


Open <http://localhost:3000> in your browser.

### Configuration

-**Neon PostgreSQL**: Sign up at Neon and obtain your database connection string.

- **Sentry**: Create a project in Sentry and configure the DSN in your .env file.

- **Prisma**: Update the schema.prisma file if you need to modify the database schema, then run npx prisma generate.

### Contributing

We welcome contributions! Please follow these steps:

- Fork the repository.

- Create a new branch (git checkout -b feature/your-feature).

- Commit your changes (git commit -m 'Add your feature').

- Push to the branch (git push origin feature/your-feature).

- Open a Pull Request.

**License**
This project is licensed under the MIT License (LICENSE).

**Contact**
For questions or feedback, reach out via GitHub Issues or connect with us on X.
