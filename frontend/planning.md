# LPX - Planning Document

## Project Overview

**LPX** is a platform designed to support multiple startups by providing a transparent workspace where they can log milestones, manage tasks, and document events. The system offers a public and private view of each startup’s progress, allowing investors to track how resources are being utilized and developers from the community to contribute in exchange for token credits convertible into equity options.

## Core Features

### Authentication

* User registration and login
* Role-based access (startup founder, contributor, investor, admin)
* OAuth integration (GitHub, Google, etc.)
* Secure invite system for team members and investors

### Startup Dashboard

* Overview of startup milestones, task progress, and event history
* Token balance and usage summary
* Activity feed
* Team member roles and contribution levels

### Milestone Management

* Add, edit, and archive milestones
* Associate milestones with tasks and events
* Visual timeline of milestone progress
* Public/private visibility control

### Task Management

* Create, assign, and track tasks
* Set deadlines, tags, and categories
* Link tasks to milestones
* Community contribution option (open tasks for external devs)
* Token credit rewards for completed contributions

### Event Logging

* Add and tag important events (launches, investor meetings, funding rounds, pivots, etc.)
* Attach media, notes, and related documents
* Sort and filter by type or date
* Make events public or internal

### Contribution & Tokens

* Community developers can browse open tasks
* Token rewards issued upon verified completion
* Token balances tracked per user
* Founders can define token-to-option conversion policy
* Token history and usage log

### Investor View

* Read-only access to milestones, events, and metrics
* Visual timeline of startup evolution
* Optional analytics on token distributions and contributions
* Notes from startup team (e.g. "How we used investment X")

### Settings & Admin

* Startup profile and branding
* Team management
* Token economy settings
* Notifications and alert preferences
* Platform-wide admin dashboard

## Technical Architecture

### Frontend

* React.js with TypeScript
* State management with React Hooks (useState, etc.)
* UI components from shadcn/ui
* Tailwind CSS for styling
* Form handling with standard React state

### Backend

* Supabase Authentication
* Supabase Database (PostgreSQL)
* Supabase Storage (for documents and media)
* Supabase Edge Functions (for tokens, permissions, and triggers)

### Data Models

* Users
* Startups
* Milestones
* Tasks
* Events
* Tokens
* Settings

## Roadmap

### Phase 1 (MVP - Current)

* Startup onboarding
* Milestone and task tracking
* Developer contribution with token rewards
* Basic investor view
* Simple dashboards

### Phase 2 (Growth)

* Token-to-option conversion logic
* Contribution verification workflow
* GitHub integration (task linking, PR tracking)
* Notifications system
* Document uploads and linking

### Phase 3 (Scale)

* Detailed analytics and reporting for investors
* Multiple token economy support
* Community leaderboard and badges
* Mobile app
* Integration with fundraising platforms (e.g., AngelList, SeedInvest)
* Smart contract integration for on-chain tokens and options (optional)