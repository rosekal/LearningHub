# LearnHub

LearnHub is a local-first Expo learning platform built for desktop web and mobile. The current seed content is:

- Subjects: Chemistry, Geology, Physics, Biology, Mathematics, Astronomy / Astrophysics, and Geography
- Chemistry topics: Elements plus 11 additional chemistry study paths
- Geology topics: 15 seeded geology study paths spanning foundations, minerals, tectonics, hazards, stratigraphy, paleontology, marine geology, environmental geology, and applied geology
- Additional subjects: seeded multi-topic libraries in Physics, Biology, Mathematics, Astronomy / Astrophysics, and Geography
- Learning units: all 118 chemical elements plus seeded concept units across seven subjects
- Structure per unit: 8 textbook-style chapters, flashcards, and quizzes

All study state is stored locally with AsyncStorage. There is no backend, auth flow, or external database.

## Run

Install dependencies:

```bash
npm install
```

Start the Expo dev server:

```bash
npx expo start
```

Open specific targets:

```bash
npx expo start --web
npx expo start --ios
npx expo start --android
```

Web works in desktop browsers such as Brave. Mobile works through Expo Go or a simulator/device connected to the Expo dev server.

## Web export

Build the static web version locally:

```bash
npm run build:web
```

That exports the web app to `dist/`, adds a `.nojekyll` file for GitHub Pages, and creates a `404.html` fallback from the exported `index.html`.

To preview a GitHub Pages-style project path locally, set `EXPO_BASE_URL` before building.

PowerShell:

```powershell
$env:EXPO_BASE_URL = "/learnhub"
npm run build:web
Remove-Item Env:EXPO_BASE_URL
```

Bash:

```bash
EXPO_BASE_URL=/learnhub npm run build:web
```

Replace `/learnhub` with your actual repository name if it differs.

## GitHub Pages deployment

This project is configured for a GitHub Pages project site such as:

- `https://<owner>.github.io/learnhub/`
- `https://<owner>.github.io/<repo-name>/`

The GitHub Actions workflow in `.github/workflows/deploy-pages.yml` will:

1. install dependencies
2. export the Expo web app as static files
3. apply the repository base path automatically
4. upload `dist/` to GitHub Pages
5. deploy on every push to `main`

### Manual GitHub steps

After pushing this project to GitHub:

1. Make sure your default deployment branch is `main`.
2. Open **Settings -> Pages** in the GitHub repository.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main`, or run the **Deploy GitHub Pages** workflow manually from the **Actions** tab.
5. Wait for the workflow to finish, then open the published Pages URL shown in the deployment job.

### Notes

- The workflow derives the project-site base path from the repository name automatically.
- If you rename the repository, the next deployment will use the new base path.
- Local mobile and web development are unchanged:
  - `npx expo start`
  - `npx expo start --web`
  - `npx expo start --ios`
  - `npx expo start --android`

## Architecture

Key folders:

- `app/`: Expo Router screens for home, subject, topic, unit, chapter, flashcards, and quiz flows
- `components/`: reusable UI building blocks such as `AppShell`, cards, breadcrumbs, flashcards, and quiz presentation
- `content/`: generalized learning schema plus seeded multi-subject content
- `features/learning/`: route and progress helpers
- `hooks/`: responsive/theme/store hooks
- `store/`: local persistence provider for completion, bookmarks, quiz scores, flashcard review state, and continue-learning data
- `theme/`: color, spacing, radius, typography, and navigation theme tokens
- `utils/`: formatting and route helpers

## Data model

The content model is intentionally subject-agnostic and is defined in `content/schema.ts`.

Core types:

- `Subject`
- `Topic`
- `LearningUnit`
- `Chapter`
- `ContentBlock`
- `ParagraphBlock`
- `BulletListBlock`
- `FigureContentBlock`
- `Flashcard`
- `QuizQuestion`
- `QuizOption`
- `QuizResult`
- `StudyProgress`
- `Bookmark`
- `ContinueLearningState`

Chemistry uses `LearningUnit` instances whose `kind` is `"element"`, but the app does not treat elements as the universal model.

## Add more subjects later

1. Create a new seeded file under `content/subjects/<subject-name>/`.
2. Build `Topic` and `LearningUnit` arrays that follow the shared schema.
3. Export the new subject and add it to `content/catalog.ts`.
4. Reuse the existing screens. Home, subject, topic, unit, chapter, flashcards, and quiz pages already read generic content types.

## Add more chemistry topics later

1. Add another `Topic` inside the Chemistry subject seed.
2. Provide `LearningUnit` data for that topic.
3. Ensure the new topic is included in the Chemistry subject export.
4. The subject page and topic routing will pick it up without structural refactoring.

## Persistence

LearnHub stores the following locally:

- completed chapters
- bookmarked chapters
- reviewed flashcards
- latest and best quiz scores
- last visited study location for continue-learning

## AI short-answer quiz mode

The quiz screen now includes an optional AI short-answer mode alongside the existing local multiple-choice quiz.

What it does:

- sends the current chapter text to the OpenAI Responses API
- generates 5 short-answer questions for that chapter session
- evaluates each learner response with the same API
- stores the resulting chapter score locally using the existing quiz persistence flow

How to enable it:

1. Open any chapter quiz screen.
2. Switch to `AI Short Answer`.
3. Enter an OpenAI API key on the screen and optionally save it locally on that device/browser.
4. Generate the 5-question session.

Optional local dev environment variables:

```bash
EXPO_PUBLIC_OPENAI_API_KEY=your_key_here
EXPO_PUBLIC_OPENAI_MODEL=gpt-4.1-mini
```

Important:

- The standard quiz remains available and still works offline.
- The AI short-answer mode requires internet access.
- This app currently calls the OpenAI API directly from the client in AI mode.
- That is acceptable for personal/local testing, but not for a public production deployment.
- For a public deployment, proxy OpenAI requests through your own server so the API key is not exposed to end users.

## Validation

The current project passes:

```bash
npm run lint
npx tsc --noEmit
```
