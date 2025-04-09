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
