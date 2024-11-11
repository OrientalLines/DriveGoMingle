# DriveGoMingle Frontend

This is the frontend repository for **DriveGoMingle**, a web and mobile application built with Svelte and Capacitor. DriveGoMingle connects automotive enthusiasts, facilitating event management and interaction within a unique car-centered community.

## Table of Contents
- [About](#about)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## About
DriveGoMingle is designed to foster automotive culture by bringing together car enthusiasts. This project aims to streamline event creation, participation, and management through a versatile web and mobile application.

## Technologies Used
- **Svelte** - A lightweight framework for building reactive web interfaces.
- **Capacitor** - A cross-platform native bridge for Web apps.
- **SvelteKit** - For server-side rendering and routing.
- **Bun** - A fast all-in-one JavaScript runtime and toolkit.
- **Additional tools**: HTTP/S, WebSockets, and Firebase for real-time communications.

## Features
The main functionalities of the DriveGoMingle frontend include:
- **User Authentication**: Registration, login, and profile management.
- **Event Management**: Create, join, and manage events, including location and time settings.
- **Ratings and Reviews**: Rate events and organizers.
- **Media Sharing**: Share images and videos with event participants.
- **Real-time Chat**: Message other users within event chat rooms.
- **Notifications**: Receive alerts for upcoming events and chat messages.

## Getting Started

### Prerequisites
- **Bun** (latest version) - Install from https://bun.sh
- **Capacitor CLI** for mobile builds (`bun add -g @capacitor/cli`)
- For iOS: Xcode, and for Android: Android Studio.

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Initialize Capacitor:
   ```bash
   bunx cap init
   ```

### Running the Project

#### Web Application
```bash
bun dev
```

#### Mobile Application
1. Build the Svelte application:
   ```bash
   bun run build
   ```

2. Sync the web assets to the Capacitor project:
   ```bash
   bunx cap sync
   ```

3. Open the desired platform (iOS or Android) and run:
   ```bash
   bunx cap open ios  # For iOS
   bunx cap open android  # For Android
   ```

## Configuration
Configuration details such as API keys and endpoints should be added in a `.env` file at the project root. 

## Project Structure
- `/src`: Main application code, including components, pages, and services.
- `/static`: Static assets and icons.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Commit changes.
4. Push to the branch.
5. Submit a pull request.

---

## License
This project is licensed under the MIT License.

---
