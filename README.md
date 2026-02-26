# PuppyLand — Full Product Requirements Document (PRD)

## 1. Problem Statement

Dog lovers who regularly encounter dogs in their daily lives have no meaningful way to log, remember, and track the breeds they meet. The experience of meeting a wonderful dog is fleeting — the breed name is forgotten within minutes, the photo gets buried in a camera roll with no context, and the moment disappears. Existing apps are breed encyclopaedias or one-time identification tools; none of them treat the experience of meeting dogs as something personal, cumulative, and worth collecting. The result is that a passionate, engaged audience — people who genuinely light up around dogs and want to deepen their relationship with that experience — has no product built for them. PuppyLand fills that gap by having a DogWiki DB. It turns every dog encounter into a permanent, personal record, and transforms a lifetime of dog-meeting into a living collection that grows richer over time.

## 2. Jobs To Be Done

### The primary job this product is hired to do: 

"When I meet a dog I love, I want to capture and remember it effortlessly, so that I feel like my experiences with dogs are being kept and collected — not lost." 

### Secondary jobs: 

"When I'm curious about a breed I've just encountered, I want to know what it is immediately, without having to Google it or ask a stranger." 

”When I look back at my collection, I want to feel a sense of progress — knowing how many breeds I've discovered and how many are still out there to find."

## 3. Goal & Success Metrics

### Primary goal at MVP launch: 
Validate that users will repeatedly open the app to log dogs they meet in real life, and that our database has full list of breeds and users are able to identify breeds, learn more about each breed, is fast and accurate enough to feel magical rather than frustrating. 

### North Star Metric: 
Average number of breed unlocks per active user per month. This captures both engagement (they are opening the app) and core value delivery (they are successfully collecting). 

### Supporting metrics to track from day one:
* Weekly active users (WAU)
* Upload completion rate (photos posted vs. breed successfully identified)
* Average metadata added (name, age, area)

### MVP success threshold: 
If 40% of users who complete their first upload return within 7 days to log another dog, the core loop is working.

## 4. Personas

### Primary Persona — Cameron

Age: 20–35 Occupation: Creative professional (designer, marketer, content creator) Location: Urban or suburban — parks, neighbourhoods, social settings Who is Cameron: is a passionate dog lover who stops strangers on the street to ask what breed their dog is. Cameron is sociable, visually oriented, and already a heavy phone camera user. Cameron is not a developer and has no interest in technical complexity, wants tools that are beautiful, effortless, and immediately rewarding. Has tried remembering breeds, saving photos on camera roll, and asking friends — and none of it has resulted in anything can revisit meaningfully. Goals To meet and identify as many breeds as possible over lifetime. To keep an organised, personal record of every dog has encountered. To feel a sense of progress and collection. To recall specific memories — the name of a dog met, where, and when. Frustrations: forgets breed names almost immediately. Camera roll is full of dog photos with no context. Existing breed apps are reference tools, not personal collections. Most utility apps are too plain or complex to use consistently. Technology comfort Comfortable with consumer apps (Instagram, Notion, Google Photos). Will abandon anything that requires more than a few taps to complete the core action. Responds strongly to good visual design and small moments of delight.

### Secondary Persona — Jordan

Age: 35–55 Occupation: Dog owner, works in a professional field (finance, law, tech) Location: Suburban, regular dog walker Who owns a dog and takes it on daily walks where regularly meets other dogs. Organised by nature and likes tracking and logging things — he uses apps like Strava, Notion, and Goodreads. Jordan is curious about breeds from a knowledge perspective and would enjoy building a reference of every breed personally encountered. Jordan is more tolerant of functional UI if the data and organisation are solid. Goals To systematically track every breed they have encountered. To build a knowledge base of breeds over time. To have something concrete to show for years of dog walks. Frustrations: No app dog-meeting history as data worth keeping, has to rely on memory or ad hoc notes.

## 5. Competitive & Analogous Analysis

Direct competitors — breed identification apps Dog Scanner, Microsoft Fetch, and similar apps offer one-time breed identification from a photo. They are accurate and fast but entirely transactional — there is no collection, no history, no personal record. Once the breed is identified, the app has nothing more to offer. They solve the identification problem but not the collection problem. Analogous products — collectible and gamified apps Pokémon GO demonstrates that the real-world collection mechanic — encountering something in the wild and adding it to a personal dex — is deeply compelling and habit-forming.

## 6. Feature Specification (MoSCoW)

### Must Have — MVP

All data is public and user-friendly. Users access their collection or dog feed of other contributors. No social or sharing features at this stage. Photo upload The primary action. Users upload a photo from their camera roll or take one directly in the app. Upload must be fast and forgiving — accepting standard mobile photo formats. Breed identification and Wiki. Post is displayed immediately after upload completes. The identified breed is the trigger for unlocking that entry in the collection. Collection gallery The home screen. Displays all collected dogs as a visual photo grid, most recent first. Full colour for collected entries. Tapping any entry opens the dog's detail page. Breed index A complete list of recognised dog breeds. Unlocked breeds show the user's photo and are fully accessible. Dog entry detail page Displays the photo, identified/matched breed, and optional metadata fields: dog's name, date met, location, personal notes. All metadata fields are optional. Users can edit at any time. Blob storage Photos and metadata stored and displayed reliably. Each photo entry has a corresponding metadata record keyed to the photo.

### Should Have — MVP if time permits

Manual breed override If the misidentifies a breed or not identified - missing from dog DB, the user can correct it manually. Upload confirmation moment A brief, delightful animation or transition when a breed is successfully unlocked. Collection counter A simple stat on the home screen: 

"You've collected X of Y breeds." Feeds the completionism impulse.

### Could Have — V2

Social sharing Share an individual dog entry or collection summary to social media or directly to a friend. Friend collections See how many breeds a friend has collected. Compare collections. This is where the dogodex social layer begins. Breed detail pages Tapping a locked breed shows general information about that breed — origin, size. Turns the index into a reference tool as well as a collection tracker.

### Won't Have — MVP (explicitly out of scope)

* Leaderboards or competitive features
* Push notifications
* Community or social feed
* Monetisation or premium tier
* Android / web versions (iOS first)
* Multi-dog household management
* Vet or health tracking features

## 7. User Journey — Core Flow

Cameron is walking home from work on a Tuesday afternoon and spots a striking dog outside a café. Asks the owner — it's an Akita, apparently, but already forgotten the name by the time crossed the street, opens PuppyLand. Gallery appears: seventeen dogs collected over the past three months, each a full-colour photo remembers taking. Taps the upload button, selects the photo just took, and submits it. Within seconds the app responds: Akita identified. The breed entry in index lights up. The photo moves to the top of her gallery. Taps the new entry. The detail page opens. Types in a quick note — "outside Colourful Coffee, really calm, huge" — and saves. The encounter is now permanent. Glances at collection counter: 18 of 344 breeds collected. Notices the Shiba Inu is still locked, smiles. There's always tomorrow!

## 8. MVP vs. Roadmap

MVP — photo upload, breed identification DB, collection gallery, breed index, dog entry with optional metadata. The core collection loop, working end to end. V2 — Manual breed override, upload delight moment, collection counter, breed detail pages, basic social sharing. Refinement of the core loop and first social hooks. V3 — Friend collections and comparisons, push notifications (streak reminders, milestone celebrations), gamification layer (badges for milestones: "First 10 breeds", "Met a rare breed"). Exploration of a premium tier. V4 — Community features, curated dog content, potential partnerships with breed organisations or pet brands.

## 9. Instrumentation Plan
The following events must be tracked from day one of launch:
* Account created
* Session started
* Upload initiated
* Upload completed
* Breed identified (with breed name)
* Breed identification failed
* Manual breed override applied
* Metadata saved
* Collection gallery viewed
* Breed index viewed
* Dog entry detail viewed
* App returned to after 1 day / 7 days / 30 days All events should include a timestamp and anonymised user ID. No personally identifiable information in event logs.

# One-Pager

## What is PuppyLand?

A personal dog breed collection app. You meet a dog, photograph it, and identifies the breed, learn more about the breed, create posts and not forget the dogs you met. It joins your post collection permanently. Over time, your collection becomes a living record of every dog you have ever encountered. 
Who is it for?
Dog lovers — primarily young professionals in urban environments — who are passionate about dogs but have no meaningful way to capture and organise their encounters.
Why now?
Make real-life breed identification, feel instant love and share woof love. The technology that makes this magical is now accessible.
What gap does it fill?
Every existing dog app is either a one-time identifier or a breed encyclopaedia. No product treats a person's lifetime of dog encounters as something worth collecting and keeping. What does success look like at MVP?
40% of users who complete their first upload return within 7 days to log another dog.
What are we building first?
The core loop only: photo upload → identification of breed → collection unlock. Fast and delightful.

# 5 Whys Analysis

## Why #1 — Why do users want to identify dog breeds?

Because when they meet a dog they find beautiful, unusual, or interesting, they want to know what it is. The name of the breed is the handle that lets them attach meaning to the experience. Without it, the moment is incomplete — they felt something but cannot name it or recall it precisely.

## Why #2 — Why do they want to remember it?

Because the experience of meeting a remarkable dog is genuinely meaningful to them. It triggers joy, curiosity, and connection. Humans naturally want to hold onto moments that make them feel that way. The camera roll photo is an attempt to do this — but a photo without context decays in meaning over time. Without the breed name, the location, the dog's name, it becomes just another image.

## Why #3 — Why does a camera roll not solve this?

Because a camera roll is undifferentiated storage. It holds dog photos alongside receipts, screenshots, and thousands of other images. There is no structure, no organisation, no sense of progress or collection. It preserves the image but destroys the experience. The user cannot look at their camera roll and feel that their dog encounters form something coherent and meaningful — a story, a collection, an achievement.

## Why #4 — Why does the collection mechanic matter?

Because humans are fundamentally drawn to completion and accumulation — especially when progress is visible. A Puppydex works not just because it stores information but because it shows you what you have and what you are still missing. The locked/unlocked dynamic creates a permanent sense of forward motion: every new dog is a step, and the full picture of how far you have come and how far you could go is always visible. This transforms a passive habit (meeting dogs) into an active, rewarding one (collecting breeds).

## Why #5 — Why has no product solved this before?

Because until very recently, real-time breed identification was not accurate or fast enough to make the core loop feel effortless. A product that requires the user to manually search and select a breed from a list is too much friction — it breaks the moment. The magic of PuppyLand depends on the Dog DB helping dog lovers to find and learn more about dogs instantly. That capability has only become reliably accessible in the last two to three years. The product idea is not new; the technology that makes it viable is.

Root truth revealed by the 5 Whys: It is a tool for turning fleeting emotional moments into a permanent, structured personal collection — and with PuppyLand has finally made that possible without friction. The product must be fast enough to capture the moment before it passes and rewarding enough to make users want to keep coming back.


# PuppyLand — Database Architecture

## Overview

PuppyLand uses a MySQL database with 4 tables. Breed data is sourced from the [Dog CEO API](https://dog.ceo/dog-api/) at runtime, with the local `breeds` table acting as a fallback cache if the API is unavailable.  A fallback or cache-aside pattern it's used in production systems all the time. Also, we can save railway money due to that approach in our code.



## Relationship Diagram


![PuppyLand](PuppyLand%20DB/PuppyLand%20DB%20SVG.drawio.svg)


## Tables

### `users`
Stores registered user accounts.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | BIGINT | PK, auto-increment | |
| `username` | VARCHAR(50) | unique, not null | |
| `email` | VARCHAR(100) | unique, not null | |
| `created_at` | DATETIME | not null | Auto-set on creation |



### `breeds`
Local cache of breed data fetched from the Dog CEO API. Populated automatically on successful API calls and used as a fallback when the API is unavailable.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | BIGINT | PK, auto-increment | |
| `name` | VARCHAR(100) | unique, not null | e.g. "Akita" |
| `image_url` | VARCHAR(500) | nullable | Sourced from Dog CEO API |



### `encounters`
The personal Puppydex. Each row represents a breed a user has personally met. A breed is considered **unlocked** for a user if at least one encounter row exists linking that user to that breed name.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | BIGINT | PK, auto-increment | |
| `user_id` | BIGINT | FK → users, not null | |
| `breed_name` | VARCHAR(100) | not null | String from Dog CEO API |
| `dog_name` | VARCHAR(100) | nullable | The individual dog's name |
| `area` | VARCHAR(100) | nullable | e.g. "Victoria Park" |
| `city` | VARCHAR(100) | nullable | e.g. "London" |
| `country` | VARCHAR(100) | nullable | e.g. "UK" |
| `notes` | TEXT | nullable | Personal notes about the encounter |
| `met_at` | DATETIME | not null | Date and time of encounter |



### `posts`
The public live feed. Each row represents a dog photo post. Visibility is controlled by `is_public` — private posts appear only in the user's own Puppydex, public posts appear in the shared live feed grid.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | BIGINT | PK, auto-increment | |
| `user_id` | BIGINT | FK → users, not null | |
| `breed_name` | VARCHAR(100) | not null | String from Dog CEO API |
| `photo_url` | VARCHAR(500) | not null | URL to uploaded image |
| `caption` | TEXT | nullable | Optional user-written caption |
| `is_public` | BOOLEAN | not null, default false | Controls feed visibility |
| `created_at` | DATETIME | not null | Auto-set on creation |



## Relationships

| Relationship | Type | Description |
|---|---|---|
| `users` → `encounters` | One to Many | A user can have many Puppydex entries |
| `users` → `posts` | One to Many | A user can create many posts |
| `breeds` → app | Cache only | Not linked by FK — referenced loosely via `breed_name` string |



## Key Design Decisions

**`breeds` as a cache, not source of truth**
The Dog CEO API is the authority for breed data. The `breeds` table is only written to on a successful API response, and only read from when the API is unavailable. This keeps the DB lean and always in sync with the API.

**`breed_name` as a string, not a foreign key**
Both `encounters` and `posts` store `breed_name` as a plain string rather than a FK to `breeds`. This is intentional — the API is the source of truth, so we do not enforce referential integrity against a local cache table.

**`encounters` and `posts` are separate tables**
A user can log a dog to their Puppydex privately without publishing to the live feed. A post's visibility is controlled by the `is_public` flag rather than which table it lives in.

**Location split into three fields**
`area`, `city`, and `country` on `encounters` allows users to be as specific or vague as they like — all three are nullable.



## API Fallback Logic


1. User searches or posts a breed
         ↓
2. Call Dog CEO API
         ↓
   API responds?
   ✅ YES → use data, save to breeds table (cache)
   ❌ NO  → fall back to breeds table, retrieve cached data
