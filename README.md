
# NextJsFullStackSocialMedia MENN (Mongodb,express,Nextjs,Nodejs) application

This app is a mock of social media. which have features like creating an account and uploading photos and videos. also interect with other users. this app uses JWT auth js for authentication.

## Features

1) **Login/Signup**

- Users can create accounts by signing up with their email.
- Secure login to access the platform with personalized profiles.

2) **Create Posts with Photos and Videos**

- Users can share their experiences by creating posts with images and videos.
- An intuitive interface allows for easy multimedia content upload.

3) **View User Profiles**

- Explore other users' profiles to learn more about their interests and activities on the platform.
- Access a user's posted content and engagement.

4) **Search and Explore**

- Users can search for specific users using usernames.
- Explore a feed of contents from other users.

5) **Hashtags**

- Users can create and use hashtags to categorize their posts
- Users can follow specific hastags of their choice .
- Explore posts related to specific hashtags to discover content aligned with your interests.


## Running with Docker Compose

This guide provides instructions on how to run this MERN (Mongodb,Express,React,Nodejs) application using Docker, allowing for easy deployment and management of your application within a containerized environment.

#### Prerequisites

Before proceeding, ensure you have the following installed on your system ():

- Docker: [Install Docker](https://docs.docker.com/get-docker/)

### Getting Started

1) **Clone the Repository:** Clone the repository containing your Node.js application to your local machine.

  ```bash
  git clone https://github.com/ironsummit72/NextJsFullStackSocialMedia.git

  ```

2) **Navigate to the Application Directory:** Change your current directory to the root directory of your Node.js application.

  ```bash
  cd NextJsFullStackSocialMedia
  ```

3) **Running the Application:** To start the application using Docker Compose, run the following command:

  ```bash
  docker-compose up -d 
  ```

This command will build the Docker image (if it hasn't been built already) and start the containers defined in the docker-compose.yml file.

4) **Accessing the Application:** You can now access your MERN (Mongodb,Express,React,Nodejs) application by navigating to <http://localhost:3005> in your web browser.

## Installation Guide

Follow these steps to set up and run the NextJsFullStackSocialMedia  on your local environment:

**Step 1: Clone the Repository**

```bash
git clone https://github.com/ironsummit72/NextJsFullStackSocialMedia.git
```

**Step 2: Navigate to the Project Directory**

```bash
cd NextJsFullStackSocialMedia
```

**Step 3: Install Dependencies**

```bash
npm install
```

This command installs all the necessary dependencies for the project.

**Step 4: Copy Environment Variables**
Copy the environment variables from `.sample.env` to a new file named `.env` Customize the values in the `.env` file as needed.

```bash
cp .sample.env .env
```

**Step 5: Start the backend**

Start the backend by

```bash
cd backend 
```

This command compiles the Tailwind CSS and creates the output.css file.

**Step 6: Copy Environment Variables**
Copy the environment variables from `.sample.env` to a new file named `.env` Customize the values in the `.env` file as needed.

```bash
npm run dev
```

**Step 6: Start the Frontend**
 In root directory start the frontend by .

 ```bash
npm run dev
```

## Usage

- Sign up for an account or log in if you already have one.
- Create engaging posts with photos and videos.
- Explore other users' profiles and discover new content.
- Use the search feature to find specific users.
- Share short-lived stories for a more dynamic experience.

## What's New

New Features:

1) **Hashtags Feature Introduced**

- Users can create and utilize hashtags to categorize their posts.
- Explore posts related to specific hashtags to easily find and engage with content aligned with your interests.

## Upcoming Features

New Enhancements:

1) **Lazy Loading Of Content:**
 will soon be implementing lazy loading of content in the social media application. Lazy loading is a design pattern commonly used in web development to delay the loading of non-critical resources until they are needed.

2) **Explore Page with Followed Hashtags**

- The Explore page will be enhanced to display posts related to the hashtags you are following.

 3) **Personalized Feed with Similar Hashtags**

- Your feed will be curated to include posts from different users that share similar hashtags with your interests.
- Enhance your content discovery experience with a more personalized and relevant feed.

## Note

This Social Media express app is a hobby project created for learning purposes. The primary goal of this project is to provide a practical hands-on experience for developers to explore and enhance their skills in web development, particularly in building social media applications.
Please keep in mind that this platform is not intended for production use and may have limitations in terms of scalability, security, and robustness. It is encouraged to use this project as a playground for experimentation, learning, and collaboration within the developer community.
Happy coding!

## Additional Notes

Ensure you have Node.js installed on your machine. If not, you can download it from <https://nodejs.org/>.

Review the package.json file for more details on available scripts and dependencies.

Feel free to customize the application according to your specific needs.

Happy coding!

## Language

1) Typescript

## Tech Stack

1) Nodejs for the backend
2) NextJs for the frontend
3) Mongodb for database
4) Express for server (API)
