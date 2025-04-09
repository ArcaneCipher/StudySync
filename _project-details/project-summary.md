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
