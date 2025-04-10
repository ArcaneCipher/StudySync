# **StudySync – Project Summary Roll-Up**

## **Concept**

**StudySync** is a full-stack web app that helps users set learning goals, track study time, and retain knowledge through flashcards powered by a spaced repetition algorithm. It combines productivity, habit-building, and smart learning tools with future-ready social and gamified features.

---

## **Capstone Project Tech Stack**

| Layer              | Stack                                                |
| ------------------ | ---------------------------------------------------- |
| **Frontend**       | React (Vite) + Redux (for global state management)   |
| **Backend**        | Ruby on Rails (API-only mode)                        |
| **Database**       | PostgreSQL                                           |
| **Auth**           | bcrypt + session token strategy                      |
| **JSON Handling**  | JBuilder (for structured JSON responses from Rails)  |
| **Notifications**  | Cron/Firebase (reserved for Tier 2+)                 |
| **AI Integration** | OpenAI API (_Tier 3 Stretch only_)                   |
| **Deployment**     | Localhost for MVP demo; (stretch: Vercel/Render later) |

---

## **Design & Architecture Principles**

- Modular frontend components (e.g., DeckCard, ReviewPanel, GoalTracker)

- RESTful JSON API with clear naming and structure

- Normalized relational DB schema for scalability

- Activity logging for future feeds, XP, and gamification

- Extensible model design to support public/private content, social interaction, and flexible tagging

---

## **MVP Scope**

### Core Features

- **User Authentication** (Sign up, login, session handling)

- **Learning Goals CRUD** (Title, progress, duration tracking)

- **Flashcard & Deck Management**

- **Spaced Repetition Algorithm** (Simple scheduling logic)

- **Review Queue** (Daily prioritized cards to study)

- **Progress Dashboard** (Time studied, streaks, progress graphs)

- **Extensible Data Models** to support public/private content, tagging, and activity logging

## **Stretch Goals (Tiered)**

### **Tier 1 – Foundational Stretch**

- Account Settings (Preferences, timezone, notifications)

- Tagging System (Decks/goals with filterable tags)

- Daily Review Mode (Consolidated dashboard)

- Public Deck Sharing

- Search Bar for Decks

- Public Profiles (Lite)

### **Tier 2 – Social & Engagement**

- Followers / Friends

- Reactions (Like/thumbs-up on decks or goals)

- Social Feed (Activity timeline for public/shared actions)

- XP & Leveling System

- Badges & Achievements

- Reminders/Notifications (Daily prompt to review)

- Toggleable privacy settings for public activity/goals

### **Tier 3 – Advanced Functionality**

- Quests & Challenges

- Comments (Flat, on decks or reflections)

- Media in Flashcards (Images/audio)

- Markdown in Cards

- Reflections / Study Journaling

- Visual Timeline of Activity

- AI-Generated Flashcards (OpenAI-based)

- Mobile PWA or native mobile wrapper (Expo) for push notifications + offline mode

---

## User Stories

These are structured using the standard format:

> As a **_[user type]_**, I want to **_[do something]_**, so that **_[goal/value]_**.

---

### **MVP User Stories**

#### **Authentication & User Account**

- As a new user, I want to sign up with a username, email, and password, so I can start tracking my learning.

- As a returning user, I want to log in securely, so I can access my saved goals and flashcards.

- As a user, I want to stay logged in during a session, so I don’t have to keep re-entering my credentials.

#### **Learning Goals**

- As a user, I want to create learning goals, so I can stay focused on what I want to learn.

- As a user, I want to edit and delete my goals, so I can keep them relevant and up to date.

- As a user, I want to track time spent on each goal, so I can measure my progress.

#### **Flashcards & Decks**

- As a user, I want to create decks and add flashcards to them, so I can organize my study content.

- As a user, I want to view my decks and flashcards, so I can manage and review them easily.

- As a user, I want to delete or update flashcards and decks, so I can clean up or improve my study materials.

#### **Spaced Repetition**

- As a user, I want cards to be scheduled based on how well I remember them, so I review harder ones more frequently.

- As a user, I want to rate how easy or hard each card is after a review, so the app can adjust the review interval.

#### **Review Queue**

- As a user, I want to see a daily list of cards due for review, so I can stay on top of my study schedule.

- As a user, I want to review flashcards in a focused study mode, so I can concentrate without distractions.

#### **Progress Dashboard**

- As a user, I want to see a dashboard showing study time and goal progress, so I can understand how I’m doing.

- As a user, I want to see a visual streak tracker, so I stay motivated to study consistently.

#### **Extensibility & Private/Public Design**

- As a user, I want my content to be private by default, so I can control what I share later.

- As a developer, I want the data models to support tagging, sharing, and logging, so future features can be added without rewriting core logic.

---

### **Tier 1 – Foundational Stretch User Stories**

#### **Account Settings**

- As a user, I want to update my timezone, so reminders and review schedules are aligned.

- As a user, I want to customize preferences (e.g. notification frequency), so I can personalize the app experience.

#### **Tagging**

- As a user, I want to add tags to decks and goals, so I can organize them by topic or subject.

- As a user, I want to filter decks and goals by tags, so I can quickly find what I’m looking for.

#### **Daily Review Mode**

- As a user, I want to view all my tasks for the day in one place (goals, cards, reminders), so I can focus my study session.

#### **Public Deck Sharing**

- As a user, I want to mark a deck as public, so others can view and use it.

- As a user, I want to browse and search public decks, so I can find useful study materials created by others.

#### **Public Profiles (Lite)**

- As a user, I want a basic profile page with my username, avatar, and shared content, so others can see what I’ve shared.

---

### **Tier 2 – Social & Engagement User Stories**

#### **Followers / Friends**

- As a user, I want to follow other users, so I can track their shared progress and study habits.

- As a user, I want to see who follows me, so I can build learning communities.

#### **Reactions**

- As a user, I want to react to a shared deck or goal (e.g. like), so I can show support or appreciation.

#### **Social Feed**

- As a user, I want to see updates from people I follow (e.g., new decks, streaks, completed goals), so I can stay connected and inspired.

#### **XP & Leveling**

- As a user, I want to earn XP for studying and completing goals, so I feel rewarded for my effort.

- As a user, I want to level up as I gain XP, so I have a sense of progression.

#### **Reminders/Notifications**

- As a user, I want to receive a reminder if I have cards or goals due today, so I don’t forget to study.

#### **Badges & Achievements**

- As a user, I want to unlock badges for hitting milestones (e.g. 7-day streak, 100 flashcards reviewed), so I feel proud of my progress.

---

### **Tier 3 – Advanced Functionality User Stories**

#### **Quests & Challenges**

- As a user, I want to complete daily or weekly study challenges, so I stay motivated and consistent.

- As a user, I want to earn bonus XP for completing challenges, so I’m incentivized to push harder.

#### **Comments**

- As a user, I want to leave comments on public decks or reflections, so I can give feedback or ask questions.

#### **Media in Flashcards**

- As a user, I want to add images or audio to flashcards, so I can create richer, more memorable study content.

### **Markdown in Cards**

- As a user, I want to format flashcards using markdown, so I can include bold, italics, code, or bullet points.

### **Reflections / Journaling**

- As a user, I want to write daily or goal-specific study reflections, so I can track thoughts and consolidate learning.

### **Timeline of Activity**

- As a user, I want to see a visual timeline of my study activity and milestones, so I can look back on my progress.

### **AI Flashcard Generation**

- As a user, I want the app to suggest flashcards based on my notes or reflections, so I can save time and focus on learning.

---

## Proposed Backend Routes

We'll use **Rails API conventions**, keeping it RESTful wherever possible.

---

### **MVP API Routes – StudySync**

#### **Authentication / Sessions**

|Verb|Route|Purpose|
|---|---|---|
|POST|`/signup`|Create new user account|
|POST|`/login`|Authenticate user & start session|
|DELETE|`/logout`|End user session (client-side token clearance)|
|GET|`/me`|Get current logged-in user info|

---

#### **Users**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/users/:id`|(Optional) Show user profile (for public decks later)|

---

#### **Learning Goals**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/goals`|List all goals for the logged-in user|
|GET|`/goals/:id`|View a specific goal|
|POST|`/goals`|Create a new goal|
|PUT|`/goals/:id`|Update a goal (title, progress, etc.)|
|DELETE|`/goals/:id`|Delete a goal|

---

#### **Decks & Flashcards**

##### Decks

|Verb|Route|Purpose|
|---|---|---|
|GET|`/decks`|List all decks for the logged-in user|
|GET|`/decks/:id`|View a specific deck and its cards|
|POST|`/decks`|Create a new deck|
|PUT|`/decks/:id`|Update deck title/description|
|DELETE|`/decks/:id`|Delete a deck|

##### Flashcards (Nested under decks)

|Verb|Route|Purpose|
|---|---|---|
|POST|`/decks/:deck_id/flashcards`|Add a flashcard to a deck|
|PUT|`/flashcards/:id`|Update a flashcard|
|DELETE|`/flashcards/:id`|Delete a flashcard|

---

#### **Study Sessions**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/study_sessions`|List sessions for dashboard display|
|POST|`/study_sessions`|Log a new study session (manual entry)|

> Notes: These are tied to a goal, so we could optionally use nested routes like `/goals/:goal_id/study_sessions`.

---

#### **Spaced Repetition & Review Queue**

##### Flashcard Reviews

|Verb|Route|Purpose|
|---|---|---|
|POST|`/flashcard_reviews`|Log a review session for a specific card|
|GET|`/review_queue`|Get today’s due cards for the user|

> `flashcard_reviews` table will include `flashcard_id`, `ease_rating`, and `next_due_date`.

---

#### **Progress Dashboard**

| Verb | Route        | Purpose                                               |
| ---- | ------------ | ----------------------------------------------------- |
| GET  | `/dashboard` | Get aggregate data: streak, hours studied, goal stats |

> Optional: Break this down into parts later (e.g., `/dashboard/streak`, `/dashboard/goals`)

---

#### Summary of MVP Controllers

We’ll likely have these Rails controllers:

- `UsersController`

- `SessionsController` (or `AuthController`)

- `GoalsController`

- `DecksController`

- `FlashcardsController`

- `StudySessionsController`

- `FlashcardReviewsController`

- `DashboardController` (or a service object behind the scenes)

---

### **Tier 1 API Routes – Foundational Stretch**

These routes support: **account settings, tagging, daily review mode, public decks, and public profiles**.

---

#### **Account Settings**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/settings`|Get current user settings (e.g. timezone)|
|PUT|`/settings`|Update settings/preferences|

> These can be stored in a `user_settings` table or embedded in the `users` model depending on app design.

---

#### **Tagging System**

##### Tags (Managed by users, used for filtering)

|Verb|Route|Purpose|
|---|---|---|
|GET|`/tags`|Get list of tags for filtering|
|POST|`/tags`|Create a new tag|
|DELETE|`/tags/:id`|Delete a tag|

##### Tag Assignments (Polymorphic join model)

|Verb|Route|Purpose|
|---|---|---|
|POST|`/taggings`|Add a tag to a deck or goal|
|DELETE|`/taggings/:id`|Remove a tag from a deck or goal|

---

#### **Daily Review Mode**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/daily_review`|Return summary of tasks for today (cards, goals, reminders)|

---

#### **Public Deck Sharing**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/public_decks`|View all public decks from all users|
|GET|`/public_decks/:id`|View a specific public deck|

> These are read-only versions of user decks marked as `is_public: true`.

---

#### **Public Profiles (Lite)**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/profiles/:id`|View a user’s public profile, shared goals and decks|

---

##### Summary of Tier 1 Controllers

We’ll likely extend existing or add:

- `SettingsController` (or extend `UsersController`)

- `TagsController`

- `TaggingsController`

- `PublicDecksController` _(or scoped from `DecksController`)_

- `ProfilesController`

- `DailyReviewController`

---

### **Tier 2 API Routes – Social & Engagement**

---

#### **Followers / Friends**

|Verb|Route|Purpose|
|---|---|---|
|POST|`/followings`|Follow a user|
|DELETE|`/followings/:id`|Unfollow a user|
|GET|`/followers`|Get list of users following me|
|GET|`/following`|Get list of users I’m following|

> This uses a join table like `Followings` with `follower_id` and `followed_id`.

---

#### **Reactions**

|Verb|Route|Purpose|
|---|---|---|
|POST|`/reactions`|React to a goal or deck|
|DELETE|`/reactions/:id`|Remove a reaction|

> Reactions are polymorphic (e.g., deck, goal, reflection) and may include a `reaction_type` or emoji.

---

#### **Social Feed**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/feed`|Return recent activity from users I follow|

> Powered by an `ActivityLog` model tracking public actions.

---

#### **XP & Leveling**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/xp`|Get current XP total and level|
|GET|`/xp/history`|View XP earned from recent actions|

> XP may be calculated via background jobs or updated live on certain actions.

---

#### **Reminders / Notifications**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/notifications`|List unread or recent notifications|
|PUT|`/notifications/:id`|Mark a notification as read|
|DELETE|`/notifications/:id`|Remove a notification|

> These could be triggered by cron jobs or user interactions (e.g., streak broken, review due).

---

#### **Badges & Achievements**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/badges`|View all available badges|
|GET|`/my_badges`|View badges earned by the current user|

> `Badges` is static content; `UserBadges` is a join table for earned achievements.

---

##### Summary of Tier 2 Controllers

We may implement or extend:

- `FollowingsController`

- `ReactionsController`

- `FeedController` (or use `ActivitiesController`)

- `XPController`

- `NotificationsController`

- `BadgesController`, `UserBadgesController`

---

### **Tier 3 API Routes – Advanced Functionality**

These routes support journaling, media-rich flashcards, advanced formatting, challenges, comments, activity timelines, and AI integration.

---

#### **Quests & Challenges**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/challenges`|View current available quests/challenges|
|POST|`/challenges/:id/complete`|Log completion of a challenge by the user|

> Challenges could be daily, weekly, or milestone-based; tracked in a `UserChallenges` join table.

---

#### **Comments**

|Verb|Route|Purpose|
|---|---|---|
|POST|`/comments`|Post a comment on a deck or reflection|
|DELETE|`/comments/:id`|Delete a comment (owner only)|
|GET|`/comments?target_id=&type=`|Fetch comments for a specific object|

> Polymorphic structure: `commentable_type` = "Deck", "Reflection", etc.

---

#### **Media in Flashcards**

|Verb|Route|Purpose|
|---|---|---|
|POST|`/media_uploads`|Upload image or audio for a card|
|GET|`/media/:id`|Retrieve uploaded media|

> Actual media hosting may use ActiveStorage or a 3rd-party like Cloudinary.

---

#### **Markdown in Cards**

Handled via frontend rendering and markdown parsing (e.g., `react-markdown`), so **no dedicated route** is needed beyond storing the `text` in the existing `flashcards` table.

---

#### **Reflections / Journaling**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/reflections`|List reflections (personal or public)|
|POST|`/reflections`|Create a new reflection entry|
|GET|`/reflections/:id`|View a specific reflection|
|DELETE|`/reflections/:id`|Remove a reflection|

---

#### **Timeline of Activity**

|Verb|Route|Purpose|
|---|---|---|
|GET|`/timeline`|Chronological list of user activity|

> Can be built from the same `ActivityLog` used in the social feed.

---

#### **AI-Generated Flashcards**

|Verb|Route|Purpose|
|---|---|---|
|POST|`/ai/generate_cards`|Submit text to generate flashcard suggestions|

> Uses OpenAI API to parse input and return card data. Could require rate-limiting or credits.

---

##### Summary of Tier 3 Controllers

- `ChallengesController`, `UserChallengesController`

- `CommentsController`

- `MediaUploadsController`

- `ReflectionsController`

- `TimelineController`

- `AIController` (for proxying OpenAI requests)
