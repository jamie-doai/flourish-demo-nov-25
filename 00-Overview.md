# Flourish - Nursery Management Platform

## Overview

Flourish is a comprehensive digital platform purpose-built for production nurseries to manage the complete plant lifecycle from seed to sale. The platform replaces spreadsheets with a complete system designed for managers, supervisors, and greenhouse workers to track batches, manage tasks, handle sales, and grow with clarity and control.

## Value Proposition

Flourish provides:
- **100% Traceability** - Track every plant from seed to sale
- **Complete Lifecycle Management** - Manage batches, inventory, tasks, and sales in one platform
- **Team Collaboration** - Built for managers, supervisors, and greenhouse workers
- **Smart Analytics** - Get insights on yield, success rates, and forecasting
- **Sales Management** - Handle quotes, orders, and invoices in one place

## Target Users

### Managers
Managers have full access to all features including:
- Batch tracking and management
- Inventory oversight and control
- Sales management (quotes, orders, invoices)
- Operations and task management
- Reporting and analytics
- System settings and configuration

### Workers
Workers have access to operational features:
- View assigned tasks
- Complete task workflows
- View inventory and batch information
- Add new batches
- Scan functionality for quick access

## Core Features

### 1. Batch Tracking
Complete traceability of every plant batch from creation through to sale. Track batch types (seed, cuttings, bought-in), locations, stages, costs, and lineage relationships.

### 2. Inventory Management
Multi-view inventory system with location hierarchy (Buildings → Bays → Tables), species-based views, stage-based views, and location-based views. Includes bulk operations and stocktake management.

### 3. Sales Management
End-to-end sales workflow from quotes to invoices:
- Create and manage quotes
- Convert quotes to orders
- Track order lifecycle stages
- Generate invoices from orders
- Manage client relationships
- Inventory selection for sales

### 4. Task & Operations Management
Streamline daily operations with task management:
- Task assignment and tracking
- Operations dashboard (Kanban-style board)
- Task types: Watering, Potting, Sowing, Movement, Quality Check, Treatment
- Priority and status management
- Worker task views

### 5. Reporting & Analytics
Business intelligence and cost analysis:
- Cost analysis and production value tracking
- Cost by species analysis
- Batch cost summaries
- Production insights and KPIs

### 6. Planning & Forecasting
Production planning and capacity management (feature in development).

### 7. Settings & Configuration
System administration:
- User management
- Location configuration
- Species catalog management
- Cost library management
- System preferences

## Navigation Structure

### Manager Navigation
Primary navigation includes:
- **Inventory** - Batch and inventory management
- **Operations** - Task and workflow management
- **Sales** - Quotes, orders, invoices, clients
- **Planning** - Production planning and forecasting
- **Settings** - System configuration
- **Reporting** - Analytics and cost analysis

### Worker Navigation
Simplified navigation focused on:
- **Home** - Dashboard view
- **Tasks** - Assigned tasks and completion
- **Inventory** - View inventory and batches
- **Locations** - Location information
- **Scan** - Quick access via scanning

## Key Capabilities

### Batch Lifecycle
- Create batches with multi-step wizard (type, species, source, location, details, quantities, costs, attachments)
- Track batch movements across locations
- Monitor batch stages and health
- Record costs and cost history
- Split, merge, and duplicate batches
- Track batch lineage and relationships

### Location Management
- Hierarchical location structure (Buildings → Bays → Tables)
- Location capacity tracking
- Environmental data (temperature, humidity)
- Location-based inventory views

### Cost Tracking
- Per-batch cost tracking
- Cost categories (labor, materials, overhead, etc.)
- Cost history and versioning
- Cost library for standard costs
- Cost analysis and reporting

### Sales Workflow
- Quote creation with inventory selection
- Quote conversion to orders
- Order lifecycle management (pending → approved → in progress → ready to dispatch → dispatched → completed)
- Invoice generation from orders
- Stock reservation for orders
- Client management

### Task Management
- Task creation and assignment
- Task status tracking (Pending, In Progress, Scheduled, Completed)
- Priority levels (High, Medium, Low)
- Task types with specific workflows
- Operations dashboard with Kanban view
- Task filtering and search

## Application Architecture

Flourish is built as a modern React single-page application using:
- **Vite** for build tooling and development server
- **React 18** with TypeScript for type safety
- **React Router** for client-side routing
- **shadcn-ui** component library
- **Tailwind CSS** for styling
- **React Query** for server state management
- **Zod** for validation

The application uses a feature-based structure with separate views for managers and workers, code splitting for performance, and a comprehensive component library for consistent UI.
