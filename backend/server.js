const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")

app.use(cors());
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(bodyParser.text({limit: '5mb', extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
})

app.use(express.static("public"));

const path = "/NAS/Finn/Schule/10C/Geschichte/Film/DokumenteForDownload/"
const allowed = ["alena" , "arda" , "carla" , "christian" , "christoph" , "dulce" , "elena" , "finn" , "marthinus" , "hendrik" , "leopold" , "lucas" , "marleen" , "marlene" , "moritz" , "sanna" , "sophia", "florian"]

const g = (dateiname) => path+dateiname
const l = (filename) => {
  console.log("File accessed: " + filename)
}

app.get("/getTableData/:Person", (req, res) => {
  if (allowed.includes(req.params.Person.toLowerCase().replace(":", ""))) {
    res.json(JSON.parse(fs.readFileSync("./table.json", "utf-8")))
  }
  else res.json({error: true})
})

app.post("/createblogpost/:person", (req, res) => {
  console.log("GOT")
  if (!allowed.includes(req.params.person.toLowerCase().replace(":", ""))) return;
  const oldData = JSON.parse(fs.readFileSync("./blogposts.json", "utf-8"))

  oldData.push(req.body);
  fs.writeFileSync("./blogposts.json", JSON.stringify(oldData));
  res.send("DONE")
})

app.post("/setTableData:/Person", (req, res) => {
  const newData = req.body;
    if (allowed.includes(req.params.Person.replace(":", ""))) {
    fs.writeFileSync(JSON.stringify(newData, null, 2));
    res.send("DONE")  
  }
  res.send("ERROR")  
})

app.get("/getblogposts", (req, res) => {
  res.json(JSON.parse(fs.readFileSync("./blogposts.json", "utf-8")));
})

app.get("/:fileName/:DiggaIchWill", (req, res) => {
  const fileName = req.params.fileName.replace(":", "");
  switch(fileName) {
    case "abhaken": res.sendFile(g("Abhaken.pdf")); break;
    case "eltern": res.sendFile(g("Einverstaendnis_Mitwirkung_Foto_Film_Umbruchszeiten.pdf")); l(fileName); break;
    case "lehrer": res.sendFile(g("Einverständniserklärung-der-Eltern_gesetzlichen-Vertretung.pdf"));l(fileName); break;
    case "brd": res.sendFile(g("Fragenkatalog - BRD.pdf"));l(fileName); break;
    case "ddr": res.sendFile(g("Fragenkatalog - DDR.pdf"));l(fileName); break;
    case "full": res.sendFile(g("Fragenkatalog.pdf"));l(fileName); break;
    case "tipps": res.sendFile(g("Tipps_Zeitzeugengespräche_Umbruchszeiten.pdf"));l(fileName); break;
    case "checkliste": res.sendFile(g("Interview Checkliste.pdf"));l(fileName); break;
    default: res.send("Digga du Huan versuch ned meine Seite zu hacken! Piss dich!");l("Hacker"); break;
  }
})


app.listen(5009, console.log("Geschichte Running"));
  