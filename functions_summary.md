# Frontend Component Documentation

This document provides a summary of the frontend components in the LPX project.

## `CreateProjectButton.tsx`

**Location:** `frontend/components/projects/selection/CreateProjectButton.tsx`

### Purpose

This component renders a button with a "+" icon and the text "Create Project". When clicked, it navigates the user to the `/projects/new` page, where they can create a new project.

### Props

- `onProjectCreated?: () => void` (optional): A callback function that can be executed after a project is created. This is passed down but not directly used in this component; it's intended for the parent component to handle.

### Behavior

- **Navigation**: Uses the Next.js `useRouter` hook to programmatically navigate to the project creation page.
- **UI**: A simple button styled with the project's design system, including a `lucide-react` icon for visual clarity.

---

## `ProjectCard.tsx`

**Location:** `frontend/components/projects/selection/ProjectCard.tsx`

### Purpose

A versatile component for displaying project information. It can be rendered in two variants: `grid` or `list`.

### Props

- `project: Project`: The project object containing details like name, description, status, and updated_at.
- `onClick?: () => void` (optional): A callback function to handle clicks on the card.
- `variant?: "grid" | "list"` (optional, default: `grid`): Determines the layout and styling of the card.

### Behavior

- **Display**: Shows the project's name, status (with a color-coded badge), description, and the time since it was last updated.
- **Styling**: Adapts its styling based on the `variant` prop. The `grid` view is more compact, while the `list` view is more suitable for vertical lists.
- **Interactivity**: Has a hover effect to indicate it's clickable.

---

## `ProjectGrid.tsx`

**Location:** `frontend/components/projects/selection/ProjectGrid.tsx`

### Purpose

This component arranges a list of projects into a responsive grid layout.

### Props

- `projects: Project[]`: An array of project objects to be displayed in the grid.

### Behavior

- **Layout**: Uses a CSS grid to create a responsive layout that adjusts the number of columns based on screen size.
- **Navigation**: When a project card is clicked, it navigates the user to that project's specific page (e.g., `/projects/{projectId}`).
- **Component Composition**: It uses an inlined version of the `ProjectCard` component to display each project. This was likely done to work around an import issue and could be refactored.

---

## `ProjectList.tsx`

**Location:** `frontend/components/projects/selection/ProjectList.tsx`

### Purpose

This component renders a vertical list of projects.

### Props

- `projects: Project[]`: An array of project objects to be displayed in the list.

### Behavior

- **Layout**: Displays projects in a single column with spacing between them.
- **Navigation**: Each project card is wrapped in a Next.js `Link` component, making the entire card a clickable link to the project's page.
- **Component Composition**: It uses the `ProjectCard` component with the `variant` prop set to `"list"`.

---

## `ViewToggle.tsx`

**Location:** `frontend/components/projects/selection/ViewToggle.tsx`

### Purpose

A UI control that allows users to switch between a `grid` view and a `list` view.

### Props

- `view: "grid" | "list"`: The currently active view.
- `onChange: (view: "grid" | "list") => void`: A callback function that is called when the user clicks one of the view buttons.

### Behavior

- **State Management**: It visually indicates the currently active view by applying a different background color to the active button.
- **Interactivity**: Consists of two icon buttons (one for grid, one for list). Clicking a button triggers the `onChange` callback with the new view name.

---

## `ProjectsHeader.tsx`

**Location:** `frontend/components/projects/selection/ProjectsHeader.tsx`

### Purpose

Serves as the main header for the "My Projects" page.

### Props

- `view: "grid" | "list"`: The current view mode, passed down to the `ViewToggle` component.
- `setView: (view: "grid" | "list") => void`: The function to update the view mode, passed down to the `ViewToggle` component.
- `onProjectCreated?: () => void` (optional): A callback passed down to the `CreateProjectButton`.

### Behavior

- **Display**: Shows a title ("My Projects"), a subtitle, the `CreateProjectButton`, and the `ViewToggle` component.
- **Layout**: Uses flexbox to create a responsive layout that adapts to different screen sizes.

---

## `ProjectsTabs.tsx`

**Location:** `frontend/components/projects/selection/ProjectsTabs.tsx`

### Purpose

Provides a tabbed interface to filter and display projects based on their status.

### Props

- `view: "grid" | "list"`: The current view mode, used to determine whether to render `ProjectGrid` or `ProjectList`.
- `projects: Project[]`: The full list of projects to be filtered.
- `tabFilters`: An array of objects, each defining a tab with a `value`, `label`, and a `filter` function.

### Behavior

- **Filtering**: Filters the `projects` array based on the currently active tab.
- **Dynamic Rendering**: Dynamically renders either the `ProjectGrid` or `ProjectList` component based on the `view` prop, passing the filtered projects to it.
- **UI**: Uses a reusable `Tabs` component for the UI, with custom styling for the active tab.

---

## `index.tsx`

**Location:** `frontend/components/projects/selection/index.tsx`

### Purpose

This is a barrel file that re-exports all the components from the `selection` directory.

### Behavior

- **Code Organization**: It allows for cleaner and more convenient imports in other parts of the application. For example, instead of importing each component individually, you can import them all from `@/components/projects/selection`.

---

## `DeleteConfirmationModal.tsx`

**Location:** `frontend/components/projects/nav/next-steps/DeleteConfirmationModal.tsx`

### Purpose

A reusable modal component that prompts the user for confirmation before deleting an item.

### Props

- `isOpen: boolean`: Controls whether the modal is open or closed.
- `onClose: () => void`: A callback function to close the modal.
- `onConfirm: () => void`: A callback function to execute when the user confirms the deletion.
- `itemName: string`: The name of the item to be deleted, displayed in the modal's message.
- `isLoading: boolean`: Indicates whether the deletion is in progress, disabling the confirm button.

### Behavior

- **Confirmation Dialog**: Presents a clear message asking the user to confirm the deletion.
- **Visual Cues**: Includes an alert icon to draw attention to the destructive nature of the action.
- **State Management**: Manages its own open/closed state via the `isOpen` prop.
- **Animation**: Uses `framer-motion` for smooth entry and exit animations.

---

## `DeleteStepButton.tsx`

**Location:** `frontend/components/projects/nav/next-steps/DeleteStepButton.tsx`

### Purpose

A button component specifically for deleting a "next step".

### Props

- `stepId: string`: The ID of the next step to be deleted.
- `stepTitle: string`: The title of the next step, used in the confirmation modal.
- `onStepDeleted: (stepId: string) => void`: A callback function that is called after the step has been successfully deleted.

### Behavior

- **Confirmation Flow**: It opens the `DeleteConfirmationModal` when clicked, ensuring the user confirms the action.
- **API Integration**: It calls the `nextStepsService.delete` method to delete the step from the backend.
- **State Management**: Manages a loading state to provide feedback to the user and prevent multiple clicks.
- **User Feedback**: Displays a toast notification on success or failure.

---

## `EditStepModal.tsx`

**Location:** `frontend/components/projects/nav/next-steps/EditStepModal.tsx`

### Purpose

A modal dialog for editing the title and description of an existing "next step".

### Props

- `isOpen: boolean`: Controls the visibility of the modal.
- `onClose: () => void`: A callback to close the modal.
- `onStepUpdated: (updatedStep: NextStep) => void`: A callback that is called with the updated step data upon successful update.
- `step: NextStep`: The next step object containing the data to be edited.

### Behavior

- **Form**: Provides a form with input fields for the step's title and description, pre-filled with the existing data.
- **Validation**: Ensures that the title and description fields are not empty.
- **API Integration**: Calls the `nextStepsService.update` method to save the changes.
- **State Management**: Manages loading and error states during the update process.

---

## `Header.tsx`

**Location:** `frontend/components/projects/nav/next-steps/Header.tsx`

### Purpose

A simple, reusable header component.

### Props

- `title: string`: The text to be displayed as the header title.

### Behavior

- **Display**: Shows the provided `title` next to a checkmark icon.
- **Styling**: Provides consistent header styling for the "next steps" feature.

---

## `NextStepContent.tsx`

**Location:** `frontend/components/projects/nav/next-steps/NextStepContent.tsx`

### Purpose

A component dedicated to displaying the description of a "next step".

### Props

- `description: string`: The description text to be displayed.

### Behavior

- **Display**: Renders the `description` text within a styled container.
- **Styling**: Ensures consistent presentation of step descriptions.

---

## `NextStepsList.tsx`

**Location:** `frontend/components/projects/nav/next-steps/NextStepsList.tsx`

### Purpose

Fetches and displays a list of "next steps" for a given project.

### Props

- `projectId: string`: The ID of the project for which to fetch the next steps.

### Behavior

- **Data Fetching**: Fetches the list of next steps from the `nextStepsService` when the component mounts.
- **State Management**: Manages the list of steps, loading state, and which steps are currently expanded.
- **CRUD Operations**: Handles the creation, update, and deletion of steps by updating its internal state.
- **UI**: Displays a skeleton loader while fetching data and renders the list of steps using the `StepItem` component.

---

## `StepItem.tsx`

**Location:** `frontend/components/projects/nav/next-steps/StepItem.tsx`

### Purpose

A detailed component that renders a single "next step" item.

### Props

- `step: NextStep`: The next step object to be displayed.
- `onUpdate: (updatedStep: NextStep) => void`: A callback to update the step in the parent component's state.
- `onDelete: (stepId: string) => void`: A callback to delete the step from the parent component's state.

### Behavior

- **Display**: Shows the step's title, status, and an expand/collapse button to show/hide the description.
- **Interactivity**: Includes buttons for toggling the done status, editing the step (which opens the `EditStepModal`), and deleting the step (which opens the `DeleteConfirmationModal`).
- **Animation**: Uses `framer-motion` for smooth animations when expanding/collapsing the description and changing the status.

---

## `StepsHeader.tsx`

**Location:** `frontend/components/projects/nav/next-steps/StepsHeader.tsx`

### Purpose

A header component for the "next steps" section.

### Props

- `onCreateStep: () => void`: A callback function to open the modal for creating a new step.

### Behavior

- **Display**: Shows a title and a "Create Step" button.
- **Interactivity**: The "Create Step" button triggers the `onCreateStep` callback.

---

## `ToggleDoneButton.tsx`

**Location:** `frontend/components/projects/nav/next-steps/ToggleDoneButton.tsx`

### Purpose

A button to toggle the "done" status of a next step.

### Props

- `step: NextStep`: The next step object.
- `onUpdate: (updatedStep: NextStep) => void`: A callback to update the step's status in the parent component.

### Behavior

- **API Integration**: Calls the `nextStepsService.update` method to change the step's status.
- **State Management**: Manages a loading state to provide feedback and prevent multiple clicks.
- **Animation**: Features animated icons that transition between the "done" and "not done" states.

---

## `index.tsx`

**Location:** `frontend/components/projects/nav/next-steps/index.tsx`

### Purpose

A barrel file that re-exports all components from the `next-steps` directory.

### Behavior

- **Code Organization**: Simplifies imports from this directory, improving code readability and maintainability.

---

## `AlertCards.tsx`

**Location:** `frontend/components/projects/nav/team/AlertCards.tsx`

### Purpose

Displays informational alert cards related to team management.

### Behavior

- **Conditional Rendering**: Shows two types of alerts:
    1.  An alert informing the user that they need a team agreement to create non-co-founder roles.
    2.  An alert indicating that there are no open roles currently available.
- **UI**: Uses a reusable `Alert` component with an icon and descriptive text.

---

## `CreateRoleModal/BasicInfoTab.tsx`

**Location:** `frontend/components/projects/nav/team/CreateRoleModal/BasicInfoTab.tsx`

### Purpose

A form tab within the "Create Role" modal for entering the basic information about a new role.

### Props

- `formData`: The current state of the form data.
- `handleInputChange`: A function to update the form data state.
- `errors`: An object containing any validation errors.

### Behavior

- **Form Fields**: Includes input fields for role type, category, role title, required skills, and a description.
- **Validation**: The parent component (`CreateRoleModal`) is responsible for validation, and this component displays any errors passed down via props.

---

## `CreateRoleModal/CompensationTab.tsx`

**Location:** `frontend/components/projects/nav/team/CreateRoleModal/CompensationTab.tsx`

### Purpose

A form tab within the "Create Role" modal for entering optional compensation details.

### Props

- `formData`: The current state of the form data.
- `handleInputChange`: A function to update the form data state.

### Behavior

- **Form Fields**: Includes fields for salary range and equity percentage.
- **Optionality**: These fields are optional for creating a new role.

---

## `CreateRoleModal/CreateRoleModal.tsx`

**Location:** `frontend/components/projects/nav/team/CreateRoleModal/CreateRoleModal.tsx`

### Purpose

A multi-tab modal dialog for creating a new team role.

### Props

- `isOpen`: Controls the visibility of the modal.
- `onClose`: A callback to close the modal.
- `onRoleCreated`: A callback executed after a role is successfully created.

### Behavior

- **Tabbed Interface**: Combines the `BasicInfoTab` and `CompensationTab` into a single, user-friendly workflow.
- **Form Management**: Manages the overall form state, validation, and submission.
- **Validation**: Validates the required fields in the "Basic Info" tab before allowing submission.
- **API Integration**: Calls a service to create the new role in the backend.
- **User Feedback**: Displays a `FormErrorAlert` if there are validation errors.

---

## `CreateRoleModal/FormErrorAlert.tsx`

**Location:** `frontend/components/projects/nav/team/CreateRoleModal/FormErrorAlert.tsx`

### Purpose

A simple alert component to display validation errors within the "Create Role" form.

### Props

- `message`: The error message to be displayed.

### Behavior

- **Display**: Renders a styled alert box with an error icon and the provided message.

---

## `InvitationLinkCard.tsx`

**Location:** `frontend/components/projects/nav/team/InvitationLinkCard.tsx`

### Purpose

Displays a card with a project invitation link that can be easily copied.

### Behavior

- **Display**: Shows a hardcoded invitation link in a read-only input field.
- **Copy to Clipboard**: Includes a "Copy" button that uses the Clipboard API to copy the link.
- **User Feedback**: Shows a toast notification to confirm that the link has been copied.

---

## `MemberRow.tsx`

**Location:** `frontend/components/projects/nav/team/MemberRow.tsx`

### Purpose

Renders a single row in the team members table, displaying information about one team member.

### Props

- `member`: The team member object.
- `isOwner`: A boolean indicating if the current user is the project owner.
- `onDelete`: A callback to handle the deletion of the member.

### Behavior

- **Display**: Shows the member's avatar, name, role, skills, and wallet status.
- **Conditional Actions**: If the current user is the project owner, it displays "Edit" and "Delete" buttons.
- **Confirmation Flow**: The "Delete" button triggers a confirmation dialog before proceeding with the deletion.

---

## `RecommendedRolesTable.tsx`

**Location:** `frontend/components/projects/nav/team/RecommendedRolesTable.tsx`

### Purpose

Displays a table of recommended roles for the project.

### Props

- `roles`: An array of recommended role objects.
- `onCreateRole`: A callback to open the "Create Role" modal.

### Behavior

- **Display**: Renders a table showing the recommended role, category, and a "Create" button for each role.
- **Interactivity**: The "Create" button triggers the `onCreateRole` callback.

---

## `RoleFilterBadges.tsx`

**Location:** `frontend/components/projects/nav/team/RoleFilterBadges.tsx`

### Purpose

Displays a set of filter badges for team roles.

### Props

- `roles`: An array of role objects to be filtered and counted.
- `onCreateRole`: A callback to open the "Create Role" modal.

### Behavior

- **Display**: Shows badges for different role statuses (e.g., "Open Roles", "Filled Roles") with a count for each.
- **Interactivity**: Includes a "Create Role" button that triggers the `onCreateRole` callback.

---

## `TeamHeader.tsx`

**Location:** `frontend/components/projects/nav/team/TeamHeader.tsx`

### Purpose

A header component for the team section.

### Props

- `projectName`: The name of the project.
- `memberCount`: The number of members on the team.

### Behavior

- **Display**: Shows the project name and the total number of team members.

---

## `TeamMembersTable.tsx`

**Location:** `frontend/components/projects/nav/team/TeamMembersTable.tsx`

### Purpose

Displays a table of all team members.

### Props

- `members`: An array of team member objects.
- `isOwner`: A boolean indicating if the current user is the project owner.
- `isLoading`: A boolean to show a loading state.

### Behavior

- **Display**: Renders a table with columns for member details, role, skills, and wallet status.
- **Component Composition**: Uses the `MemberRow` component to render each row.
- **State Handling**: Shows a loading skeleton UI while data is being fetched and an empty state message if there are no members.
- **Conditional Columns**: The "Actions" column is only shown if the current user is the project owner.

---

## `TeamRoles.tsx`

**Location:** `frontend/components/projects/nav/team/TeamRoles.tsx`

### Purpose

A comprehensive component that combines all the team and role-related components into a single view.

### Behavior

- **Component Composition**: It renders the `TeamHeader`, `TeamMembersTable`, `AlertCards`, `RoleFilterBadges`, and `RecommendedRolesTable`.
- **Modal Management**: Manages the state for the "Create Role" modal, opening it when needed.
- **Data Flow**: Fetches and passes down the necessary data (team members, roles, etc.) to its child components.

---

## `CreateProjectForm.tsx`

**Location:** `frontend/components/projects/CreateProjectForm.tsx`

### Purpose

A comprehensive form for creating a new project.

### Behavior

- **Form Fields**: Includes fields for project name (required), short description, category, description (required), logo URL, and banner URL.
- **State Management**: Manages its own state for form data and loading status using the `useState` hook.
- **Submission Handling**: On submission, it prevents the default form action and sets the loading state to true.
- **API Integration**: Calls the `projectService.createProject` method with the form data to create the project in the backend.
- **User Feedback**: Uses the `toast` hook to display success or error messages to the user.
- **Navigation**: On successful project creation, it navigates the user to the newly created project's page using the Next.js `useRouter` hook.
- **UI**: Provides "Cancel" and "Create Project" buttons. The "Cancel" button navigates the user back to the previous page, and both buttons are disabled during the submission process.
