This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

# Donation Campaign Application

## Created by

Cristoval Martinez
cristovalamartinez@gmail.com

## Table of Contents

- [Overview](#overview)
- [Pages](#pages)
- [API Breakdown](#api-breakdown)
- [Tech Stack](#tech-stack)
- [Deployment](#deployment)
- [Getting Started](#getting-started)
- [License](#license)

## Overview

The Donation Campaign Application is a platform designed to facilitate donation management among team members. It enables team members to receive donations via Stripe, with each member having a unique payment link. The application consists of three main pages: Dashboard, Team Members, and Sign Up.

## Pages

1. **Dashboard:**

   - Provides an overview of donation data in $USD.
   - Displays donation statistics such as total donations, average donation amount, etc.
   - Offers visualization tools for easy data interpretation.

2. **Team Members:**

   - Lists each team member along with associated donation data.
   - Shows individual payment links for each team member.
   - Allows for easy management of team member accounts.

3. **Sign Up:**
   - Allows team members to sign up using their email, name and optional phone number.
   - Generates a unique payment link for each team member upon sign-up.
   - Ensures a seamless user experience with intuitive design and form validation.

## API Breakdown

- **Stripe API Integration:**

  - Used for handling payment links and donation management.
  - Facilitates secure and seamless transactions between donors and team members.

- **Custom Auth API Integration:**
  - Manages user authentication and signup for unique payment IDs.
  - Validates user input for database storage.

## Tech Stack

- **Frontend:** Next.js

  - Employed for server-side rendering, routing, and state management.
  - Utilizes Next.js's built-in features for improved performance and technical SEO.

- **Backend:** Stripe API, Custom Auth API

  - Integrates Stripe API for payment processing and donation management.
  - Implements API routes within Next.js for backend logic.

- **Database:** SQLite
  - Stores user information and donation data efficiently.
  - Provides lightweight database management capabilities.

## Deployment

The application is deployed to a staging server for testing and review. Upon successful testing and acceptance, it will be deployed to a production environment for public access.

## Getting Started

To set up the Donation Campaign Application locally, follow these steps and enter the root directory of the application:

1. Install dependencies: `npm install`
2. Set up environment variables as required (e.g., Stripe API keys) in .env.production and .env.local
3. Run the application: `npm run dev`
4. Access the application at `http://localhost:1650`
5. To build application for production use, run the following `npm run build` then `npm run start`

## Usage

To start the image processing application, run:

```bash
npm start
```

The HTTP server will start listening on the default port (1233). You can access the server by visiting `http://localhost:1233` in your browser.

## Contributing

Contributions are welcome, If you find any issues or have ideas for improvements, please feel free to open an issue or submit a pull request.

## License

This repo is licensed under the MIT License.

<div align='center'>
  
 ## :gem: Let's connect
  
  [![website-shield][website-shield]][website-url] [![LinkedIn][linkedin-shield]][linkedin-url] [![instagram-shield][instagram-shield]][instagram-url]
  
</div>

<!-- [contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge -->
<!-- [contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors -->
<!-- [forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge -->
<!-- [forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white -->

[linkedin-shield]: https://img.shields.io/badge/linkedin-blue?style=flat&logo=linkedin
[linkedin-url]: https://www.linkedin.com/in/cristovalmartinez/
[instagram-shield]: https://img.shields.io/badge/instagram-orange?style=flat&logo=instagram&logoColor=white
[instagram-url]: https://www.instagram.com/cristoval.m/
[website-shield]: https://img.shields.io/badge/website-gray?style=flat&logo=stylelint&logoColor=white
[website-url]: https://www.cristovalmartinez.com
