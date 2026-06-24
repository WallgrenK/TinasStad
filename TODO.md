# TODO

## Admin Auth
- Add a Supabase password reset flow for the admin login page.

## Admin Data

- Replace remaining admin mock data with Supabase-backed route loaders.
- Add booking aggregates for customers so `totalBookings` and `lastBookingAt` are real.
- Persist customer notes to `public.customers.notes` instead of only local state.
- Connect dashboard KPI cards, recent activity, today's bookings, and latest leads to live data.

## UX And Errors

- Show explicit permission errors when a logged-in user lacks `admin` or `manager` role.
- Add loading and error states for protected routes and Supabase loaders.
- Audit form actions that currently show "kommer i nasta iteration" or "lokalt" and turn them into tracked backend tasks.
