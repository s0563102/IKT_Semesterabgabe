import express from 'express';
import { PostController } from './posts.controller.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(express.json({ limit: '20mb' }));

app.get('/', (request, response) => {
    response.send('HELLO FIW!');
});

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ...`);
    }
});

// Endpunkte definieren
app.post("/posts", PostController.create); // C
app.get("/posts", PostController.readAll); // R (all)
app.get("/posts/:postId", PostController.readOne); // R (one)
app.put("/posts/:postId", PostController.update); // U
app.delete("/posts/:postId", PostController.delete); // D

/* 
Das bedeutet, wir importieren express (Zeile 1), erzeugen uns davon eine 
Objekt und speichern dieses in der Variablen app (Zeile 3). 
Wir legen in einer Konstanten PORT die Portnummer 3000 fest(Zeile 4 
    - die Portnummer können Sie wählen). Das backend ist somit unter 
    http://localhost:3000 verfügbar. Wenn wir diese URL aufrufen,
     dann wird ein request ausgelöst, den wir hier mit Hello FIW! als 
     response beantworten (Zeilen 6-8). Das eigentliche Starten des Webservers 
     erfolgt in den Zeilen 10-16.

server.js um Endpunkte erweitern¶
Uns stehen jetzt die wesentlichen Funktionen zur Verfügung, um CRUD-Anfragen 
durchzuführen. Uns fehlt noch der letzte Schritt, nämlich die Endpunkte unserer 
REST-API mit den entsprechenden Funktionen des Controllers zu verknüpfen. 
Unter den Endpunkten der REST-API verstehen wir die URI der Ressource, 
die angefragt wird zusammen mit der HTTP-Anfragemethode, mit der diese Ressource 
angefragt wird. Wir definieren folgende Endpunkte:

GET http://localhost:3000/posts - Aufruf von readAll() im PostController
GET http://localhost:3000/posts/:postId - Aufruf von readOne() im PostController, 
postId bekommt einen konkreten Wert
POST http://localhost:3000/posts - Aufruf von create() im PostController
PUT http://localhost:3000/posts/:postId - Aufruf von update() im PostController, 
postId bekommt einen konkreten Wert
DELETE http://localhost:3000/posts/:postId - Aufruf von delete() im PostController, 
postId bekommt einen konkreten Wert

Das express-Modul liefert uns also entsprechende Funktionen für die einzelnen HTTP-Anfragen, 
d.h. .get() für GET-Anfragen, .post() für POST-Anfragen usw. Pro Endpunkt wird die 
entsprechende Funktion aus dem PostController aufgerufen. Dieser muss dafür importiert 
werden (Zeile 2).

Wenn wir nun im Browser http://localhost:3000/posts eingeben, dann entspricht 
das der Anfrage GET http://localhost:3000/posts und somit dem Aufruf von 
PostController.readAll(). Tatsächlich werden uns im Browser die beiden Datensätze 
angezeigt (schalten Sie die Darstellung auf Raw), allerdings sind die Werte für die 
Bilder leider sehr lang.

Mit dem Browser können wir auch noch den zweiten GET-Endpunkt testen, nämlich 
GET http://localhost:3000/posts/:postId. Für id sind bis jetzt in der Datenbank
 die Werte 1 und 2 vergeben, d.h. wir könnten GET http://localhost:3000/posts/1 
 und GET http://localhost:3000/posts/2 testen.

Wenn wir eine andere Zahl als 1 oder 2 versuchen, erhalten wir die in der 
findById()-Funktion im PostService definierte Fehlermeldung als JSON 
{ message: "post not found" }.

Mit diesen beiden Anweisungen erhöhen wir die Größe der zu übetragenden
 daten in einem Request auf 20Mb.
*/