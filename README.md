# Contract Dashboard

This project aims to provide an interactive and intuitive interface to visualize, filter and analyze company contract information. The dashboard allows tracking metrics, charts and a detailed contract table.

[[English](README.md) | [Portuguese](README.pt.md)]

<p align="center">
  <img src="dashboard.gif" alt="Contract Dashboard" width="1000"/>
</p>

<h2 align="center">Table of Contents</h2>
<p align="center">
 <a href="#main-features">Main Features</a> •
 <a href="#project-structure">Project Structure</a> •
 <a href="#technologies-used">Technologies Used</a> •
 <a href="#libraries-and-tools">Libraries and Tools</a> •
 <a href="#installation-instructions">Installation Instructions</a> •
 <a href="#ai-usage">AI Usage</a> •
 <a href="#challenges-and-solutions">Challenges and Solutions</a> •
 <a href="#next-steps">Next Steps</a> •
 <a href="#support-and-questions">Support and Questions</a>

## Main Features

The application offers an intuitive interface for contract management, including:

- Metric Cards:

  - Displays information about total number of contracts, active contracts, contracts near expiration and total contract value.

- Charts and Visualizations:

  - Contract expiration chart.
  - Distribution by status chart.
  - Distribution by contract type chart.

- Contract Table:

  - Displays details such as identifier, client/supplier, start and end dates, status, value and contract type.
  - Contains sorting, filtering and pagination.

- User Interactivity:

  - Modal with contract listing filtered by metrics.
  - Modal with selected contract details.
  - Allows adding, editing and deleting contracts.
  - Global filters to refine dashboard data.

- Other features:
  - Dark mode
  - Multiple color themes

## Project Structure

The project follows a modular and reusable structure, with components separated and organized in specific folders.

```bash
/dashboard-contract-management
├── api/            # Project API with mock JSON
├── app/            # Main configuration and application pages
├── components/     # Reusable components
│  ├─ shared        # Shared components
│  ├─ pages         # Pages components
│  └─ ui            # UI components
├── interfaces      # Data typing
├── public          # Static files
├── services        # API consumption logic
├── stores          # Global state management
│  └─ hooks         # Custom hooks
├── utils           # Utility functions
├── .env            # Environment variables
└── README.md       # Project documentation
```

## Technologies Used

The project was developed using the following technologies:

### Front-end

- Next.js
- React
- TypeScript

### Testing

- Jest
- React Testing Library

### Libraries and Tools

- Tailwind CSS
- Shadcn UI
- Eslint
- Prettier
- Husky
- Zod
- Tanstack React Table
- Recharts

### Backend (Mock API)

The API was mocked for development, providing endpoints for:

- Creating, reading, updating and deleting contracts
- Reading contract status
- Reading contract type

## Installation Instructions

1. Clone the repository

```bash
git clone https://github.com/jvmoraesdev/contract-management-dashboard.git
```

2. Create a docker container

```bash
docker compose up
```

Access: http://localhost:3000

## AI Usage

### Tools Used

- TempoLabs
  - AI for front-end code generation and mockups
- Cursor
  - AI for pair programming and code generation, together with TempoLabs was the most used during the development.
- Github Copilot
  - AI for code completion and best practices
- V0
  - AI for interface and UI component generation based on mockup and prompt.
- bolt.new
  - Tool for quick application creation and AI-generated code.

### Benefits Obtained

- Great help in cleaning, converting, and adding new mock data for more robust tests.
- Significant increase in productivity;
- Improvement in code quality;
- Facilitation in writing tests;
- More consistent documentation;
- Faster bug resolution;

## Challenges and Solutions

### Responsiveness

**Challenge:** Adaptation to multiple devices
**Solution:** Flexible design system and consistent breakpoints

### Global State Management

**Challenge:** Complex state management
**Solution:** Use of Context API and custom hooks

### Code Review

**Challenge:** Constant code review for quality improvement
**Solution:** Improvement in prompts for AI, use of lint and prettier tools for code maintenance

## Next Steps

- Increase test coverage
- Add internationalization library
- Integrate with real APIs
- Add user feedback via toast notifications
- Add the loading screen for API calls

## Support and Questions

Any questions, please contact me via email [moraejosev@gmail.com](mailto:moraejosev@gmail.com), I will be happy to help!
