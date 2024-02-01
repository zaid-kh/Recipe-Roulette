
# Recipe Roulette

Recipe Roulette is a web application that helps you discover new recipes based on available ingredients and your dietary preferences.



## Features

- **Search Recipes:** Find recipes based on the ingredients you have.
- **Save Favorites:** Save your favorite recipes for quick access.
- **Discover New Ideas:** Explore a variety of cuisines and cooking styles.


## Tech Stack

**Client:** 
- React with Vite
-  MaterialUI

**Server:** 
  - Node.js with Express
  - MongoDB as the database
  - Mongoose as an ODM 
  - bcrypt to encrypt passwords
  - JWT for user authentication

**Build and Deployment:**
- Netlify for the front-end
- Render for the back-end

## Demo

https://recipe-roulette-zaid.netlify.app/

** the app's backend is deployed on [Render](https://render.com/), which -on the free tier- [spins down on idle](https://docs.render.com/free#spinning-down-on-idle), so the first ever request would take a minute to respond.





## Run Locally


Clone the project

```bash
  git clone https://github.com/zaid-kh/Recipe-Roulette.git
```

### Running the client (React/Vite)
Go to the client directory

```bash
  cd Recipe-Roulette/client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm run start
```
### Running the server

Go to the server directory (from another terminal)

```bash
  cd Recipe-Roulette/sever
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

