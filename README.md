## TaskEase — Full-Stack Task Management System

A clean, responsive full-stack task management dashboard built with **ASP.NET Core Web API**, **Vue 3**, **Tailwind CSS**, and **Supabase (PostgreSQL)**. Designed to organize daily workflows, track real-time task progress, and manage priorities effortlessly.

---

## Key Features

- **Real-Time Summary Metrics:** Live calculation of Total Tasks, In Progress, Completed, and High Priority items.
- **Full CRUD Operations:** Create, view, edit, and delete tasks via an intuitive modal interface.
- **Instant Status Updates:** Change task statuses (`To Do`, `In Progress`, `In Review`, `Done`) directly from the task table via `PATCH` requests.
- **Dynamic Search & Filtering:** Filter tasks by status, priority level (`Low`, `Medium`, `High`), or search by title.
- **Clean Architecture:** Modular component-based frontend (`Composables` + reusable UI components) paired with a RESTful DTO-validated backend.

---

## Tech Stack

### Backend (`TaskEase.Api`)
- **Framework:** ASP.NET Core Web API (.NET 11)
- **ORM:** Entity Framework Core (EF Core 10)
- **Database:** PostgreSQL hosted on Supabase
- **Documentation:** Swagger / OpenAPI

### Frontend (`taskease-web`)
- **Framework:** Vue 3 (Composition API) + Vite
- **Styling:** Tailwind CSS v4
- **HTTP Client:** Axios
- **Icons:** Lucide Vue Next

---

## Project Structure

```text
TaskEase/
├── TaskEase.Api/                 # ASP.NET Core Backend
│   ├── Controllers/              # REST API Endpoints (TasksController)
│   ├── Data/                     # EF Core DbContext
│   ├── DTOs/                     # Request/Response Data Transfer Objects
│   ├── Migrations/               # PostgreSQL Database Migrations
│   ├── Models/                   # Domain Entities & Enums
│   └── Program.cs                # App Configuration, DI, & CORS
│
└── taskease-web/                 # Vue 3 Frontend
    └── src/
        ├── components/           # Modular UI Components (Sidebar, StatsGrid, Table, Modal)
        ├── composables/          # State Management & Business Logic (useTasks.js)
        ├── services/             # Axios API Client (taskApi.js)
        └── App.vue               # Main Layout Assembly

```

---

## Getting Started

### Prerequisites

* [.NET SDK](https://dotnet.microsoft.com/download)
* [Node.js](https://nodejs.org/) (v18+ recommended)
* A [Supabase](https://supabase.com/) PostgreSQL database instance

### 1. Clone the Repository

```bash
git clone [https://github.com/fnn-somruang/TaskEase.git](https://github.com/fnn-somruang/TaskEase.git)
cd TaskEase

```

### 2. Backend Setup (`TaskEase.Api`)

1. Navigate to the API directory:
```bash
cd TaskEase.Api

```


2. Create an `appsettings.Development.json` file and add your Supabase PostgreSQL connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=YOUR_SUPABASE_HOST;Port=5432;Database=postgres;Username=YOUR_USER;Password=YOUR_PASSWORD;SSL Mode=Require;Trust Server Certificate=true;"
  }
}

```


3. Apply database migrations and start the API server:
```bash
dotnet ef database update
dotnet run

```


The API will run at `http://localhost:5067` (Swagger UI available at `http://localhost:5067/swagger`).

### 3. Frontend Setup (`taskease-web`)

1. Open a new terminal and navigate to the frontend directory:
```bash
cd taskease-web

```


2. Install dependencies:
```bash
npm install

```


3. *(Optional)* Create a `.env` file to specify a custom API URL (defaults to `http://localhost:5067/api/Tasks`):
```env
VITE_API_URL=http://localhost:5067/api/Tasks

```


4. Start the development server:
```bash
npm run dev

```


Open your browser at `http://localhost:5173`.

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/Tasks` | Retrieve all tasks (supports `?status=`, `?priority=`, `?search=`) |
| `GET` | `/api/Tasks/{id}` | Retrieve a single task by ID |
| `POST` | `/api/Tasks` | Create a new task |
| `PUT` | `/api/Tasks/{id}` | Update an existing task |
| `PATCH` | `/api/Tasks/{id}/status` | Quickly update task status |
| `DELETE` | `/api/Tasks/{id}` | Delete a task |
