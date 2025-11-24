# Task & Operations Management Features

## Overview

The task and operations management system streamlines daily nursery operations by providing task assignment, tracking, and workflow coordination for managers and workers.

## Task Management System

### Task Types

Tasks are categorized by type, each with specific workflows:

- **Watering** - Watering tasks for batches
- **Potting** - Potting up seedlings or plants
- **Sowing** - Sowing seeds
- **Movement** - Moving batches between locations
- **Quality Check** - Quality inspection tasks
- **Treatment** - Fertilizer, pest treatment, etc.

### Task Status

Tasks progress through statuses:

- **Pending** - Created but not started
- **In Progress** - Currently being worked on
- **Scheduled** - Scheduled for future
- **Completed** - Finished
- **Overdue** - Past due date (legacy status, maps to Pending)

### Task Priority

Priority levels for task organization:

- **High** - Urgent tasks requiring immediate attention
- **Medium** - Normal priority tasks
- **Low** - Lower priority tasks

## Operations Dashboard

### Task Board View (Kanban)

The primary operations view uses a Kanban-style board with columns:

- **Pending** - Tasks awaiting start
- **In Progress** - Active tasks
- **Scheduled** - Future scheduled tasks
- **Completed** - Finished tasks

#### Task Cards
Each task card displays:
- Task title
- Task type icon
- Priority badge
- Status badge
- Assignee
- Location
- Due date
- Batch ID
- Estimated hours

#### Task Board Features
- Drag-and-drop between columns (future)
- Filter by status
- Search functionality
- Quick task creation
- Task detail access

### List View

Alternative list view of all tasks:
- Detailed task information
- Sortable columns
- Filter by status
- Search functionality
- Quick access to task details

### Calendar View

Visual calendar view (planned feature):
- Timeline view of tasks
- Date-based scheduling
- Calendar integration

## Creating Tasks

### Task Creation Form

When creating a new task:

#### Basic Information
- **Task Type** - Select from task types
- **Title** - Task title/description
- **Description** - Detailed task instructions
- **Priority** - High, Medium, or Low

#### Assignment
- **Assign To** - Select worker/team member
- **Location** - Select location for task
- **Batch ID** - Link to specific batch (optional)

#### Scheduling
- **Due Date** - Task due date
- **Estimated Hours** - Time estimate

#### Additional Details
- **Instructions** - Step-by-step instructions
- **Quantity** - Quantity involved (e.g., "120 trays")
- **Special Notes** - Additional information

### Task Templates

Common task patterns can be saved as templates (future feature):
- Pre-filled task information
- Standard instructions
- Quick task creation

## Task Detail View

### Task Information

Complete task details page includes:

#### Overview
- Task title and type
- Status and priority badges
- Assignee information
- Location
- Due date
- Estimated hours
- Linked batch (if applicable)

#### Task Details
- Full description
- Step-by-step instructions
- Quantity information
- Special notes

#### Task Actions
- **Start Task** - Mark as in progress
- **Complete Task** - Mark as completed
- **Reassign Task** - Change assignee
- **Update Status** - Change status
- **Add Notes** - Add progress notes
- **Edit Task** - Modify task details

#### Task History
- Status change history
- Assignment history
- Notes and updates
- Completion information

## Worker Task View

### Worker Home Dashboard

Workers see a simplified view focused on their tasks:

#### Today's Tasks
- Tasks due today
- Overdue tasks highlighted
- Quick access to task details
- Task completion workflow

#### Task List
- All assigned tasks
- Filter by status
- Search functionality
- Sort by due date or priority

### Worker Task Detail

Workers can view and complete tasks:

#### Task Information
- Task details and instructions
- Location and batch information
- Due date and priority

#### Task Completion
- Mark task as complete
- Add completion notes
- Record actual time spent
- Upload photos (future)

## Task Filtering and Search

### Filtering Options

- **By Status** - Filter by task status
- **By Priority** - Filter by priority level
- **By Type** - Filter by task type
- **By Assignee** - Filter by worker
- **By Location** - Filter by location
- **By Batch** - Filter by batch ID
- **By Date** - Filter by due date range

### Search Functionality

- Search by task title
- Search by batch ID
- Search by location
- Search by assignee
- Real-time search results

### Combined Filters

- Multiple filters can be applied
- Clear individual or all filters
- Filter state persistence

## Task Assignment

### Assignment Process

1. Create task with assignee
2. Task appears in assignee's task list
3. Assignee can start task
4. Task status updates as work progresses
5. Task marked complete when finished

### Reassignment

- Change assignee at any time
- Reassignment history tracked
- Notification to new assignee (future)

### Unassigned Tasks

- Tasks can be created without assignee
- Available for assignment later
- Shown in unassigned task pool

## Task Status Workflow

### Status Transitions

Typical workflow:
1. **Pending** → Created, awaiting start
2. **In Progress** → Worker starts task
3. **Completed** → Task finished

Alternative workflow:
1. **Scheduled** → Future-dated task
2. **Pending** → Due date arrives
3. **In Progress** → Worker starts
4. **Completed** → Task finished

### Status Management

- Automatic status updates on actions
- Manual status changes available
- Status change history tracked
- Status-based filtering and views

## Task Integration

### Batch Integration

- Tasks linked to batches
- Batch detail shows related tasks
- Task completion can update batch status
- Batch movements create tasks

### Location Integration

- Tasks linked to locations
- Location detail shows tasks
- Location-based task filtering
- Tasks for location maintenance

### Operations Integration

- Tasks feed operations dashboard
- Task completion updates operations metrics
- Task status affects capacity planning
- Task history for reporting

## Task Data Model

### Task Structure

```typescript
interface Task {
  id: string;
  species: string;
  action: string;
  title?: string;
  location: string;
  due: string;
  dueDate?: string;
  status: "Pending" | "In Progress" | "Scheduled" | "Completed" | "overdue" | "today" | "upcoming";
  batch: string;
  assignee?: string;
  priority?: "High" | "Medium" | "Low";
  type?: "Watering" | "Potting" | "Sowing" | "Movement" | "Quality Check" | "Treatment";
  estimatedHours?: number;
  instructions?: string[];
  quantity?: string;
}
```

### Task Properties

- **id** - Unique task identifier
- **species** - Related plant species
- **action** - Action description
- **title** - Task title (optional, defaults to action)
- **location** - Task location
- **due** - Due time/date string
- **dueDate** - Due date (ISO format)
- **status** - Current status
- **batch** - Linked batch ID
- **assignee** - Assigned worker
- **priority** - Priority level
- **type** - Task type
- **estimatedHours** - Time estimate
- **instructions** - Step-by-step instructions
- **quantity** - Quantity description

## Task Analytics

### Task Metrics

- Total tasks by status
- Tasks due today
- Overdue tasks count
- Tasks by priority
- Tasks by type
- Average completion time
- Worker productivity metrics

### Task Reports

- Task completion reports
- Worker performance reports
- Task type distribution
- Location task load
- Task timeline analysis

## Notifications and Alerts

### Task Alerts

- Overdue task alerts
- Tasks due today
- High priority task notifications
- Task assignment notifications (future)

### Dashboard Alerts

- Overdue tasks highlighted
- Urgent tasks flagged
- Task completion reminders

## Mobile Optimization

### Worker Mobile View

- Simplified task list
- Quick task completion
- Easy navigation
- Touch-optimized interface

### Mobile Features

- Bottom navigation for workers
- Quick scan to access tasks
- Offline task viewing (future)
- Photo upload for task completion (future)
