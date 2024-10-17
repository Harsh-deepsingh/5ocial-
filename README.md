# BlindlySocial

Description
BlindlySocial is a social networking platform designed for anonymous interactions within specific communities. The platform assigns users to communities based on their email domain, allowing them to post and comment anonymously. Users can also interact with other communities, fostering cross-community engagement while maintaining user anonymity.

 ## Features 
🔒 Anonymous Communities: Join communities based on your email domain, allowing you to connect with like-minded individuals.
🌍 Cross-Community Interaction: Post and comment in other communities while retaining anonymity.
📁 Media Uploads: Share images, videos, and files using UploadThing.
🔐 Secure Authentication: NextAuth.js ensures safe and secure sign-in for all users.
💻 Responsive UI: Sleek and modern design using Tailwind CSS and animations powered by Framer Motion.
🚀 Dockerized Deployment: Seamless deployment on AWS with Docker.


##Tech Stack
Frontend: React, Next.js, Tailwind CSS
Backend: Next.js API Routes, Prisma ORM, NeonDB (PostgreSQL)
Authentication: NextAuth.js
Database: NeonDB (PostgreSQL)
Animations: Framer Motion
File Uploads: UploadThing
Deployment: Docker on AWS


## Installation
Clone the repository:
```bash
git clone https://github.com/yourusername/blindlysocial.git
```

```bash
npm install
```

Create a .env file in the root directory with the following use .env.example.

Activate Database

```bash
npx prisma generate
```

```bash
npx prisma migrate dev
```
run locally
```bash
npm run dev
```
Your app should now be running on http://localhost:3000.


Contributing
Feel free to submit issues and pull requests! Contributions are welcome to enhance features or improve code quality even if it's just a readme contribution.
