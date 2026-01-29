# Revwisely Project Status

## Overview
Building out the Talent and Consultant Application pages for Revwisely's website.

## Completed Work

### Talent Page (`talent.html`)
- Hero section with CEO headshot (Chris Preston) and quote
- "Join a close-knit team of strategic doers" section
- "Work you'll do" section with 6 capability cards
- "How Revwisely works with talent" section with 3 role cards (equal height)
- "The roles we typically hire" section
- "Complete your consultant profile" CTA section
- "Who thrives at Revwisely" checklist
- "Why do people join Revwisely" benefits section
- "How to get started" purple CTA section (color matched to homepage #7964ff)
- Resources section (pulls from blog)
- All text properly centered, no orphaned words

### Consultant Application Page (`consultant-profile.html`)
- 4-step progress indicator (clickable, smooth scroll navigation):
  1. Personal Information
  2. Work History and Requirements
  3. Expertise
  4. Upload Your Resume
- Sticky progress bar at top
- Form sections with proper validation
- Removed Availability & Preferences section per design requirements
- Resume upload moved to its own section at the end

### Assets
- `assets/chrispreston.png` - CEO headshot

## Deployed
- **Vercel Production:** https://revwisely.vercel.app
- **Talent Page:** https://revwisely.vercel.app/talent.html
- **Application Form:** https://revwisely.vercel.app/consultant-profile.html

## Current Task: Airtable Integration

### Goal
Set up Airtable as the backend database for consultant applications so:
- Form submissions are stored in Airtable
- Hiring managers can view/manage applications in a dashboard
- Resumes are stored as attachments
- Applications can be tracked with status (New, Reviewed, Interview, etc.)

### Airtable MCP Setup
- Added `airtable-mcp-server` to `~/.cursor/mcp.json`
- API token configured: `patRdEImcBVG3pXfJ...` (stored in mcp.json)
- User created a base called "Revwisely Consultant Applications" in Airtable

### Next Steps (After Cursor Restart)
1. **List Airtable bases** to find the new base ID
2. **Create the Applications table** with these fields:
   - First Name (text)
   - Last Name (text)
   - Email (email)
   - Phone (phone)
   - City (text)
   - State/Country (text)
   - LinkedIn (URL)
   - Job Title (text)
   - Company (text)
   - Years Experience (single select: 3-5, 5-8, 8-12, 12-15, 15+)
   - Education (single select: Bachelor's, Master's, MBA, PhD, Other)
   - Professional Summary (long text)
   - Expertise Areas (multi-select: Strategy, RevOps, Sales, Marketing, Data, GTM Engineering, AI/Automation, Customer Success, Product, Change Management)
   - Tools & Platforms (long text)
   - Industries (multi-select: B2B SaaS, FinTech, Healthcare, E-commerce, Manufacturing, Professional Services)
   - Referral Source (single select: LinkedIn, Google, Referral, Website, Event, Other)
   - Additional Info (long text)
   - Resume (attachment)
   - Status (single select: New, Reviewed, Interview, Rejected, Hired)
   - Submitted At (date/time)

3. **Update consultant-profile.html** to submit to Airtable API

4. **Create views** for hiring manager:
   - All Applications (grid view)
   - New Applications (filtered)
   - By Status (kanban view)

## Files Modified This Session
- `talent.html` - Multiple styling fixes, CEO headshot added
- `consultant-profile.html` - Restructured form, clickable progress nav
- `~/.cursor/mcp.json` - Added Airtable MCP config
- `assets/chrispreston.png` - Added CEO image

## GitHub Repository
- Repo: https://github.com/derrtaderr/revwisely
- All changes pushed to main branch
