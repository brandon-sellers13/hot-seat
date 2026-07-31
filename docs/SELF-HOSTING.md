# Running your own instance

This is a checklist rather than an explanation. Follow it top to bottom and you will have a working deployment. If a step fails, the failure should tell you what to do; if it does not, that is a bug worth reporting.

Budget about forty minutes, most of which is waiting for a database to provision and filling in a Google form.

> **This checklist runs ahead of the build.** The repository currently contains the foundation, the corpus, and the published data contract, but not yet the application or the database migrations. Steps 1 through 5 work today and are worth doing early, because the Google credentials in step 4 take the longest and block nothing else. Steps 6 and 7 have nothing to deploy until the app shell lands. This notice comes down when the checklist has been followed end to end by somebody other than the author, which is the standard it is being held to.

## Before you start

You will need accounts with GitHub, [Supabase](https://supabase.com), [Netlify](https://netlify.com), [Google Cloud](https://console.cloud.google.com), and [OpenAI](https://platform.openai.com). The first three have free tiers that comfortably cover personal use. Google Cloud is free for what we use it for. OpenAI bills per token and is the only one that costs money.

You also need Node 24. The version is pinned in `.nvmrc`, so if you use a version manager, `nvm use` picks it up.

## 1. Fork and install

```bash
git clone https://github.com/YOUR-USERNAME/hot-seat.git
cd hot-seat
nvm use
npm install
```

## 2. Create the Supabase project

Sign in to the Supabase command line tool. This opens a browser and stores a credential locally.

```bash
npx supabase login
```

Create the project. Choose a region close to the people who will play, because the game measures how long you hesitate before typing and network latency contaminates that measurement. Use a password from your password manager rather than inventing one here.

```bash
npx supabase projects create hot-seat --region us-west-1 --db-password 'YOUR-PASSWORD'
```

Provisioning takes a couple of minutes. When it finishes, note the project reference, which is the string in the middle of your project URL, `https://<project-ref>.supabase.co`.

## 3. Apply the database schema and settings

```bash
npx supabase link --project-ref YOUR-PROJECT-REF
npx supabase db push
npx supabase config push --project-ref YOUR-PROJECT-REF
```

The middle command creates the tables and the row-level security policies that isolate one player's data from another's. The last one applies `supabase/config.toml`, which turns on anonymous sign-ins and manual identity linking.

Both of those settings are off in a new Supabase project and the game does not work without them. They are in the repository as configuration rather than written here as instructions precisely so that this step cannot be skipped by accident.

## 4. Set up Google sign-in

This is the only part that has to be done by hand in a browser. Google has no interface for creating these credentials programmatically. There is a `gcloud iam oauth-clients` command that looks like it should work, but it belongs to Workforce Identity Federation, which is a different product for letting a company's staff into Google Cloud.

Do this step after step 2, because one of the values you enter contains your Supabase project reference.

1. Go to the [Google Cloud console](https://console.cloud.google.com) and create a project.
2. Configure the consent screen. Choose the external user type. Fill in an application name, a support email, and a developer contact.
3. When it asks which scopes the application needs, select **only** `openid`, `email`, and `profile`. All three are classed as non-sensitive, which means your app publishes without going through Google's verification review. Adding a fourth scope triggers full verification and an annual review cycle, so treat it as a real decision rather than a default.
4. Create an OAuth client of the **Web application** type.
5. In the authorised redirect addresses, enter `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`. It has to match exactly, and a trailing slash counts as not matching. This is the single most common cause of a sign-in that fails at the last step.
6. Copy the client identifier and client secret into your Supabase project, under Authentication, then Providers, then Google.

If you want your own name and logo on the Google sign-in screen instead of a bare web address, that needs a lighter brand verification which is separate from the full review. It is polish, not a blocker, and it can wait until after launch.

## 5. Get an OpenAI API key

Go to [platform.openai.com](https://platform.openai.com), add a payment method, and create an API key.

**Set a monthly usage limit while you are in the billing section.** The application controls spending through session caps and a global daily ceiling, but that is code, and code can have bugs. A limit set in OpenAI's own dashboard sits outside the application and cannot be defeated by one. Treat it as the backstop rather than the primary control.

## 6. Deploy to Netlify

```bash
npx netlify login
npx netlify init
```

Then set the environment variables. The two marked sensitive can spend money or read every row in your database, so mark them as sensitive in Netlify's interface rather than leaving them readable.

| Variable | Where it comes from | Sensitive |
|---|---|---|
| `OPENAI_API_KEY` | Step 5 | **Yes** |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project API settings | **Yes** |
| `PUBLIC_SUPABASE_URL` | Your `https://<project-ref>.supabase.co` address | No, public by design |
| `PUBLIC_SUPABASE_ANON_KEY` | Supabase project API settings, labelled anon or publishable | No, public by design |
| `PUBLIC_SITE_URL` | Your deployed address | No |

The last two are genuinely meant to be public and appear in the browser on every page load. Marking them sensitive only makes them awkward to inspect later, and it protects nothing, because what actually keeps one player out of another player's rows is row-level security in the database.

Deploy:

```bash
npx netlify deploy --prod
```

## 7. Check it worked

Open your deployed address and confirm each of these:

1. The reference section loads and lets you search the corpus. This needs no account and no API key, so if it works, your build and deployment are fine.
2. You can complete a Daily without signing in. This proves anonymous sign-ins are on and the grading function can reach OpenAI.
3. Signing in with Google keeps the streak you just earned. This proves manual identity linking is on and your redirect address is right.

If the first works and the second does not, look at your OpenAI key and your function logs. If the first two work and the third does not, it is almost always the redirect address in step 4.

## Playing against your own numbers

That is a separate page: [YOUR-DATA.md](YOUR-DATA.md).

## What this costs to run

For personal use, effectively nothing beyond the model calls. Supabase and Netlify free tiers are ample for a single player, and the Daily costs a few cents a year per person.

A full Hot Seat session costs in the region of thirteen cents. If you open your instance to other people, that is the number that matters, because sessions are essentially the entire bill. The application ships with a per-user weekly session cap and a global daily ceiling for exactly this reason, and both are configuration rather than code changes. Tighten the session cap before you touch anything else.
