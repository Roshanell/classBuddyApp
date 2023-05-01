## Class Budy 
ClassBuddy will give teachers a platform reinforce positive behaviors by using an incentive-based application that promotes positive classroom behaviors

Link to project: https://classbuddy.cyclic.app/



# How It's Made:
Tech used: HTML, CSS, JavaScript, Node, Express, Tailwind

This app is a web-based application built using MongoDB, Express, JavaScript, and Node, with authentication handled by Passport. The app's primary function is to allow teachers to manage their classroom store items such as school supplies and rewards, while also allowing students to earn points for positive behaviour. With this app, students can add, delete, and edit their inventory items, view their inventory history, and earn points for completing positive behaviour tasks.

The app was developed using a Model-View-Controller (MVC) architecture. Passport was used to handle user authentication and authorization, and form validation was implemented using a combination of client-side and server-side validation techniques.

Images were also added to the app using Cloudinary, a cloud-based image and video management platform. This allows students to add images of their inventory items, as well as any images related to positive behaviour tasks.


# Optimizations:

I'd like to refactor the code in order to add a purchase log so that accounts with administrative access can see what was purchased. I'd like to also add a way for administrators to add points to student accounts that are made.

# Lessons Learned:

During the development process, several important lessons were learned. Firstly, it is important to properly structure the codebase and implement consistent coding practices to ensure that the app remains maintainable and scalable. Secondly, it is important to ensure that the app is user-friendly and intuitive, with clear and concise error messages.

# Examples:

Take a look at these couple examples that I have in my own portfolio:


Sunnyside Marketing: https://sunny-side-marketing.netlify.app/
Blackjack App: https://play-black-jack.netlify.app/
Pomodoro Task Manager: https://task-manager-apppomodoro.netlify.app/
Vegetarian Checker: https://vegetarianchecker.netlify.app/
Shaken Not Stirred: https://shaken-not-stirred.netlify.app/
Guess the Number https://glittering-starburst-cf13fe.netlify.app/



# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

---

# Run
To get started with the Positive Behaviour Support System for Students Inventory Management App with Point System, simply download or clone the repository and install the necessary dependencies using npm. After installing the dependencies, start the app by running the command npm start in the terminal.

`npm start`
