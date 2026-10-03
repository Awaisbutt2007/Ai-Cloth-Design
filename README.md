# Ai-Cloth-Design

## Private Super Admin

The sidebar's Super Admin link is shown only to the signed-in account `buttawais2000@gmail.com`. The `public.admin_dashboard()` database function independently checks the verified JWT email before it returns the Auth user list or database counts. It uses a fixed owner allowlist and grants function execution only to authenticated users.

To enable the live dashboard for the linked Supabase project:

1. Run the updated `supabase-schema.sql` in the Supabase SQL Editor. This creates the RLS-protected `download_events` table and owner-checked `admin_dashboard()` function.
2. Reload the website and click **Super Admin** at the top of the sidebar.

The dashboard reports registered accounts, published designs, and tracked signed-in design downloads. Downloads made before this tracking was added are not available retroactively. Browser app installs are not reported: this website has no install telemetry, and a browser visit cannot prove an app installation.