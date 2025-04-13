# **Migration Commands**

Here’s a complete list of **Rails migration generator commands**, grouped by **MVP** and each Stretch Tier. They can copy-paste these directly into the terminal when generating migrations.

Each model includes appropriate fields and associations using Rails conventions (e.g., `user:references`).

---

## **MVP Migration Commands**

```bash
rails generate model User email:string password_digest:string username:string avatar_url:string timezone:string

rails generate model Goal user:references title:string description:text target_hours:float is_public:boolean

rails generate model StudySession user:references goal:references duration_min:integer notes:text

rails generate model Deck user:references title:string description:text is_public:boolean

rails generate model Flashcard deck:references front_text:text back_text:text image_url:string audio_url:string

rails generate model FlashcardReview user:references flashcard:references ease_rating:integer next_due:date reviewed_at:datetime
```

---

## **Tier 1 Migration Commands** _(Personalization & Sharing)_

```bash
rails generate model UserSetting user:references prefers_emails:boolean study_goal_min:integer timezone:string

rails generate model Tag name:string

rails generate model Tagging tag:references taggable:references{polymorphic}
```

---

## **Tier 2 Migration Commands** _(Social & Gamification)_

```bash
rails generate model Following follower:references followed:references
```

> before running `rails db:migrate` you will need to update the migration file for this one. This is because the Following table needs to generate two foreign keys to the same table (`users`).

You need to manually edit the migration to clarify:

```ruby
t.references :follower, foreign_key: { to_table: :users }
t.references :followed, foreign_key: { to_table: :users }
```

The file should look like this:

```ruby
class CreateFollowings < ActiveRecord::Migration[7.1]
  def change
    create_table :followings do |t|
      t.references :follower, null: false, foreign_key: { to_table: :users }
      t.references :followed, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
```

Now for the rest of the Tier 2 commands:

```bash
rails generate model Reaction user:references reactable:references{polymorphic} reaction_type:string

rails generate model ActivityLog user:references action_type:string reference:references{polymorphic}

rails generate model Notification user:references type:string message:string is_read:boolean

rails generate model Badge name:string description:text icon_url:string

rails generate model UserBadge user:references badge:references earned_at:datetime

rails generate model XpLog user:references source:references{polymorphic} amount:integer
```

---

## **Tier 3 Migration Commands** _(Advanced Features)_

```bash
rails generate model Reflection user:references goal:references content:text is_public:boolean

rails generate model Comment user:references commentable:references{polymorphic} body:text

rails generate model MediaUpload user:references flashcard:references file_url:string media_type:string

rails generate model Challenge name:string description:text type:string xp_reward:integer

rails generate model UserChallenge user:references challenge:references completed_at:datetime

rails generate model AiRequest user:references input_text:text output_data:text model_used:string
```

---

## Notes for Usage

- Begin generating and reviewing each migration file

- Run each command in your project directory to generate the corresponding migration file.

- Then run:

```bash
rails db:migrate
```

> after each tier (or all MVP at once, then test)

- If you want to test or verify the schema with schema state, use:

```bash
rails db:schema:dump
```

- Seed any necessary test data for development (next phase)
