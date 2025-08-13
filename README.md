# Auth Movie Facts App

A web application that allows users to authenticate with Google, select their favorite movie, and discover interesting facts about that movie. 

Read my small brainstorming documentation: [Project Documentation](https://www.notion.so/Scowtt-Take-Home-Assignment-24db3231923b80bfa920e7c1cc516808?source=copy_link)

## Features

- **Google Authentication**: Secure login using Google OAuth
- **Favorite Movie Selection**: Choose from a curated list of popular movies
- **Movie Facts Dashboard**: Discover interesting facts about movies
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface with shadcn/ui components

## Tech Stack

-

## Getting Started

### Whats needed

- Google Console Cloud Account - For ClientId - For Authentication
- Database URL - in this case Supabase 
- Google OAuth credentials
- LLM API Key - in this case GEMINI API KEY



### Installation

1. Clone the repository:

2. Install dependencies:

```bash
npm install
npm install -D @tailwindcss/postcss
npx shadcn@latest 
npm install next-auth @next-auth/prisma-adapter @prisma/client prisma pg
npx prisma migrate dev --name init    
````

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Google OAuth credentials:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
DATABASE_URL=
GEMINI_API_KEY=
```

4. Run the development server:

```bash
npm run dev
```


5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

* `app/` — Next.js App Router directory

  * `api/` — API routes for auth and movie fact fetching and NextAuth configuration
  * `dashboard/` — Protected user dashboard page
  * `favorite-movie/` — Page for users to set their favorite movie
  * `login/` — Login page with Google OAuth
  * `page.tsx` — Main Landing Page

* `.env` — Environment variables
* `prisma/` — Schema for database 
* `components/` — Reusable React components

---

## Usage

### The Page Flow

1. **Landing**: Users start at the main page 
2. **Login**: From Landing page user redirects to the login page and authenticate with Google.
3. **Movie Selection**: After login, users submit their favorite movie. 
4. **Dashboard**: Users can view their google information, their favorite movie and one interesting fact about the movie. Additionally Logout button which redirects back to the login page.


## Features in Detail

### Authentication
- Secure Google OAuth integration
- Session management
- Protected routes

### Movie Selection
- Form type prompt to ask for users favorite movie

### Dashboard
- Random movie facts
- User profile display
- Clean, card-based layout
- Logout Button



