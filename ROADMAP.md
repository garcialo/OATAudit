# Roadmap

## ToDoing

-   Display buttons for switching Audit views

## ToDo

-   Display page.url somewhere / add "show instructions" button if defined for a page state
-   Flesh out Existing Audit features (edit/lock issues details, add new issue, add page, add page_state, edit scope, switching all pages/single page/single pagestate views, saving things to IndexedDB, updating heading and table caption)
-   Deleting stuff (issues, pages, page_states)
-   Browser history stack stuff (forward/back through pages/page_states/etc.)
-   Error handling (error page to redirect in bad cases, etc.)
-   New Audit features (set name)
-   Edit Audit Details?
-   Load rules from data folder
-   Add all rules to data folder
-   Checklist creation
-   index - maybe provide a rule preview when selecting a checklist; maybe just suggest checking the rules page - assume users don't know which rules are in each checklist
-   Basic rule creation
-   ACT rule creation
-   Removing custom rules/checklists/checking if custom rule used by checklist/checklist used by audits
-   Make repo public and move roadmap to the Wiki
-   After Public Repo - setup Github Pages
-   Set up favicon to use the svg favicon; think it's currently defaulting to the favicon.ico
-   Create a decent unfurl as a placeholder until it can be done better after visual design is done
-   Exporting/Saving
-   Loading Audit/Entire DB from uploaded file
-   Importing EARL formatted issues
-   Visual Design
-   Allowing for different Audit views (table vs ...cards?)
-   I18n?
-   Explore feature creep ideas (guided audit creation, guided testing, representative/represented pages, thorough scoping tool, adding recommended fixes, uploading images)

## ToDone

-   Basic JSX/routing for Home, Audit, Rules pages
-   React-style forms for Home
-   IndexedDB schema created, sample data created
-   Use IndexedDB sample data for basic Index, Audit, Rules pages
-   Table view built out for "All Issues"
-   Add "Issue Number" to the DB schema and audit table
-   Move to Dexie.on.populate for initial db setup
-   Set proper schema with auto-incrementing indexes
