# Roadmap

## ToDoing
* Move entire audit table creation into JS
 
## ToDo
* Make Page / Page State buttons work to hide content, update table caption
* Add "Issue Number" to the DB schema and audit table
* Change "issue_description" variables to "issue_details" consistently
* Allowing for different Audit views (table vs ...cards?)
* Flesh out Existing Audit features (edit/lock issues details, add new issue, add page, add page_state, switching all pages/single page/single pagestate views, saving things to IndexedDB)
* Deleting stuff (issues, pages, page_states)
* Browser history stack stuff (forward back through pages/page_states/etc.)
* Error handling (error page to redirect in bad cases, etc.)
* New Audit features (set name)
* Edit Audit Details?
* Load rules from data folder
* Add all rules to data folder
* Checklist creation
* index - maybe provide a rule preview when selecting a checklist - assume users don't know which rules are in each checklist
* Basic rule creation
* ACT rule creation
* Removing rules/checklists/checking if rule used by checklist/checklist used by audits
* Move to Dexie.on.populate for initial db setup
* Set proper schema with auto-incrementing indexes
* Make repo public and move roadmap to the Wiki
* After Public Repo - setup Github Pages
* Exporting/Saving
* Loading Audit/Entire DB
* Importing EARL formatted issues
* Visual Design
* I18n?
* Explore feature creep ideas

## ToDone
* Basic HTML for Index, Audit, Rules pages
* IndexedDB schema created, sample data created
* Use IndexedDB content for basic Index, Audit, Rules pages
* Validate URL parameters for Audit for getting into the correct state
* Table view built out for all views