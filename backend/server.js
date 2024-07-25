const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const axios = require("axios");

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST"]
}));

app.use(bodyParser.json({ limit: '950mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '950mb', extended: true }));
app.use(bodyParser.text({ limit: '950mb', extended: true }));
app.use(express.static("public"));

const getPerson = (req) => isAllowed(req.params.person || "nichterlaubt") ? req.params.person.replace(":", "") : "NotLoggedIn";

const logMessage = (message) => {
  const date = new Date();
  const Datumsanzeige = `[${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}] `
  const Message = Datumsanzeige + message;

  const allLogs = JSON.parse(fs.readFileSync("./logs.json", "utf-8"))
  allLogs.push({ date: Datumsanzeige, message })
  fs.writeFileSync("./logs.json", JSON.stringify(allLogs, null, 2));

  console.log(Message)
}

const getReturnJSON = (success, message, data) => {
  return { success, message, data }
}


const path = "/NAS/Finn/Schule/10C/Geschichte/Film/DokumenteForDownload/"
const allowed = ["alena", "arda", "carla", "christian", "christoph", "dulce", "elena", "finn", "marthinus", "hendrik", "leopold", "lucas", "marleen", "marlene", "moritz", "sanna", "sophia", "florian", "app"]

const getIndexForName = (name, data) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].name === name) return i;
  }
  return undefined;
}

const getMagentaColor = (text) => {
  return `\x1b[35m${text}\x1b[0m`;
};

const g = (dateiname) => path + dateiname
const l = (filename, person) => logMessage(person + " accessed \"" + filename + "\"");

const isAllowed = (person) => {
  if (!person) return false;
  return allowed.includes(person)
}

app.get("/getTableData/:person", (req, res) => {
  const person = getPerson(req);
  if (isAllowed(person)) {
    res.json(getReturnJSON(true, null, JSON.parse(fs.readFileSync("./table.json", "utf-8"))))
  }
  else res.json(getReturnJSON(false, "Access denied!", null))
})

app.post("/createblogpost/:person", (req, res) => {
  const person = getPerson(req);
  if (!isAllowed(person)) return;
  const warteliste = JSON.parse(fs.readFileSync("./warteliste.json", "utf-8"))
  logMessage("New Blogpost (" + req.body.Überschrift + ") by " + person + " waiting")

  warteliste.push(req.body);
  fs.writeFileSync("./warteliste.json", JSON.stringify(warteliste));
  res.json(getReturnJSON(true, "Blogpost created!", null))
})

app.get("/getAllWaitingPosts", (req, res) => {
  const posts = JSON.parse(fs.readFileSync("./warteliste.json"));
  for (let i = 0; i < posts.length; i++) {
    posts[i].Image = []
  }
  res.json(getReturnJSON(true, null, posts))
})

app.post("/approvePost/:postHeader", (req, res) => {
  const warteliste = JSON.parse(fs.readFileSync("./warteliste.json"))
  let index = undefined;
  for (let i = 0; i < warteliste.length; i++) {
    if (warteliste[i].Überschrift === req.params.postHeader.replace(":", "")) {
      index = i;
    } else continue;
  }
  if (index === undefined) {
    res.json(getReturnJSON(false, "This post could not be found!", null))
    logMessage("Error in accepting \"" + req.params.postHeader + "\"")
    return;
  }
  const betreffenderPost = warteliste[index];
  const BlogPosts = JSON.parse(fs.readFileSync("./blogposts.json", "utf-8"))
  BlogPosts.push(betreffenderPost);

  //Deleting the one Entrie in the waitinglist
  const newWaitingList = []
  for (let i = 0; i < warteliste.length; i++) {
    if (i === index) continue;
    newWaitingList.push(warteliste[i])
  }

  fs.writeFileSync("./blogposts.json", JSON.stringify(BlogPosts, null, 2))
  fs.writeFileSync("./warteliste.json", JSON.stringify(newWaitingList, null, 2))
  res.json(getReturnJSON(true, null, null))
  logMessage("Accepted new Blogpost (" + req.params.postHeader + ")")

})

app.post("/declinePost/:postHeader", (req, res) => {
  const warteliste = JSON.parse(fs.readFileSync("./warteliste.json"))
  const header = req.params.postHeader.replace(":", "")
  let index = undefined;
  for (let i = 0; i < warteliste.length; i++) {
    if (warteliste[i].Überschrift === header) {
      index = i;
    } else continue;
  }
  if (index === undefined) {
    res.json(getReturnJSON(false, "This post could not be found!", null))
    logMessage("Error in declining \"" + req.params.postHeader + "\"")
    return;
  }

  //Deleting the one Entrie in the waitinglist
  const newWaitingList = []
  for (let i = 0; i < warteliste.length; i++) {
    if (i === index) continue;
    newWaitingList.push(warteliste[i])
  }

  fs.writeFileSync("./warteliste.json", JSON.stringify(newWaitingList, null, 2))
  res.json(getReturnJSON(true, null, null))
  logMessage("Declined Blogpost (" + req.params.postHeader + ")")
})

app.post("/setTableData/:person", (req, res) => {
  const person = getPerson(req);
  if (isAllowed(person)) {
    fs.writeFileSync("./table.json", JSON.stringify(req.body, null, 2));
    logMessage("Interviewstatus updated")
    res.json(getReturnJSON(true, "Table updated!", null))
    return;
  }
})

app.get("/getblogposts/:joke", (req, res) => {
  if (req.params.joke === "true") res.json(getReturnJSON(true, null, JSON.parse(fs.readFileSync("./blogposts_byChristoph.json", "utf-8"))));
  else res.json(getReturnJSON(true, null, JSON.parse(fs.readFileSync("./blogposts.json", "utf-8"))));
})

app.get("/getUserData/:app", (req, res) => {
  if (req.params.app.replace(":", "").toLowerCase() === "app") {
    res.json(getReturnJSON(true, null, JSON.parse(fs.readFileSync("./userData.json"))));
  }
  else res.json(getReturnJSON(true, "Forbidden", null))
})

app.get("/imon/:person/:status", (req, res) => {
  const person = getPerson(req);
  const isStatusPage = req.params.status.replace(":", "").toLocaleLowerCase()
  const oldData = JSON.parse(fs.readFileSync("./userData.json", "utf-8"));
  if (!oldData) {
    res.json(getReturnJSON(false, "No UserData could be read on the disk", null));
    return;
  }
  const personNameToBeUsed = isAllowed(person) ? person : "NotLoggedIn";
  const indexOfPerson = getIndexForName(personNameToBeUsed, oldData);

  if (indexOfPerson === undefined || indexOfPerson === null) {
    oldData.push({ name: personNameToBeUsed, views: 1, statusPage: 0 })
  }
  else {
    if (isStatusPage === "false") oldData[indexOfPerson].views = oldData[indexOfPerson].views + 1;
    else oldData[indexOfPerson].statusPage = oldData[indexOfPerson].statusPage + 1;
  }

  fs.writeFileSync("./userData.json", JSON.stringify(oldData, null, 2));
  res.json(getReturnJSON(true, null, null))
})

app.get("/clickOnVideoLink/:person", (req, res) => {
  const person = getPerson(req);
  const oldData = JSON.parse(fs.readFileSync("./userData.json", "utf-8"));
  const ip = req.headers["x-real-ip"] ? req.headers["x-real-ip"].split(",")[0] : "NoIP";

  const index = getIndexForName(person, oldData);

  if (index === undefined) {
    res.json(getReturnJSON(false, "Person nicht im userData Verzeichnis!", null))
    logMessage("Person die nicht im userData Verzeichnis ist hat den Videolink gedrückt")
    return;
  }

  axios.get("http://ip-api.com/json/" + ip).then(response => {
    delete response.data.status
    delete response.data.countryCode
    delete response.data.region
    delete response.data.lat
    delete response.data.lon
    delete response.data.timezone
    delete response.data.isp
    delete response.data.org
    delete response.data.as

    response.data["ip"] = response.data.query;
    delete response.data.query

    const resToWorkWith = response.data;

    if (!oldData[index].ViewIPs) {
      oldData[index].ViewIPs = [resToWorkWith]
    } else {
      let changed = false;
      for (let i = 0; i < oldData[index].ViewIPs.length; i++) {
        if (oldData[index].ViewIPs[i].ip === response.data.ip) {

          const obj = oldData[index].ViewIPs[i];
          obj["videoClicks"] = !obj["videoClicks"] ? 2 : +obj["videoClicks"] + 1
          oldData[index].ViewIPs[i] = obj;
          changed = true;
        }
      }
      if (!changed) {
        oldData[index].ViewIPs.push(resToWorkWith);
      }
    }

    oldData[index].videoClicks = !oldData[index].videoClicks ? 1 : oldData[index].videoClicks + 1

    logMessage(`${person === "NotLoggedIn" ? "Unbekannte Person" : person} hat von ${response.data.ip} aus ${response.data.city ? (
      (response.data.city === "Berlin") ? getMagentaColor(response.data.city) : response.data.city
    ) : "NoCity"} auf den Videolink gedrückt!`)
    fs.writeFileSync("./userData.json", JSON.stringify(oldData, null, 2))
    res.json(getReturnJSON(true, null, null))
  })


})

app.get("/getAllLogs/:app", (req, res) => {
  if (req.params.app.replace(":", "") !== "true") {
    res.json(getReturnJSON(false, "Access forbidden!", null))
    return;
  }

  const Logs = JSON.parse(fs.readFileSync("./logs.json", "utf8")).reverse().slice(0, 50);
  res.json(getReturnJSON(true, null, Logs))
})

app.get("/:fileName/:person/:DiggaIchWill", (req, res) => {
  const fileName = req.params.DiggaIchWill.replace(":", "") || "No filename given!";
  const person = getPerson(req);
  switch (req.params.fileName.replace(":", "") || "none") {
    case "abhaken": res.sendFile(g("Abhaken.pdf")); break;
    case "eltern": res.sendFile(g("Einverstaendnis_Mitwirkung_Foto_Film_Umbruchszeiten.pdf")); l(fileName, person); break;
    case "lehrer": res.sendFile(g("Einverständniserklärung-der-Eltern_gesetzlichen-Vertretung.pdf")); l(fileName, person); break;
    case "brd": res.sendFile(g("Fragenkatalog - BRD.pdf")); l(fileName, person); break;
    case "ddr": res.sendFile(g("Fragenkatalog - DDR.pdf")); l(fileName, person); break;
    case "full": res.sendFile(g("Fragenkatalog.pdf")); l(fileName, person); break;
    case "tipps": res.sendFile(g("Tipps_Zeitzeugengespräche_Umbruchszeiten.pdf")); l(fileName, person); break;
    case "checkliste": res.sendFile(g("Interview Checkliste.pdf")); l(fileName, person); break;
    case "ausgefüllt": res.sendFile(g("Interview abghehakte Checklisten.pdf")); l(fileName, person); break;
    case "berlin": res.sendFile(g("Berlin.pdf")); l(fileName, person); break;
    case "zugtickets": res.sendFile(g("Zugtickets.pdf")); l(fileName, person); break;
    default: res.send("Digga du Huan versuch ned meine Seite zu hacken! Piss dich!"); l("Hacker", person); break;
  }
})

app.get("/getBerlinTour/:user", (req, res) => {
  const person = getPerson(req);
  if (!person) {
    res.json(getReturnJSON(false, "Access denied!"))
  }

  const data = JSON.parse(fs.readFileSync("./berlintour.json", "utf-8"));
  if (data) {
    res.json(getReturnJSON(true, null, data))
  } else {
    res.json(getReturnJSON(false, "berlintour.json could not be loaded!", null))
  }

})

app.post("/setBerlinTour/:user", (req, res) => {
  if (!req.params.user.replace(":", "") == "app") return;

  fs.writeFileSync("./berlintour.json", JSON.stringify(req.body));
  logMessage("Berlintour updated von der App!")
  res.json(getReturnJSON(true, null, null))

});

app.listen(7777, logMessage("Geschichte Running")); //5009
