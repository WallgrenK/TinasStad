# TODO

## Admin Auth

- Move the admin/manager role check into one shared helper used by both route guards and UI hooks.
- Implement logout with `supabase.auth.signOut()` and invalidate protected admin route data after sign-out.
- Replace the login `setTimeout` with direct navigation after Supabase confirms the session.
- Add a Supabase password reset flow for the admin login page.
- Decide whether "Kom ihag mig" should control Supabase session persistence or remove the checkbox.

## Admin Data

- Replace remaining admin mock data with Supabase-backed route loaders.
- Add booking aggregates for customers so `totalBookings` and `lastBookingAt` are real.
- Persist customer notes to `public.customers.notes` instead of only local state.
- Connect dashboard KPI cards, recent activity, today's bookings, and latest leads to live data.

## UX And Errors

- Show explicit permission errors when a logged-in user lacks `admin` or `manager` role.
- Add loading and error states for protected routes and Supabase loaders.
- Audit form actions that currently show "kommer i nasta iteration" or "lokalt" and turn them into tracked backend tasks.
