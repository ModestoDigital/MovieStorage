import { parseCSV } from './csvParser'; 
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite', 
  storage: ':memory:', 
  logging: false, 
});

interface MovieAttributes {
  producers: string;
  awardYear: number;
  winner: boolean | null; 
}


interface MovieCreationAttributes extends Optional<MovieAttributes, 'awardYear' | 'winner'> {}

class Movie extends Model<MovieAttributes, MovieCreationAttributes> implements MovieAttributes {
  public producers!: string;
  public awardYear!: number;
  public winner!: boolean | null;
}

Movie.init(
  {
    producers: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    awardYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    winner: {
      type: DataTypes.BOOLEAN,
      allowNull: true, 
    },
  },
  {
    sequelize,
    tableName: 'Movies',
  }
);

export class MovieService {
  public async loadMoviesData(csvFilePath: string): Promise<void> {
    await sequelize.sync();
    const moviesData = await parseCSV(csvFilePath);

    for (const movie of moviesData) {
      const winner = movie.winner
      await Movie.create({
        producers: movie.producers,
        awardYear: movie.awardYear,
        winner: winner || null, 
      });
    }
  }

  
  public async getProducersAwards(): Promise<any> {
    const movies = await Movie.findAll({
      order: [['awardYear', 'ASC']],
    });

    const producersAll = new Map<string, number[]>();

    
    for (const movie of movies) {
      const producers = movie.get('producers');  
      const awardYear = movie.get('awardYear'); 
      const winner = movie.get('winner'); 

      
      if (winner) {
        if (!producersAll.has(producers)) {
          producersAll.set(producers, []);
        }
        producersAll.get(producers)?.push(awardYear);
      }
    }

    let maxInterval = { producer: '', interval: 0, previousWin: 0, followingWin: 0 };
    let minInterval = { producer: '', interval: Number.MAX_VALUE, previousWin: 0, followingWin: 0 };

    for (const [producer, years] of producersAll) {
      for (let i = 0; i < years.length - 1; i++) {
        const interval = years[i + 1] - years[i];

        // Encontrar o maior intervalo
        if (interval > maxInterval.interval) {
          maxInterval = { producer, interval, previousWin: years[i], followingWin: years[i + 1] };
        }

        // Encontrar o menor intervalo
        if (interval < minInterval.interval) {
          minInterval = { producer, interval, previousWin: years[i], followingWin: years[i + 1] };
        }
      }
    }

    return {
      max: [
        {
          producer: maxInterval.producer,
          interval: maxInterval.interval,
          previousWin: maxInterval.previousWin,
          followingWin: maxInterval.followingWin,
        },
      ],
      min: [
        {
          producer: minInterval.producer,
          interval: minInterval.interval,
          previousWin: minInterval.previousWin,
          followingWin: minInterval.followingWin,
        },
      ],
    };
  }
}
