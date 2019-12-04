const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");

const bodyParser = require("body-parser");
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  console.log("Connected to the MySQL server.");
});

////////////////// GET /////////////////

app.get("/api/books", (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query("SELECT * FROM books;", (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send("Erreur lors de la récupération des livres");
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

////////////////// GET LIGHT /////////////////

app.get("/api/books/titles", (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query("SELECT title FROM books;", (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res
        .status(500)
        .send("Erreur lors de la récupération des titres des livres");
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

////////////////// FILTRE CONTIENT /////////////////

app.get("/api/books/containsEmmerder", (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query(
    "SELECT title FROM books WHERE title  LIKE '%emmerder%';",
    (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res
          .status(500)
          .send(
            "Erreur lors de la récupération des titres des livres en stock"
          );
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    }
  );
});

////////////////// FILTRE COMMENCE PAR/////////////////

app.get("/api/books/beginswithH", (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query(
    "SELECT title FROM books WHERE title  LIKE 'H%';",
    (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res
          .status(500)
          .send(
            "Erreur lors de la récupération des titres des livres en stock"
          );
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    }
  );
});

////////////////// FILTRE DATE SUPERIEURE/////////////////

app.get("/api/books/lastparution", (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query(
    "SELECT title, parution_date FROM books WHERE parution_date > '2019-08-05';",
    (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res
          .status(500)
          .send("Erreur lors de la récupération des derniers livres parus");
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    }
  );
});

////////////////// FILTRE DATE ASC or DESC/////////////////

app.get("/api/books/parution/:order", (req, res) => {
  // connection à la base de données, et sélection des employés
  connection.query(
    `SELECT title, parution_date FROM books ORDER BY parution_date ${order};`,
    (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res
          .status(500)
          .send(
            "Erreur lors de la récupération des parutions par ordre chronologique"
          );
      } else {
        // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
        res.json(results);
      }
    }
  );
});


////////////////// POST /////////////////

app.post("/api/books", (req, res) => {
  // Get the data sent
  const formData = req.body;

  // connection to the database, and insertion of the employee
  connection.query("INSERT INTO books SET ?", formData, (err, results) => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
      console.log(err);
      res.status(500).send("Error saving a new book");
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

////////////////// PUT /////////////////

// écoute de l'url "/api/books"
app.put("/api/books/:id", (req, res) => {
  // récupération des données envoyées
  const idBook = req.params.id;
  const formData = req.body;

  // connection à la base de données, et insertion du livre
  connection.query(
    "UPDATE books SET ? WHERE id = ?",
    [formData, idBook],
    err => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un livre");
      } else {
        // Si tout s'est bien passé, on envoie un statut "ok".
        res.sendStatus(200);
      }
    }
  );
});

//////////////////PUT - Toggle du booléen//////////////////

// écoute de l'url "/api/books"
app.put("/api/books/isavailable/:id", (req, res) => {
    // récupération des données envoyées
    const idBook = req.params.id;
   
    // connection à la base de données, et insertion du livre
    connection.query(
      "UPDATE books SET is_available = !is_available WHERE id = ?",
      [idBook],
      err => {
        if (err) {
          // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
          console.log(err);
          res
            .status(500)
            .send(
              "Erreur lors de la modification de la disponibilité d'un livre"
            );
        } else {
          // Si tout s'est bien passé, on envoie un statut "ok".
          res.sendStatus(200);
        }
      }
    );
  });




//////////////////DELETE//////////////////

// écoute de l'url "/api/employees"
app.delete("/api/booksdelete/:id", (req, res) => {
  // récupération des données envoyées
  const idBook = req.params.id;

  // connexion à la base de données, et suppression de l'employé
  connection.query("DELETE FROM books WHERE id = ?", [idBook], err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un livre");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});




//////////////////DELETE booleen//////////////////

// écoute de l'url "/api/employees"
app.delete("/api/unaivalaibleooksdelete", (req, res) => {
  // récupération des données envoyées
  const idBook = req.params.id;

  // connexion à la base de données, et suppression de l'employé
  connection.query("DELETE FROM books WHERE is_available = 0", err => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un livre");
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});




app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
