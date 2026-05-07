# Medent Jobs

Brief one-liner about the project.

## Live URL

https://medent-jobs.vercel.app/

## Setup, Run, and Test

### Prerequisites

- Node.js 18.18 or later
- npm 9 or later

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/Ch4seProjects/medent-jobs.git
   cd medent-jobs
```

2. Install dependencies:

```bash
   npm install
```

3. Copy the example environment file and fill in your values:

```bash
   cp .env.example .env.local
```

See `.env.example` for all available environment variables and their descriptions.

### Running the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app redirects to `/jobs` by default.

### Building for Production

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

### Running Tests

Run the full test suite:

```bash
npm run test
```

Run in watch mode during development:

```bash
npm run test -- --watch
```

Run a specific test file:

```bash
npm run test -- lib/jobs.test.ts
```

## Rendering Strategy

This project uses **SSG (Static Site Generation)** as the default rendering strategy, with the architecture already prepared for **ISR (Incremental Static Regeneration)** once a real external feed is plugged in.

### `/jobs` — Job Listings Index

Statically generated at build time. All jobs are fetched from the data layer during the build and rendered into a static page. Filtering is handled entirely on the client via URL query parameters (`?department=&type=`), so no server round-trip is needed when a user applies filters.

### `/jobs/[slug]` — Job Detail Pages

Statically generated at build time using `generateStaticParams`, which pre-renders a page for every known job slug. An unknown slug returns a 404 with the correct status code and metadata.

## Data Layer

### Current Setup

Job data is served from a local `data/jobs.json` fixture file, imported directly at build time. All data access flows through a single module — `lib/jobs.ts` — which is the only file that knows where the data comes from. Pages and components never import the fixture directly.

### Plugging in a Real External Feed

The data layer is designed so that swapping in a real external feed requires no changes to any page or component. Only two environment variables need to be set:

```bash
DATA_SOURCE=api
JOBS_API_URL=https://api.example.com
```

When `DATA_SOURCE=api`, `lib/jobs.ts` switches from reading the local fixture to fetching from the external feed:

```typescript
// Fetches all jobs from the external feed
GET ${JOBS_API_URL}/jobs

// Fetches a single job by slug
GET ${JOBS_API_URL}/jobs/:slug
```

The external feed is expected to return data that conforms to the `Job` type defined in `types/job.ts`.

### Analytics

### Current Implementation

Google Tag Manager is integrated using the official Next.js `@next/third-parties` package, which is the recommended approach as of Next.js 16. The GTM script is loaded in the root layout and the Apply button on each job detail page fires a tracking event on click using `sendGTMEvent`.

## Connecting to a Real GTM Implementation

To connect this to a live GTM container:

1. Set the GTM container ID in your environment:

```bash
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

2. In your GTM workspace, create a **Custom Event trigger** that fires on the event name `apply_click`.

3. Create a tag (e.g. GA4 Event) that fires on that trigger and maps the event parameters:
   - `job_id` → Job ID dimension
   - `job_title` → Job Title dimension
   - `job_department` → Department dimension
   - `job_location` → Location dimension
   - `job_type` → Employment Type dimension

4. Publish the GTM container.

No code changes are required on the Next.js side — `sendGTMEvent` pushes directly to `window.dataLayer`, which GTM listens to automatically once the container is live.

## Trade-offs

### Local JSON Fixture vs Next.js API Route

The job fixture data is read directly from `data/jobs.json` at build time rather than served through a Next.js API route. A dedicated API route would have added an unnecessary internal HTTP round-trip during the build with no real benefit, since the data is only consumed by the application itself. The trade-off is that the current setup has no runtime API endpoint for the job data. For the scope of this exercise, direct file access at build time is the simpler and more correct approach.

### Data Layer API Support via Environment Variables

The data layer supports switching between the local fixture and a real external feed via `DATA_SOURCE` and `JOBS_API_URL` environment variables. The trade-off of this approach is that it introduces a runtime conditional branch (`if DATA_SOURCE === "api"`) in the data layer, which slightly increases complexity. The alternative would have been to keep the fixture-only implementation simple and leave API integration as a next step. The environment variable approach was chosen because it directly demonstrates the decoupled data layer the exercise calls for, and makes the swap path explicit and documentable without requiring any code changes.

### Relative Posted Date vs Absolute Date

Job posted dates are displayed as relative time (e.g. "3d", "2w") rather than an absolute date (e.g. "April 1, 2026"). This is a common pattern on job boards and makes it immediately clear how fresh a listing is without the user doing mental arithmetic. The trade-off is that relative times are less precise and can feel stale if the page is statically cached for a long time.

### Generated OpenGraph Image vs Static Image

Each job detail page generates a dynamic OpenGraph image via `opengraph-image.tsx` using the Next.js `ImageResponse` API, including the job title, location, type, and salary. The alternative would have been a single static `/public/og-image.png` used across all pages, which is simpler but generic. The trade-off of the dynamic approach is added build complexity and a dependency on the `ImageResponse` rendering pipeline. However for a job board where listings are frequently shared on social media, a per-job OG image is significantly more useful — a shared link showing the actual job title and salary is far more likely to drive click-throughs than a generic site banner.

## Next Steps

Given more time, the following would be the priority additions:

- **Complete the full site** — the current implementation covers `/jobs` and `/jobs/[slug]`. A production site would include a homepage, about page, contact page, and potentially employer-facing pages.
- **Pagination or infinite scroll** — the current setup renders all jobs in a single list. This works for the fixture data but would not scale with a real feed containing hundreds of listings.
- **Richer filtering** — extend the current department and type filters with full-text search, sorting (e.g. most recent, salary), and salary range filtering.
- **Job expiry handling** — visually distinguish listings whose `closingDate` has already passed, and optionally suppress them from the default listing view.
- **Additional analytics events** — beyond the Apply button click, track filter interactions, job detail page views, and time spent on listings to give a fuller picture of candidate behaviour.
- **Error boundaries and loading states** — handle API fetch failures and slow responses gracefully in API mode, with meaningful fallback UI rather than an unhandled error.
- **Better generated OpenGraph images** — improve the typography, layout, and branding of the dynamically generated OG images, and add a fallback for when job data is unavailable.
- **Site-wide test coverage** — expand the current unit and integration tests to include component tests for `JobCard` and `JobFilters`, and end-to-end tests with Playwright covering the full filter and apply flow.

## Production Readiness

The current implementation satisfies the exercise requirements but several things would be vital before this could be considered production-ready:

### Real Job Feed

The site currently runs on a hardcoded local fixture. A real external feed with a stable API contract, authentication, and error handling would need to be in place before go-live.

### Environment Configuration

A production deployment would require these environment variables to be set:

- A real `NEXT_PUBLIC_SITE_URL` pointing to the live domain
- A live GTM container ID (`NEXT_PUBLIC_GTM_ID`) with configured triggers and tags
- A verified Google Search Console property (`NEXT_PUBLIC_GOOGLE_VERIFICATION_ID`)

### Security

- No rate limiting on any API routes

### Accessibility

No formal accessibility audit has been conducted. Keyboard navigation, screen reader compatibility, and ARIA labelling would need to be verified and fixed before launch.

### Monitoring and Alerting

No error monitoring (Sentry) or uptime alerting is in place. In API mode, a failing job feed would silently break the build or serve stale data with no visibility.

## AI Usage

AI tools were used selectively throughout this project, primarily for researching approaches, resolving specific technical issues, and accelerating boilerplate-heavy tasks. All AI-generated or AI-influenced output was reviewed, understood, and validated before being committed.

Specific areas where AI was consulted:

- **Architecture research** — researching the best approach for structuring a decoupled data layer that could support both local and external data sources
- **CSS and Tailwind behavior** — clarifying how Tailwind's `group-hover` utility works, CSS flexbox tricks for scrollable layouts, and complex responsive behavior across viewports
- **Filtering** — researching approaches for dynamic filter generation and reflecting filter state in URL query parameters
- **SEO and metadata** — pre-filling initial metadata values and diagnosing why nested `not-found.tsx` metadata was not being picked up correctly by the Next.js App Router
- **Canonical URLs** — understanding how static pages can still use `generateMetadata` dynamically when URL query parameters are involved
- **Open Graph images** — researching the best approach for generating per-job OG images using the Next.js `ImageResponse` API, and debugging a crash caused by emoji characters in location strings
- **Structured data** — researching the correct Schema.org `JobPosting` JSON-LD structure and required fields
- **Tests** — AI generated the initial structure and cases for both unit and integration tests, which were reviewed and validated against the actual implementation

All code — whether written manually or AI-assisted — was read, understood, and is something I can explain and defend in a technical interview.
