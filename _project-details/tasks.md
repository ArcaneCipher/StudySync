# StudySync Tasks

---

## StudySync Project Management & Support Tasks

| Task | Category | Label |
|------|----------|-------|
| Create and share project roadmap with milestones | MVP Feature | Team Planning |
| Host project kickoff meeting to align roles & responsibilities | MVP Feature | Team Planning |
| Break down wireframes and user stories into component architecture | MVP Feature | Team Planning |
| Assign feature ownership across the team (auth, goals, flashcards, etc.) | MVP Feature | Team Planning |
| Set up frontend test framework (Jest + React Testing Library) | MVP Feature | Testing |
| Set up backend test framework (RSpec with request specs) | MVP Feature | Testing |
| Write integration tests for login/signup flow | MVP Feature | Testing |
| Write test coverage for goal and deck CRUD API endpoints | MVP Feature | Testing |
| Build initial wireframes for all MVP flows (login, goals, review, dashboard) | MVP Feature | UX/UI |
| Define global design system (fonts, buttons, spacing) | MVP Feature | UX/UI |
| Create reusable UI components (e.g. Card, Button, Input) | MVP Feature | UX/UI |
| Create README with setup instructions and architecture overview | MVP Feature | Deployment |
| Build Postman collection or API docs for testing endpoints | MVP Feature | Deployment |
| Create scripts to reset and seed the local DB | MVP Feature | Deployment |
| Test MVP flow end-to-end before milestone demo | MVP Feature | Deployment |
| Set up GitHub branch naming and PR conventions | MVP Feature | Dev Workflow |
| Enable Prettier/ESLint for consistent formatting | MVP Feature | Dev Workflow |
| Review & merge MVP PRs daily or at standup | MVP Feature | Dev Workflow |

---

## MVP Tasks

| Task | Category | Label |
|------|----------|-------|
| Initialize PostgreSQL DB and environment variables | MVP Feature | Setup & Configuration |
| Install and configure JBuilder for Rails API responses | MVP Feature | Setup & Configuration |
| Set up Redux store and slices for auth, goals, decks | MVP Feature | Setup & Configuration |
| Configure frontend routing with React Router | MVP Feature | Setup & Configuration |
| Build user model and auth controllers (signup, login, logout) | MVP Feature | Authentication |
| Implement session handling with bcrypt and cookies | MVP Feature | Authentication |
| Create auth state handling in Redux (login/logout/signup flow) | MVP Feature | Authentication |
| Build login/signup pages (frontend UI) | MVP Feature | Authentication |
| Generate Goal model and controller with CRUD actions | MVP Feature | Goals |
| Create Goals slice in Redux and API hooks | MVP Feature | Goals |
| Design and implement GoalsList and GoalForm components | MVP Feature | Goals |
| Display goals on dashboard with progress tracking | MVP Feature | Goals |
| Create StudySession model and controller | MVP Feature | Study Sessions |
| Implement session tracking with goal relation | MVP Feature | Study Sessions |
| Add Study Session logging UI and Redux actions | MVP Feature | Study Sessions |
| Generate Deck and Flashcard models with associations | MVP Feature | Decks & Flashcards |
| Create DecksController and FlashcardsController with CRUD | MVP Feature | Decks & Flashcards |
| Add Decks and Flashcards Redux slices | MVP Feature | Decks & Flashcards |
| Build UI for deck list, deck view, flashcard management | MVP Feature | Decks & Flashcards |
| Implement FlashcardReview model and controller | MVP Feature | Review Queue |
| Develop spaced repetition logic (basic SRS) | MVP Feature | Review Queue |
| Create review queue endpoint and UI display | MVP Feature | Review Queue |
| Build review mode flow and flashcard rating interaction | MVP Feature | Review Queue |
| Create DashboardController to aggregate stats | MVP Feature | Dashboard |
| Display dashboard with study time, goals, streaks (frontend) | MVP Feature | Dashboard |
| Design DB schema to support public/private content | MVP Feature | Extensibility |
| Prepare models for tagging/logging extensibility (future tiers) | MVP Feature | Extensibility |
| Seed DB with sample users, goals, decks, and flashcards | MVP Feature | Final Touches |
| Write frontend unit tests for components | MVP Feature | Final Touches |
| Write backend request specs for API routes | MVP Feature | Final Touches |
| Polish responsive layout for mobile/tablet views | MVP Feature | Final Touches |

---

## Tier 1 Stretch Tasks

| Task | Category | Label |
|------|----------|-------|
| Create user_settings table and model | Stretch Feature | Account Settings |
| Build SettingsController with show/update actions | Stretch Feature | Account Settings |
| Build settings form on frontend (timezone, notification prefs) | Stretch Feature | Account Settings |
| Wire Redux state and API calls for updating user settings | Stretch Feature | Account Settings |
| Create tags and taggings tables (polymorphic join) | Stretch Feature | Tagging |
| Build TagsController and TaggingsController | Stretch Feature | Tagging |
| Build tag input UI for decks and goals (multi-select or tagbox) | Stretch Feature | Tagging |
| Implement tag filtering view for decks/goals | Stretch Feature | Tagging |
| Create DailyReviewController with summary logic | Stretch Feature | Daily Review Mode |
| Build daily review view on frontend (goals, cards due, reminders) | Stretch Feature | Daily Review Mode |
| Design and display review priority in dashboard | Stretch Feature | Daily Review Mode |
| Add deck index route for public view (`/public_decks`) | Stretch Feature | Public Decks |
| Filter public decks based on `is_public: true` | Stretch Feature | Public Decks |
| Build UI for browsing/searching public decks | Stretch Feature | Public Decks |
| Build ProfilesController with basic show action | Stretch Feature | Public Profiles |
| Create public profile view with avatar, username, shared decks | Stretch Feature | Public Profiles |

---

## Tier 2 Stretch Tasks

| Task | Category | Label |
|------|----------|-------|
| Create followings table (self-referential user-user) | Stretch Feature | Followers / Friends |
| Build FollowingsController for follow/unfollow actions | Stretch Feature | Followers / Friends |
| Build frontend follow/unfollow buttons and following lists | Stretch Feature | Followers / Friends |
| Create reactions table and model (polymorphic) | Stretch Feature | Reactions |
| Build ReactionsController to add/remove reactions | Stretch Feature | Reactions |
| Add frontend reaction UI to public decks/goals | Stretch Feature | Reactions |
| Create activity_logs table to track user actions | Stretch Feature | Social Feed |
| Build FeedController to return recent followed activity | Stretch Feature | Social Feed |
| Build frontend social feed component (timeline style) | Stretch Feature | Social Feed |
| Create badges and user_badges tables | Stretch Feature | XP & Leveling |
| Create xp_logs table for XP tracking | Stretch Feature | XP & Leveling |
| Implement XP logic for goal creation, reviews, streaks | Stretch Feature | XP & Leveling |
| Display XP, levels, and recent XP history in profile/dashboard | Stretch Feature | XP & Leveling |
| Create notifications table (deferred from MVP) | Stretch Feature | Notifications |
| Build NotificationsController with list/mark-read actions | Stretch Feature | Notifications |
| Build frontend notification dropdown or page | Stretch Feature | Notifications |
| Implement notification triggers for due reviews, streaks, etc. | Stretch Feature | Notifications |
| Build BadgesController to list available/earned badges | Stretch Feature | Badges & Achievements |
| Display earned badges on public profile and dashboard | Stretch Feature | Badges & Achievements |

---

## Tier 3 Stretch Tasks

| Task | Category | Label |
|------|----------|-------|
| Create reflections table and model | Stretch Feature | Reflections / Journaling |
| Build ReflectionsController with CRUD actions | Stretch Feature | Reflections / Journaling |
| Build UI for writing and browsing reflections | Stretch Feature | Reflections / Journaling |
| Create comments table (polymorphic) | Stretch Feature | Comments |
| Build CommentsController for CRUD on decks/reflections | Stretch Feature | Comments |
| Build frontend comment components and display areas | Stretch Feature | Comments |
| Create media_uploads table and model | Stretch Feature | Media in Flashcards |
| Configure media upload (image/audio) to local or cloud storage | Stretch Feature | Media in Flashcards |
| Add media fields to flashcard editor | Stretch Feature | Media in Flashcards |
| Display images/audio in review mode and deck view | Stretch Feature | Media in Flashcards |
| Support markdown rendering in flashcard front/back | Stretch Feature | Markdown in Cards |
| Use markdown editor or preview for flashcard editing | Stretch Feature | Markdown in Cards |
| Create challenges and user_challenges tables | Stretch Feature | Quests & Challenges |
| Build ChallengesController and challenge completion logic | Stretch Feature | Quests & Challenges |
| Add challenge list and progress view to dashboard | Stretch Feature | Quests & Challenges |
| Add visual timeline view to activity feed (timeline mode) | Stretch Feature | Timeline of Activity |
| Create ai_requests table for logging flashcard generations | Stretch Feature | AI Flashcard Generation |
| Build AIController to proxy OpenAI requests for flashcards | Stretch Feature | AI Flashcard Generation |
| Create frontend UI for submitting notes to AI and previewing results | Stretch Feature | AI Flashcard Generation |
