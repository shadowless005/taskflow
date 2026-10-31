# TaskFlow

TaskFlow is a task management application that I built using React, TypeScript, and Vite. The application allows users to create, edit, view, and delete tasks after logging in with Auth0.

This project demonstrates React routing, Context API state management, TypeScript, authentication, and responsive web design.

The project is organized into components, pages, context, and type definitions to make the code easier to read and maintain.

## Features

- User authentication with Auth0
- User registration and login
- Protected application routes
- Task dashboard
- Create new tasks
- Edit existing tasks
- Delete tasks
- View individual task details
- Task status tracking
- Task priority levels
- Due dates
- Form validation
- LocalStorage task persistence
- Responsive design
- Custom Apple-inspired user interface
- Custom 404 page

## Technologies Used

- React
- TypeScript
- Vite
- React Router
- Auth0
- Context API
- LocalStorage
- CSS

## Project Structure

```text
src/
├── components/      Reusable UI components
├── context/         Global task state using Context API
├── pages/           Application pages
├── types/           TypeScript interfaces and types
├── App.tsx
├── main.tsx
└── index.css
```

## Installation and Setup

### Prerequisites

- Node.js 22.12 or newer in the Node.js 22 release line, or a supported newer LTS release
- npm and Git
- An Auth0 account and a Single Page Application configured for this project

### Install the Project

```bash
git clone https://github.com/shadowless005/taskflow.git
cd taskflow
npm install
```

If the project is already on your computer, open its existing folder instead of cloning it again.

### Configure Auth0

1. In the Auth0 dashboard, create or select a **Single Page Application**.
2. Copy its **Domain** and **Client ID**.
3. Create a `.env.local` file in the project root, next to `package.json`:

```env
VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
```

Replace the placeholders with your application's values. Use the domain without `https://`. A client secret is not needed in this frontend application.

4. Set these application settings in Auth0:

| Setting               | Local development value |
| --------------------- | ----------------------- |
| Allowed Callback URLs | `http://localhost:5173` |
| Allowed Logout URLs   | `http://localhost:5173` |
| Allowed Web Origins   | `http://localhost:5173` |

5. Enable the connections you want to use for the application. Enable Google for Google login. For email/password registration, enable a database connection and allow signups.
6. Save your Auth0 settings.

These URLs must match the app's actual origin. If Vite uses another port, add that origin to all three settings. The app uses `window.location.origin` for its login callback and logout return URL. Restart Vite after changing environment variables. Keep `.env.local` out of Git.

See the [Auth0 React SDK documentation](https://auth0.github.io/auth0-react/) for authentication setup details.

### Run Locally

```bash
npm run dev
```

Open the local URL printed in the terminal, normally `http://localhost:5173`.

## How to Use

1. Open the app. Signed-out visitors are redirected to Auth0.
2. Log in using an enabled method, such as Google, or register through Auth0's signup option when available.
3. On the dashboard, enter a title, optional description, status, priority, and due date, then select **Create Task**.
4. Select **Details** to view an individual task.
5. Select **Edit Task** on the details page, or **Edit** on a task card, to change the task. Select **Save Changes** to save your update.
6. Return to the dashboard and select **Delete** to remove a task. Deletion is immediate.
7. Select **Log Out** to end your Auth0 session. Because the dashboard is protected, returning to it while signed out starts the login flow again.

A separate creation page is also available at `/tasks/new`.

## Architecture and Implementation

- **Routing:** `App.tsx` defines the dashboard, creation, details, editing, and fallback routes. Task routes use `ProtectedRoute` to require authentication.
- **Authentication:** `main.tsx` configures `Auth0Provider`. The `useAuth0` hook supplies authentication state, SDK-typed user information, and login/logout functions. `ProtectedRoute` starts the login redirect inside `useEffect` after authentication loading finishes and displays loading, redirecting, or authentication error messages.
- **Type safety:** `src/types/Task.ts` defines the `Task` interface and allowed status and priority values. Components and context operations use typed props and parameters.
- **Shared state:** `TaskProvider` manages `useState<Task[]>` and the add, update, delete, and lookup functions. The typed Context API and `useTasks` hook share these across pages.
- **Reusable forms:** `TaskForm` supports creation and editing, with typed status and priority state.
- **Persistence:** Task changes are saved to browser localStorage and loaded when the app starts.

## Validation and Error Handling

- A blank or whitespace-only title triggers a validation alert.
- A missing due date triggers a validation alert.
- Missing task IDs display a task-not-found message.
- Unknown page routes display the custom 404 page.
- The task provider falls back to starter tasks if saved JSON cannot be parsed.
- `useTasks` reports an error if called outside its provider.
- TypeScript checks data types during development; form submission checks validate required user input at runtime.

## Storage and Access Limitations

Tasks are stored locally in the browser, not in Auth0 or a cloud database. They persist across refreshes on the same origin, but do not sync between devices. Clearing the site's browser storage removes the saved tasks, and the app then loads its starter tasks.

The localStorage task list is shared by accounts using the same browser profile and origin. Authentication controls access to the app's task screens; this project does not implement per-user task storage, role-based permissions, or backend authorization.

## Code Checks and Production Build

Run ESLint:

```bash
npm run lint
```

Run TypeScript compilation and create the production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Build output is written to `dist/`. To test Auth0 in the preview, add the preview origin printed in the terminal to Auth0's allowed callback URLs, logout URLs, and web origins.

## Author

Matthew Shin
