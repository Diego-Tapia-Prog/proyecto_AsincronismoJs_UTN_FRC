import { createReadStream } from 'fs';
import csv from 'csv-parser';
import { resolve } from 'dns';
import { rejects } from 'assert/strict';
import { error } from 'console';

function readCSV(file) {
    return new Promise((resolve,rejects) => {
        const results = [];
        createReadStream(file)
            .pipe(csv())
            .on('data',(data) => results.push(data))
            .on('end',() => resolve(results))
            .on('error', (error) => rejects(error));
    });
};

(function main() {
    readCSV('./data/tbbt.csv')
        .then(data =>{
            data.forEach(informacion => {
                console.log(informacion);
            });
        })
        .catch(error => console.error('Error al leer el archivo CSV: ', error));
})()