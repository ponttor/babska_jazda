# Banja project guide

## Product context

Banja is a small, low-traffic website for a bathhouse. Keep the product simple, fast, accessible, and easy to maintain. Prefer straightforward solutions that fit a single Rails application. Do not introduce microservices, distributed infrastructure, or complex caching without a demonstrated need.

The current scope is an informational website. Treat bookings, payments, accounts, notifications, and third-party integrations as separate product decisions; do not assume they are required unless a task explicitly introduces them.

## Technology stack

- Ruby 3.4 and Rails 8.1
- PostgreSQL
- Inertia Rails 3
- React 19 with TypeScript
- Mantine for UI components and theming
- Vite Ruby for frontend development and builds
- npm with `package-lock.json`
- asdf for local runtime versions

## Architecture

- Keep the application as a Rails monolith.
- Use Rails routes and controllers for navigation and server-side business logic.
- Render React pages through Inertia instead of building a separate JSON API unless an external client actually requires one.
- Put Inertia pages in `app/frontend/pages` and reusable React components in `app/frontend/components`.
- Use Mantine components and theme tokens before adding custom UI primitives or global CSS.
- Keep domain logic in Ruby models or dedicated service objects, not in React components.
- Use background jobs only for work that is genuinely slow or must be retried.

## Development conventions

- Use TypeScript for new frontend code.
- Keep controllers thin and validate all server-side input.
- Prefer small, focused components and conventional Rails resource routes.
- Add database indexes only where query patterns justify them; avoid premature optimization.
- Never commit secrets, `.env` files, Rails key files, `node_modules`, logs, temporary files, or Vite build output.
- Update this file when the product scope or architectural decisions materially change.

## Common commands

```bash
bin/setup
bin/dev
npm run check
bin/rails test
bin/vite build
```
