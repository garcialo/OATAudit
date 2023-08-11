# How deleters (should) work

## General

-   Checklist and Check deletion is separate from Audit part (i.e. Audits, Pages, Page States, Issues) deletion.
-   Audit deletion will never delete Checklists/Checks
-   Checklist/Check deletion will never delete Audit parts
-   Calling an Audit part deleter will first delete relevant downstream content and then delete itself.

### deleteIssue.ts

1. Deletes the specified issue(s)

### deletePageState.ts

1. Calls deleteIssue.ts to delete issues associated with the specified page state(s)
1. Deletes the specified page state(s)

### deletePage.ts

1. Calls deletePageState.ts to delete page states associated with the specified page(s)
1. Relies on deletePageState.ts to call deleteIssue.ts to delete associated issues
1. Deletes the specified page(s)

### deleteAudit.ts

1. Call deletePage.ts to delete pages associated with the specified audit
1. Relies on deletePage.ts to call deletePageStates.ts and in-turn deleteIssues.ts to delete associated page states and issues, respectively
1. Deletes the specified audit
