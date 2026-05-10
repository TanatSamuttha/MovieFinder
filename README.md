# MovieFinder

## 🚀 How to start
### 📦 Prerequisites
  - Docker desktop
  - Firebase account (For authentication)
  - Supabase (Database)

### ⚙️ Supabase setup
#### Schema
    users
    - id (int8, Primary key)
    - uid (Varchar, Unique)
    - favorites (Varchar, Define as Array)
#### RLS policies
    create policy "policy_name"
    on "public"."users"
    as PERMISSIVE
    for ALL
    to public
    using (true) 
    with check (true);

### 🧩 Installation
  Clone this repository with this command
  ```
  git clone https://github.com/TanatSamuttha/MovieFinder.git
  ```
  Or
  ```
  git clone git@github.com:TanatSamuttha/MovieFinder.git
  ```

### 🔐 Environment Variables
  Create file ```.env``` in ```services/server``` using template from ```.env.expample```

### ▶️ Run the project
  ```
  docker compose up --build
  ```
