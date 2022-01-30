const express = require("express");
const app = express();

app.use(express.static("public"));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  next();
});

const path = "/NAS/Finn/Schule/10C/Geschichte/Film/DokumenteForDownload/"

const g = (dateiname) => path+dateiname

  app.get("/:fileName/:DiggaIchWill", (req, res) => {
  const fileName = req.params.fileName.replace(":", "");
  switch(fileName) {
    case "abhaken": res.sendFile(g("Abhaken.pdf")); break;
    case "eltern": res.sendFile(g("Einverstaendnis_Mitwirkung_Foto_Film_Umbruchszeiten.pdf")); break;
    case "lehrer": res.sendFile(g("Einverständniserklärung-der-Eltern_gesetzlichen-Vertretung.pdf")); break;
    case "brd": res.sendFile(g("Fragenkatalog - BRD.pdf")); break;
    case "ddr": res.sendFile(g("Fragenkatalog - DDR.pdf")); break;
    case "full": res.sendFile(g("Fragenkatalog.pdf")); break;
    case "tipps": res.sendFile(g("Tipps_Zeitzeugengespräche_Umbruchszeiten.pdf")); break;
    case "checkliste": res.sendFile(g("Interview Checkliste.pdf")); break;
    default: res.send("Digga du Huan versuch ned meine Seite zu hacken! Piss dich!"); break;
  }
  
})

app.listen(5009, console.log("Geschichte Running"));
  