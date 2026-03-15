# Townley Cabin

This project has been migrated from Create React App to [Vite](https://vite.dev/) and from `pnpm` to `npm`.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.

### Build and Development
1. `npm install` - Install all dependencies.
2. `npm start` - Start the local development server (Vite).
3. `npm run build` - Create a production-ready bundle.
4. `npm run deploy` - Build and deploy to Firebase.
 Hosting.

---

## Firebase Deployment

Before you can deploy the application, you must authenticate with Firebase on your local machine.

### 1. Authenticate
Run the following command and follow the instructions in your browser:

```bash
npx firebase login
```

### 2. Deploy
Once logged in, you can deploy using:

```bash
npm run deploy
```

This script will automatically build the project into the `dist` folder and upload it to Firebase.
