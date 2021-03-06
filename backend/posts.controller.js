import { PostService } from './db.sqlqueries.js';
import { SubscriptionController } from "./sub.controller.js";

export const PostController = {

    readAll: (req, res) => {
        PostService.getAll((err, result) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while getting all posts",
                });
            else {
                console.log(result);
                let arr = [];
                result.forEach( post => {
                    let buff = new Buffer(post.image, 'base64');
                    let text = buff.toString('ascii');
                    //console.log(text);
                    post.image = text;
                    arr.push(post);
                });
                res.json(arr);
            }
        });
    },

    create: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
        }
        const post = {...req.body };
        PostService.create(post, (err, result) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the post.",
                });
            else return res.json(result);
        })
        .then( data => {
            SubscriptionController.sendNotification();
            return data;
        });
    },

    delete: (req, res) => {
        PostService.remove(req.params.postId, (err, result) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while delete the post",
                });
            else res.json(result);
        });
    },

    update: (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
        }
        const post = {...req.body };
        PostService.updateById(
            req.params.postId,
            post,
            (err, result) => {
                if (err)
                    res.status(500).send({
                        message: err.message || "Some error occurred while update the post",
                    });
                else res.json(result);
            }
        );
    },

    readOne: (req, res) => {
        PostService.findById(req.params.postId, (err, result) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while getting one post",
                });
            else res.json(result);
        });
    },
};

/*
Die Datenbankanfragen erwarten unterschiedliche Werte f??r die jeweiligen parameter. 
F??r manche Anfragen muss eine id ??bergeben werden, f??r andere ein post-Objekt mit Werten 
f??r title, location und image, die updateById()-Funktion ben??tigt beides und die 
removeAll()-Funktion nichts davon. Diese unterschiedlichen Werte m??ssen erst aus den 
Anfragen extrahiert werden. Dazu dient uns der Controller, den wir nun implementieren. 
Er stellt die Schnittstelle zwischen den REST-API-Anfragen und den Datenbankanfragen dar.

--Die readAll()-Funktion ruft die getAll()-Funktion, d.h. es sollen alle Datens??tze aus der posts-tabelle 
zur??ckgeliefert werden. Liefert die getAll()-Funktionen einen Fehler, dann schickt die readAll()-Funktionen 
eine Fehlermeldung mit Statuscode 500 (siehe auch HTTP-Statuscode) mit entweder der Fehler-message oder mit der 
Nachricht "Some error occurred while getting all posts" an den Aufrufer (Zeilen 7-10). Wenn alles korrekt l??uft, 
d.h. die Datens??tze von der getAll()-Funktion geliefert werden, dann erzeugt die readAll()-Funktion daraus ein JSON 
und schickt dieses an den Aufrufer zur??ck (Zeile 11).
--Die create()-Funktion ruft die create()-Funktion des PostService auf. Dazu muss jedoch erst der Datensatz erstellt werden,
der in die Datenbank eingef??gt werden soll. Dieser Datensatz wird aus dem body des requests extrahiert. Ist dieser body leer
 oder existiert gar nicht, wird eine Fehlermeldung mit Statuscode 400 als Response gesendet. Aus dem body des requests wird 
 ansonsten ein neues post-Objekt erzeugt. Hier wird erneut der spread operator verwendet und somit alle Schl??ssel-Werte-Paare 
 aus body in das Objekt eingef??gt (Zeile 21). Dieses post-Objekt wird der Methode create() des PostService ??bergeben. Das result 
 der create()-Methode des PostService ist der gesamte "neue" Datensatz inkl. der von der Datenbank vergebenen id.
--Die update()-Methode ist ??hnlich der create()-Funktion, aber hier wird zus??tzlich noch die id ??bergeben, die verwendet 
werden soll, um den Datensatz zu identifiezieren, der aktualisiert werden soll. Diese id ist nicht Teil des req.body, 
sondern wird als Wert der URL mitgegeben, d.h. es erfolgt ein Aufruf der Form http://localhost:3000/posts/11 und die 
11 wird als id verwendet. Mithilfe von params kann die URL des requests ausgelesen werden. Die postId wird gleich in der 
service.js definiert werden.
--Wir haben ??brigens keine Funktion im PostController definiert, die die Funktion removeAll() 
aus dem PostService aufruft, damit wir nicht ausversehen alle Datens??tze aus unserer Datenbank l??schen.
*/