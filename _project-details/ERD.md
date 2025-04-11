# Entity Relationship Diagrams

## Core MVP ERD Tables

These tables support: auth, learning goals, flashcards, spaced repetition, progress tracking, reminders.

---

### **1. `users`**

|Field|Type|Notes|
|---|---|---|
|id|UUID/Serial|Primary Key|
|email|String|Unique|
|password_digest|String|Devise default (or bcrypt)|
|username|String|Display name|
|avatar_url|String|Optional|
|timezone|String|For scheduling/reminders|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **2. `goals`**

|Field|Type|Notes|
|---|---|---|
|id|UUID/Serial|Primary Key|
|user_id|FK|Belongs to `users`|
|title|String||
|description|Text|Optional|
|target_hours|Float|Optional goal|
|is_public|Boolean|For shared/public goals|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **3. `study_sessions`**

|Field|Type|Notes|
|---|---|---|
|id|UUID/Serial|Primary Key|
|user_id|FK|Belongs to `users`|
|goal_id|FK|Tied to a goal|
|duration_min|Integer|How long they studied|
|notes|Text|Optional reflections|
|created_at|Timestamp|Used for streaks/progress tracking|
|updated_at|Timestamp||

---

### **4. `decks`**

|Field|Type|Notes|
|---|---|---|
|id|UUID/Serial|Primary Key|
|user_id|FK|Belongs to `users`|
|title|String||
|description|Text|Optional|
|is_public|Boolean|For sharing|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **5. `flashcards`**

|Field|Type|Notes|
|---|---|---|
|id|UUID/Serial|Primary Key|
|deck_id|FK|Belongs to `decks`|
|front_text|Text||
|back_text|Text||
|image_url|String|Stretch: media in cards|
|audio_url|String|Stretch|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **6. `flashcard_reviews`**

|Field|Type|Notes|
|---|---|---|
|id|UUID/Serial|Primary Key|
|user_id|FK|Who reviewed it|
|flashcard_id|FK|Reviewed card|
|ease_rating|Enum/Int|E.g., 1–3 (Again/Hard/Easy)|
|next_due|Date|When to show again|
|reviewed_at|Timestamp|When it was reviewed|
|created_at|Timestamp||
|updated_at|Timestamp||

> This is the heart of the **spaced repetition system**.

---

### **7. `notifications`**

|Field|Type|Notes|
|---|---|---|
|id|UUID/Serial|Primary Key|
|user_id|FK||
|type|String|E.g., `review_reminder`, `streak_loss`|
|message|String||
|is_read|Boolean||
|created_at|Timestamp||
|updated_at|Timestamp||

---

## **Tier 1 ERD – Personalization & Sharing**

These tables support:

- Account preferences

- Tagging and filtering

- Daily review summary

- Public decks

- Public profile data views

---

### **1. `user_settings`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|Belongs to `users`|
|prefers_emails|Boolean|Whether the user wants email reminders|
|study_goal_min|Integer|Daily study time goal in minutes (optional)|
|timezone|String|Override or supplement `users.timezone`|
|created_at|Timestamp||
|updated_at|Timestamp||

> Alternative: Could be merged into `users` if kept simple, but a separate table is cleaner for modularity.

---

### **2. `tags`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|name|String|Unique per user or global scope|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **3. `taggings`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|tag_id|FK|Belongs to `tags`|
|taggable_id|UUID|Polymorphic: deck or goal|
|taggable_type|String|`"Deck"` or `"Goal"`|
|created_at|Timestamp||
|updated_at|Timestamp||

> This supports **tag-based filtering**, and can later expand to `reflections`, `flashcards`, etc.

---

### **4. `public_decks_view`** (Virtual, no table needed)

Deck sharing is managed by:

- `decks.is_public: boolean` (already in MVP)

- Route/controller layer filters out only `is_public: true` decks for browsing

> No new table needed. Just ensure **scoped controller methods** and optional `user_id` filter support.

---

### **5. `public_profiles_view`** (Virtual or lightweight controller view)

Public profiles rely on:

- `users.username`, `avatar_url`

- Associated shared content (goals, decks) via:

  - `goals.is_public: true`

  - `decks.is_public: true`

> No new table required — just ensure these attributes are **exposed through `/profiles/:id`**.

---

### **6. `daily_review_summary`** (Virtual service)

This is **not a new table** — it pulls from:

- `flashcard_reviews` (cards due)

- `study_sessions` (for today)

- `goals` (progress toward study time)

> Handled by controller/service logic behind `/daily_review`, not in schema.

---

## **Tier 2 ERD – Social & Engagement**

These tables support:

- Followers and user relationships

- Reactions (likes, emoji responses)

- Activity feed

- XP system

- Notifications

- Badges and achievements

---

### **1. `followings`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|follower_id|FK (User)|The user doing the following|
|followed_id|FK (User)|The user being followed|
|created_at|Timestamp||
|updated_at|Timestamp||

> **Self-referential join table** for users following each other.

---

### **2. `reactions`** _(Polymorphic)_

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|User who reacted|
|reactable_id|UUID|Target object ID (deck, goal, etc.)|
|reactable_type|String|`"Deck"`, `"Goal"`, `"Reflection"`|
|reaction_type|String|e.g. `"like"`, `"fire"`, `"clap"`|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **3. `activity_logs`** _(For feed and timeline)_

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|The user who performed the action|
|action_type|String|e.g., `created_deck`, `completed_goal`|
|reference_id|UUID|ID of related object|
|reference_type|String|Polymorphic type: `"Deck"`, `"Goal"`, etc.|
|created_at|Timestamp|When the action occurred|
|updated_at|Timestamp||

---

### **4. `notifications`** _(from Tier 2, previously deferred from MVP)_

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|Recipient|
|type|String|e.g., `"review_reminder"`, `"new_follower"`|
|message|String|Notification text|
|is_read|Boolean|Mark as read or unread|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **5. `badges`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|name|String|e.g., “7-Day Streak”|
|description|Text|What the badge is for|
|icon_url|String|Optional badge image/icon|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **6. `user_badges`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|User who earned the badge|
|badge_id|FK|The badge that was earned|
|earned_at|Timestamp|When it was earned|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **7. `xp_logs`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|User earning XP|
|source_type|String|e.g., `"StudySession"`, `"Goal"`|
|source_id|UUID|ID of the XP-generating event|
|amount|Integer|XP value earned|
|created_at|Timestamp|When XP was awarded|
|updated_at|Timestamp||

---

## **Tier 3 ERD – Advanced Functionality**

These support:

- Study journaling

- Challenges and quests

- Comments

- Media uploads

- Markdown formatting (already handled)

- Activity timeline (already covered)

- AI flashcard generation

---

### **1. `reflections`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|Belongs to `users`|
|goal_id|FK|Optional link to a `goal`|
|content|Text|Rich text (supports markdown)|
|is_public|Boolean|For sharing reflections|
|created_at|Timestamp|Timestamp for journaling|
|updated_at|Timestamp||

---

### **2. `comments`** _(Polymorphic)_

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|Comment author|
|commentable_id|UUID|ID of the thing being commented on|
|commentable_type|String|`"Deck"`, `"Reflection"`, etc.|
|body|Text|Comment text|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **3. `media_uploads`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|Belongs to `users`|
|flashcard_id|FK|Related flashcard|
|file_url|String|Path to hosted file (image/audio)|
|media_type|String|`"image"` or `"audio"`|
|created_at|Timestamp||
|updated_at|Timestamp||

> Supports flashcard enrichment. We can later migrate this to ActiveStorage or use Cloudinary/S3.

---

### **4. `challenges`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|name|String|e.g., “Study 3 days in a row”|
|description|Text|What the user must do|
|type|String|`"daily"`, `"weekly"`, `"custom"`|
|xp_reward|Integer|XP awarded on completion|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **5. `user_challenges`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|Belongs to `users`|
|challenge_id|FK|The completed challenge|
|completed_at|Timestamp|When the challenge was completed|
|updated_at|Timestamp||

---

### **6. `ai_requests`**

|Field|Type|Notes|
|---|---|---|
|id|UUID / Serial|Primary Key|
|user_id|FK|Who initiated the AI request|
|input_text|Text|Study notes or question prompt|
|output_data|JSON / Text|AI-generated flashcards|
|model_used|String|(Optional) OpenAI model or version|
|created_at|Timestamp||
|updated_at|Timestamp||

---

### **7. Timeline View**

> **Already covered by `activity_logs`** (Tier 2), filtered and presented chronologically.
