import mysql from 'mysql';
import { dbConfig } from './db.config.js';

export const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

connection.connect((error) => {
    if (error) throw error;
    console.log("Connected with database ... ");
});

/*
Wir importieren in Zeile 1 das mysql-Modul und wir importieren 
in Zeile 2 die soeben festgelegten Zugangsdaten zur Datenbank. 
Mithilfe der createConnection()-Funktion aus dem mysql-Paket werden 
diese Zugangsdaten eingelesen (Zeilen 4-9). Die eigentliche Verbindung 
zur Datenbank wird dann mit connect()-Funktion des mysql-Paketes hergestellt.
*/