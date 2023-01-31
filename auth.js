const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  // hash the password using argon2 then call next()
  // const hashedPassword = await argon2.hash(password, hashingOptions);

  argon2
    .hash(req.body.password, hashingOptions) // récupère la valeur de password
    .then((hashedPassword) => {
      // do something with hashedPassword
      console.log("mon hasched", hashedPassword);
      req.body.hashedPassword = hashedPassword; //ici on créer la clé hashedPassword et attribut la valeur
      delete req.body.password; // on supprime la valeur clé password
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  hashPassword,
};
