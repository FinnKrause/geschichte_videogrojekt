const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST"]
}));
app.use(bodyParser.json({limit: '950mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '950mb', extended: true}));
app.use(bodyParser.text({limit: '950mb', extended: true}));

const getPerson = (req) => req.params.person ? req.params.person.replace(":", "") : "NotLoggedIn";

app.use(express.static("public"));

const path = "/NAS/Finn/Schule/10C/Geschichte/Film/DokumenteForDownload/"
const allowed = ["alena" , "arda" , "carla" , "christian" , "christoph" , "dulce" , "elena" , "finn" , "marthinus" , "hendrik" , "leopold" , "lucas" , "marleen" , "marlene" , "moritz" , "sanna" , "sophia", "florian", "app"]

const getIndexForName = (name, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === name) return i;
  }
  return undefined;
}

const g = (dateiname) => path+dateiname
const l = (filename, person) => {
  console.log("File accessed: " + filename + " by " + person);
}
const isAllowed = (person) => {
  if (!person) return false;
  return allowed.includes(person)
}

app.get("/getTableData/:person", (req, res) => {
  const person = getPerson(req);
  if (isAllowed(person)) {
    console.log("Got the table data by: " + person)
    res.json(JSON.parse(fs.readFileSync("./table.json", "utf-8")))
  }
  else res.json({error: true})
})

app.post("/createblogpost/:person", (req, res) => {
  const person = getPerson(req);
  if (!isAllowed(person)) return;
  const warteliste = JSON.parse(fs.readFileSync("./warteliste.json", "utf-8"))
  console.log("Added new Blog post to the waiting list by:  "+person)

  warteliste.push(req.body);
  fs.writeFileSync("./warteliste.json", JSON.stringify(warteliste));
  res.send("DONE")
})

app.get("/getAllWaitingPosts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("./warteliste.json"));
  for (let i = 0; i < posts.length; i++) {
    posts[i].Image = []
  }
  res.json(posts)
})

app.post("/approvePost/:postHeader", (req, res) => {
  const warteliste = JSON.parse(fs.readFileSync("./warteliste.json"))
  console.log("Rejected: " + req.params.postHeader)
  let index = undefined;
  for (let i = 0; i < warteliste.length; i++) {
    if (warteliste[i].Überschrift === req.params.postHeader) {
      index = i;
    } else continue;
  }
  if (index === undefined) {
    res.json({
      error: true, desc: "This post was not found!"
    })
    return;
  }
  const betreffenderPost = warteliste[index];
  const BlogPosts = JSON.parse(fs.readFileSync("./blogposts.json", "utf-8"))
  BlogPosts.push(betreffenderPost);
  warteliste.splice(index);
  fs.writeFileSync("./blogposts.json", JSON.stringify(BlogPosts))
  fs.writeFileSync("./warteliste.json", JSON.stringify(warteliste))
  res.json({error: false, desc: "Alles hat geklappt!"})

})

app.post("/declinePost/:postHeader", (req, res) => {
  const warteliste = JSON.parse(fs.readFileSync("./warteliste.json"))
  console.log("Rejected: " + req.params.postHeader)
  let index = undefined;
  for (let i = 0; i < warteliste.length; i++) {
    if (warteliste[i].Überschrift === req.params.postHeader) {
      index = i;
    } else continue;
  }
  if (index === undefined) {
    res.json({
      error: true, desc: "This post was not found!"
    })
    return;
  }
  warteliste.splice(index);
  fs.writeFileSync("./warteliste.json", JSON.stringify(warteliste))
  res.json({error: false, desc: "Alles hat geklappt!"})
})

app.post("/setTableData/:person", (req, res) => {
  const person = getPerson(req);
  if (isAllowed(person)) {
    fs.writeFileSync("./table.json", JSON.stringify(req.body, null, 2));
    console.log("["+person+"] updated the table!")
    res.send("DONE")
    return;
  }
})

app.get("/getblogposts/:joke", (req, res) => {
  if (req.params.joke === "true") res.json(JSON.parse(fs.readFileSync("./blogposts_byChristoph.json", "utf-8")));
  else res.json(JSON.parse(fs.readFileSync("./blogposts.json", "utf-8")));
})

app.get("/getUserData/:app", (req, res) => {
  if (req.params.app.replace(":", "").toLowerCase() === "app") {
    res.json(JSON.parse(fs.readFileSync("./userData.json")));
  }
  else res.json({error: true})
})

app.get("/imon/:person/:status", (req, res) => {
  const person = getPerson(req);
  const isStatusPage = req.params.status.replace(":", "").toLocaleLowerCase()
  const oldData = JSON.parse(fs.readFileSync("./userData.json", "utf-8"));
  if (!oldData) {
    res.json({error: true, desc: "No UserData could be read on the disk"});
    return;
  }
  const personNameToBeUsed = isAllowed(person) ? person : "NotLoggedIn";
  const indexOfPerson = getIndexForName(personNameToBeUsed, oldData);
  
  if (indexOfPerson === undefined || indexOfPerson === null) {
    oldData.push({name: personNameToBeUsed, views: 1, statusPage: 0})
  }
  else {
    if(isStatusPage === "false") oldData[indexOfPerson].views = oldData[indexOfPerson].views+1;
    else oldData[indexOfPerson].statusPage = oldData[indexOfPerson].statusPage+1;
  }
  
  fs.writeFileSync("./userData.json", JSON.stringify(oldData, null, 2));
  res.json({error: false, desc: ""})
})

app.get("/:fileName/:person/:DiggaIchWill", (req, res) => {
  const fileName = req.params.fileName.replace(":", "") || "No filename given!";
  const person = getPerson(req);
  switch(fileName) {
    case "abhaken": res.sendFile(g("Abhaken.pdf")); break;
    case "eltern": res.sendFile(g("Einverstaendnis_Mitwirkung_Foto_Film_Umbruchszeiten.pdf")); l(fileName,person); break;
    case "lehrer": res.sendFile(g("Einverständniserklärung-der-Eltern_gesetzlichen-Vertretung.pdf"));l(fileName,person); break;
    case "brd": res.sendFile(g("Fragenkatalog - BRD.pdf"));l(fileName,person); break;
    case "ddr": res.sendFile(g("Fragenkatalog - DDR.pdf"));l(fileName,person); break;
    case "full": res.sendFile(g("Fragenkatalog.pdf"));l(fileName,person); break;
    case "tipps": res.sendFile(g("Tipps_Zeitzeugengespräche_Umbruchszeiten.pdf"));l(fileName,person); break;
    case "checkliste": res.sendFile(g("Interview Checkliste.pdf"));l(fileName,person); break;
    case "ausgefüllt": res.sendFile(g("Interview abghehakte Checklisten.pdf"));l(fileName,person); break;
    default: res.send("Digga du Huan versuch ned meine Seite zu hacken! Piss dich!");l("Hacker",person); break;
  }
})

app.listen(5009, console.log("Geschichte Running"));
  