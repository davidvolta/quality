# Quality Microsite

This project is a React-based microsite focused on showcasing Quality Assurance processes and features. It is built using Vite.

## Prerequisites

Before you begin, ensure you have the following installed:
*   [Node.js](https://nodejs.org/) (which includes npm). We recommend using the latest LTS version.
*   [Yarn](https://yarnpkg.com/) (optional, you can use npm instead).

## Installation

1.  **Clone the repository (or ensure you have the project files):**
    If you've cloned this project from a remote repository, navigate into the project directory. Otherwise, ensure you are in the root directory of the project (`quality/`).

2.  **Install dependencies:**
    Open your terminal in the project root directory and run one of the following commands:

    Using npm:
    ```bash
    npm install
    ```

    Or using Yarn:
    ```bash
    yarn install
    ```
    This command will download and install all the necessary packages defined in `package.json`.

## Running the Development Server

Once the dependencies are installed, you can start the local development server:

Using npm:
```bash
npm run dev
```

Or using Yarn:
```bash
yarn dev
```

This will typically start the development server on `http://localhost:5173` (Vite's default) or another port if specified in the configuration or if the default is busy. Open this URL in your web browser to view the microsite. The server will automatically reload the page when you make changes to the source files.

## Building for Production

When you are ready to create a production build of the microsite (static assets for deployment), run:

Using npm:
```bash
npm run build
```

Or using Yarn:
```bash
yarn build
```

This command will generate an optimized build of your application in a `dist` folder (by default for Vite projects) in the project root. These files can then be deployed to any static hosting service.

## Available Scripts

In the `package.json`, you will likely find these common scripts:

*   `dev`: Starts the development server.
*   `build`: Creates a production build.
*   `preview`: (Often available in Vite projects) Serves the production build locally for testing.

Check the `scripts` section of your `package.json` for the exact commands available.
