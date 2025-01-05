import fs from 'fs';
import { parse } from 'csv-parse';

interface MovieData {
  producers: string;
  awardYear: number;
  winner: boolean;
}

export const parseCSV = (filePath: string): Promise<MovieData[]> => {
  return new Promise((resolve, reject) => {
    const results: MovieData[] = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, delimiter: ';' }))
      .on('data', (row) => {
        results.push({
          producers: row.producers,
          awardYear: parseInt(row.year),
          winner: row.winner ? true: false,
        });
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};
