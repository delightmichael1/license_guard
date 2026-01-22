# App Validator

A React component library for managing application validation and maintenance modes with built-in caching and graceful fallback handling.

## Features

- Automatic application validation via API endpoint
- Cookie-based caching to reduce API calls
- Customizable maintenance page
- Loading states with elegant spinner
- Graceful error handling
- TypeScript support
- Framework-agnostic (works with any React-based framework)

## Installation

```bash
npm install @deldev/license_guard
# or
yarn add @deldev/license_guard
# or
pnpm add @deldev/license_guard
```

## Quick Start

```tsx
import { AppValidator } from "@deldev/license_guard";

function App() {
  return (
    <AppValidator appId="your-app-id">
      <YourApplication />
    </AppValidator>
  );
}
```

## API Reference

### AppValidator Component

Main component that wraps your application and handles validation.

#### Props

| Prop          | Type        | Required | Default          | Description                            |
| ------------- | ----------- | -------- | ---------------- | -------------------------------------- |
| `appId`       | `string`    | Yes      | -                | Unique identifier for your application |
| `appName`     | `string`    | No       | -                | Display name shown on maintenance page |
| `apiEndpoint` | `string`    | No       | Default endpoint | Custom validation API endpoint         |
| `children`    | `ReactNode` | Yes      | -                | Your application content               |

#### Example

```tsx
<AppValidator
  appId="my-app-123"
  appName="My Awesome App"
  apiEndpoint="https://api.example.com/validate"
>
  <App />
</AppValidator>
```

### Validation Response

The API endpoint should return JSON in this format:

```typescript
interface ValidationResponse {
  status: "OK" | "MAINTENANCE";
  message?: string; // Optional message for maintenance mode
}
```

## Framework Integration

### Next.js (App Router)

```tsx
// app/layout.tsx
import { AppValidator } from "@deldev/license_guard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppValidator appId="nextjs-app-123" appName="Next.js App">
          {children}
        </AppValidator>
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// pages/_app.tsx
import { AppValidator } from "@deldev/license_guard";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppValidator appId="nextjs-pages-123" appName="My Next.js App">
      <Component {...pageProps} />
    </AppValidator>
  );
}
```

### Create React App (CRA)

```tsx
// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AppValidator } from "@deldev/license_guard";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <React.StrictMode>
    <AppValidator appId="cra-app-123" appName="CRA Application">
      <App />
    </AppValidator>
  </React.StrictMode>,
);
```

### Vite + React

```tsx
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { AppValidator } from "@deldev/license_guard";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppValidator appId="vite-app-123" appName="Vite App">
      <App />
    </AppValidator>
  </React.StrictMode>,
);
```

### Remix

```tsx
// app/root.tsx
import { AppValidator } from "@deldev/license_guard";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <AppValidator appId="remix-app-123" appName="Remix App">
          <Outlet />
        </AppValidator>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
```

### Gatsby

```tsx
// gatsby-browser.js or gatsby-ssr.js
import React from "react";
import { AppValidator } from "@deldev/license_guard";

export const wrapRootElement = ({ element }) => (
  <AppValidator appId="gatsby-app-123" appName="Gatsby Site">
    {element}
  </AppValidator>
);
```

### Astro (with React integration)

```astro
---
// src/layouts/Layout.astro
import { AppValidator } from '@deldev/license_guard';
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Astro App</title>
  </head>
  <body>
    <AppValidator client:only="react" appId="astro-app-123" appName="Astro App">
      <slot />
    </AppValidator>
  </body>
</html>
```

### Expo / React Native Web

```tsx
// App.tsx
import { AppValidator } from "@deldev/license_guard";
import { registerRootComponent } from "expo";

function App() {
  return (
    <AppValidator appId="expo-app-123" appName="Expo App">
      <YourApp />
    </AppValidator>
  );
}

registerRootComponent(App);
```

## Backend API Implementation

### Node.js + Express

```javascript
const express = require("express");
const app = express();

app.post("/validate", (req, res) => {
  const appId = req.headers["x-app-id"];

  // Your validation logic here
  const isInMaintenance = checkMaintenanceStatus(appId);

  if (isInMaintenance) {
    res.json({
      status: "MAINTENANCE",
      message: "We are currently performing scheduled maintenance.",
    });
  } else {
    res.json({ status: "OK" });
  }
});
```

### Next.js API Route

```typescript
// app/api/validate/route.ts (App Router)
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const appId = request.headers.get("x-app-id");

  // Your validation logic
  const isInMaintenance = await checkMaintenanceStatus(appId);

  if (isInMaintenance) {
    return NextResponse.json({
      status: "MAINTENANCE",
      message: "Scheduled maintenance in progress",
    });
  }

  return NextResponse.json({ status: "OK" });
}
```

### Serverless Function (Vercel/Netlify)

```typescript
// api/validate.ts
import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const appId = req.headers["x-app-id"];

  // Validation logic
  const isInMaintenance = process.env.MAINTENANCE_MODE === "true";

  if (isInMaintenance) {
    return res.json({
      status: "MAINTENANCE",
      message: "Under maintenance",
    });
  }

  return res.json({ status: "OK" });
}
```

## Caching Behavior

- Validation results are cached in cookies for 24 hours by default
- Reduces unnecessary API calls
- `OK` status cached for 24 hours
- `MAINTENANCE` status cached for 24 hours
- Cache is automatically cleared after expiration

## Error Handling

The component handles errors gracefully:

- **Network errors**: Shows maintenance mode with "Network error" message
- **Server errors**: Shows maintenance mode with "Server error" message
- **Invalid responses**: Treats as maintenance mode
- **Grace period**: If cookie shows `OK` but validation fails, maintains `OK` status temporarily

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type { ValidationResponse } from "@deldev/license_guard";

const response: ValidationResponse = {
  status: "OK",
  message: "Optional message",
};
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires support for:
  - `fetch` API
  - ES6 features
  - Cookie support

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and questions, please open an issue on GitHub.
