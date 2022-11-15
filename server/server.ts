import { Request, Response } from "express";

const express = require('express');

const app = express();

app.use(express.json());

app.listen(8080, function () {
  console.log("C'est parti ! En attente de connexion sur le port 8080...");
});

// Configuration d'express pour utiliser le répertoire "public"
app.use(express.static('./'));

type Marker = {
  name: string,
  description: string,
  type: string,
  longitude: number,
  lattitude: number
}

var markersData: Marker[] = [];
var errorParse: string = "";

try {
  markersData = JSON.parse(require('fs').readFileSync(__dirname + '/markers.json'));
} catch (e) {
  errorParse = "Impossible to parse the data."
}

app.get('/markers', function (req: Request, res: Response) {
  console.log("Reçu : GET /stations");
  res.setHeader('Content-type', 'application/json');
  if (errorParse != "") {
    res.json({ status: 0, data: markersData });
  } else {
    res.json({ status: -1, data: errorParse });
  }
});
