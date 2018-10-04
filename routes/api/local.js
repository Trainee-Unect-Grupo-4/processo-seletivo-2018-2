const express = require("express");
const router = express.Router();

//Modelo do Local
const Local = require("../../models/Local");

// Postando um local no MongoDB

router.post("/create", (req, res) => {
  const newLocal = new Local({
    nome: req.body.nome,
    moradia: req.body.moradia,
    vagas: req.body.vaga,
    quarto: req.body.quarto,
    mobilia: req.body.mobilia,
    valor: req.body.valor,
    grupo: req.body.grupo,
    endereco: req.body.endereco,
    telefone: req.body.telefone,
    email: req.body.email,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  });

  newLocal.save().then(item => res.json(item));
  res.redirect("http://127.0.0.1:5500/Cadastrar.html");
});
// Coletando todos os locais no banco.

router.get("/", (req, res) => {
  const local = Local.find();
  local.then(local => res.json({ array: local }));
});

//Exibindo locais do banco seguindo um filtro
// router.post("/filtro", (req, res) => {
//   //console.log(req.body.moradia);
//   //var filtro = JSON.parse(req.body.moradia);
//   var consulta = Local.find();
//   if (req.body.moradia != undefined) {
//     consulta = consulta.find({ moradia: req.body.moradia });
//   }
//   if (req.body.vaga != undefined) {
//     consulta = consulta.find({ vagas: req.body.vaga });
//   }
//   if (req.body.valor != undefined) {
//     consulta = consulta.find({ valor: req.body.valor });
//   }
//   if (req.body.quarto != undefined) {
//     consulta = consulta.find({ quarto: req.body.quarto });
//   }
//   if (req.body.mobilia != undefined) {
//     consulta = consulta.find({ mobilia: req.body.mobilia });
//   }
//   if (req.body.grupo != undefined) {
//     consulta = consulta.find({ grupo: req.body.grupo });
//   }
//   const local = consulta;
//   local.then(local => res.json({ array: local }));
// });

module.exports = router;
