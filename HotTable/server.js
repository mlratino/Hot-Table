var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var customers = [
  {
    identification: "Hangry",
    customerName: "Maria",
    customerEmail: "111-222-3333",
    phoneNumber: "M.aria@Aira.M",
  },
  {
    identification: "afhaque89",
    customerName: "Ahmed",
    customerEmail: "979-587-0887",
    phoneNumber: "afhaque89@gmail.com",
  },
  {
    identification: "4? Really tim....",
    customerName: "Tim",
    customerEmail: "55555555",
    phoneNumber: "tim@tim.tim",
  },
];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/customers", function(req, res) {
  return res.json(customers);
});

app.get("/api/customers/:customer", function(req, res) {
  var sitting = req.params.customer;
  console.log(sitting);
  for (var i = 0; i < customers.length; i++) {
    if (sitting === customers[i].routeName) {
      return res.json(customers[i]);
    }
  }
  return res.json(false);
});

app.post("/api/customers", function(req, res) {
  var newcustomer = req.body;
  newcustomer.routeName = newcustomer.name.replace(/\s+/g, "").toLowerCase();
  console.log(newcustomer);
  customers.push(newcustomer);
  res.json(newcustomer);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});