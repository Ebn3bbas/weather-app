const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode } = require("./utils/geocode");
const { forcast } = require("./utils/forcast");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir to serve
app.use(express.static(public));

app.get("", (req, res) => {
  res.render("index", { title: "Weather app", name: "abdo" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About me", name: "abdo" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help!",
    message: "Its out of our hands",
    name: "abdo",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "Address not provided",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forcast(latitude, longitude, (error, dataF) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forcast: dataF,
        location,
        address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Help artical not found! Error 404",
    name: "abdo",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "Page not found! Error 404",
    name: "abdo",
  });
});

app.listen(port, () => {
  console.log("Server is up" + port);
});
