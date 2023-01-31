const express = require("express");
const { validateMovie, validateUser } = require("./validators.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth"); // don't forget to import

const app = express();

const port = 5000;

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.use(express.json()); // add this line

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users", usersHandlers.getUsers);
app.get("/api/users/:id", usersHandlers.getUsersById);

app.post(
  "/api/login",
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
); // /!\ login should be a public route

app.post("/api/users", validateUser, hashPassword, usersHandlers.postUsers);

// then the routes to protect
app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

app.put("/api/users/:id", validateUser, hashPassword, usersHandlers.updateUser);
app.delete("/api/users/:id", usersHandlers.deleteUser);
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
