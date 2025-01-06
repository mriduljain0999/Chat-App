# Chat App

A real-time chat application built using WebSockets. This application allows users to create or join chat rooms using a unique room code and communicate with other participants in real time.

## Features

- **Real-Time Messaging:** Send and receive messages instantly.
- **Room-Based Chat:** Users can join specific chat rooms using a unique room code.
- **User-Friendly Interface:** Minimalist and responsive design for a seamless user experience.
- **Cross-Platform Support:** Accessible from both desktop and mobile devices.

## Technologies Used

### Backend
- **Node.js**: Server-side runtime environment.
- **WebSocket**: Real-time communication.
- **TypeScript**: Strongly-typed JavaScript for scalable development.

### Frontend
- **React**: Component-based UI library.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI design.
- **Vite**: Fast build tool and development server.
- **Recoil**: State management for React.

## Project Structure

```
chatApp/
├── chatApp-be/        # Backend
│   ├── src/
│   │   └── index.ts   # Main server file
│   ├── tsconfig.json  # TypeScript configuration
│   └── package.json   # Backend dependencies
└── chatApp-fe/        # Frontend
    ├── src/
    │   ├── components/
    │   │   ├── ui/    # UI components
    │   │   ├── Chat.tsx  # Main chat component
    │   └── atoms/     # Recoil atoms
    ├── index.html     # Entry HTML file
    ├── tailwind.config.js # Tailwind CSS configuration
    └── package.json   # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:mriduljain0999/Chat-App.git
   cd Chat-App
   ```

2. Install backend dependencies:
   ```bash
   cd chatApp-be
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../chatApp-fe
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd chatApp-be
   npm run dev
   ```

2. Start the frontend application:
   ```bash
   cd ../chatApp-fe
   npm run dev
   ```

3. Open your browser and navigate to the provided URL (usually `http://localhost:3000`).

## How to Use

1. **Create a Room:**
   - Navigate to the homepage and click "Create Room" to generate a unique room code.

2. **Join a Room:**
   - Enter a valid room code to join an existing chat room.

3. **Start Chatting:**
   - Send messages and see real-time updates as others join and chat.

## Contribution

Contributions are welcome! If you encounter bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact

If you have any questions or feedback, feel free to reach out:
- **GitHub**: [mriduljain0999](https://github.com/mriduljain0999)
