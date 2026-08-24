# TechtGeng Technologies & Solutions Pvt. Ltd.

Static HTML/CSS/JavaScript website with Supabase as the product database, authentication and image storage.

## Setup
1. Create a Supabase project.
2. Open SQL Editor and run `supabase.sql`.
3. In Supabase Authentication -> Users, create the partner login.
4. Open `config.js` and paste the Supabase Project URL and publishable/anon key.
5. Push this folder to GitHub.
6. Import the GitHub repository into Vercel.

Partner uses `/admin.html` to login and add/edit/delete products. No coding is needed.

Do not put a Supabase service_role/secret key in frontend files.
