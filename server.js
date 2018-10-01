const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const local = require("./routes/api/local");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Add headers

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//Configurando o DB
const db = require("./config/keys").mongoURI;

//Concetar ao MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.log(err));

//Routes
app.use("/api/local", local);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`));
