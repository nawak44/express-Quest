const express = require("express");
const { validateMovie, validateUser } = require("./validators.js");
const { hashPassword } = require("./auth.js");

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

//app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.post("/api/users", validateUser, hashPassword, usersHandlers.postUsers);

app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, hashPassword, usersHandlers.updateUser);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", usersHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
