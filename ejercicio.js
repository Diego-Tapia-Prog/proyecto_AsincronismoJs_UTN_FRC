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
            
            console.log('Temporada 3');
            data
                .filter(info => info.season === '3')
                .forEach(info => {
                    console.log("Nombre Episodio: ",info.title, " => Rating Episodio: ", info.imdb_rating);
                });
            
            console.log('Episodio 22 de la Temporada 3 ',
                data.find(info => info.season === '3' && info.episode_num === '22').title
            );
            
            const season3 = data.filter(info => info.season === '3');
            const ratingAvg = season3.reduce((suma,inf) => suma += parseFloat(inf.imdb_rating) , 0) / season3.length;
            console.log(`El rating IMDB promedio para esta Tercera temporada es ${ratingAvg}`);
        })
        .catch(error => console.error('Error al leer el archivo CSV: ', error));
})()