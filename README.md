# QFin - Personal Finance App

QFin is a personal finance app powered by a MEAN tech stack. It helps you manage your finances, track transactions, and gain insights into your financial health.

## Group

- Tim Schlegel

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Features](#future-features)

## Overview

QFin is a personal finance web app designed to empower users in managing their financial transactions, tracking account balances, and gaining insights into their overall financial well-being. The app features a dashboard, account management capabilities, and transaction logging functionalities.

Visit the live version at [https://qfin.timschlegel.com](https://qfin.timschlegel.com).

A test user with pre-populated data is available:

```
Mail:       test@mail.com
Password:   passHSG2023
```

## Features

- **Landing Page:** An attractive landing page serves as an introduction to the app, providing advertisement and a direct link to the dashboard.
- **Authentication:** Secure sign-up and sign-in functionality using JSON Web Tokens (JWT).
- **Dashboard:** The core of the app, allowing users to perform CRUD operations on accounts, log transactions, and view key financial metrics such as personal net worth, total income, and total expenses.

## Tech Stack

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - TypeScript

- **Frontend:**
  - Angular
  - Tailwind CSS
  - Flowbite

- **Development:**
  - Docker Compose

- **Production:**
  - Kubernetes Cluster

## Installation

To install and run QFin locally, follow these steps:

### Prerequisite
- Docker
- Docker-Compose

### Setup

1. Clone the repository:

```bash
git clone https://github.com/timslg/qfin.git
cd qfin
```

2. Run the docker-compose file:

Docker-Compose will build and run all necessary images (frontend, backend, db, proxy). The sourcecode can be modified, since it is bound to the containers as a volume (hot-reload possible).


```bash
docker-compose up -d
```

Visit [http://localhost](http://localhost) to access the app locally.

3. Shut the app down:

```bash
docker-compose down
```

## Usage

1. Access the landing page by visiting [http://localhost](http://localhost) and navigate to the dashboard.
2. Sign up or sign in to start managing your accounts and transactions.
3. Use the dashboard to create, update, or delete accounts and log new transactions.
4. Gain insights into your personal net worth, total income, and total expenses.

## Future Features

I am aming to continue working on QFin in the future:

- Insightful statistics with graphs
- Support for multiple currencies updated daily
- Reoccurring transactions
- Tracking of investments with real-time quotes
- Full responsive Progressive Web App (PWA) support and offline mode
- Amortization of expenses for realistic spending insights
