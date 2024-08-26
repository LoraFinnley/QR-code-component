import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qrcode from "qrcode";

const app = express();
app.set('view engine', 'ejs');

const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const qrCodeUrl = "https://www.frontendmentor.io?ref=challenge";
const outputFilePath = __dirname + "/public/qrcode.png";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

qrcode.toFile(
  outputFilePath,
  qrCodeUrl,
  {
    color: {
      dark: "#FFFFFF", 
      light: "#0000"  
    }
  },
  function (err) {
    if (err) {
      console.error("Error generating QR Code:", err);
    } else {
      console.log("QR Code generated and saved to", outputFilePath);
    }
  }
);

app.get("/", (req, res) => {
  res.render(__dirname + "/index.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
