import { parseCSV } from './csvParser'; // Your CSV parsing logic
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Conexão com o banco de dados SQLite (em memória)
const sequelize = new Sequelize({
  dialect: 'sqlite', // SQLite é uma opção compatível com Sequelize
  storage: ':memory:', // Usando banco de dados em memória
  logging: false, // Desabilita logs do Sequelize
});

interface MovieAttributes {
  producers: string;
  awardYear: number;
  winner: boolean | null;  // This will be used to indicate if the movie was a winner
}

// Define a interface para criação de um novo Filme (atributos opcionais ao criar)
interface MovieCreationAttributes extends Optional<MovieAttributes, 'awardYear' | 'winner'> {}

class Movie extends Model<MovieAttributes, MovieCreationAttributes> implements MovieAttributes {
  public producers!: string;
  public awardYear!: number;
  public winner!: boolean | null;  // Boolean or null for winner
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
      allowNull: true, // Allow null for movies that are not winners
    },
  },
  {
    sequelize,
    tableName: 'Movies',
  }
);

export class MovieService {
  // Método para carregar os dados CSV para o banco SQLite
  public async loadMoviesData(csvFilePath: string): Promise<void> {
    await sequelize.sync();
    const moviesData = await parseCSV(csvFilePath);

    for (const movie of moviesData) {
      const winner = movie.winner
      await Movie.create({
        producers: movie.producers,
        awardYear: movie.awardYear,
        winner: winner || null, // If empty, it will be null
      });
    }
  }

  // Lógica para retornar o produtor com o maior intervalo e o que obteve prêmios mais rápido
  public async getProducersAwards(): Promise<any> {
    const movies = await Movie.findAll({
      order: [['awardYear', 'ASC']],
    });

    const producersAll = new Map<string, number[]>(); // Map to store producer and their award years

    // Organizando os filmes por produtor
    for (const movie of movies) {
      const producers = movie.get('producers');  // Correctly access producer
      const awardYear = movie.get('awardYear');  // Correctly access awardYear
      const winner = movie.get('winner'); // Access the winner

      // Only include winners in the results (if "yes" or not null)
      if (winner) {
        if (!producersAll.has(producers)) {
          producersAll.set(producers, []);
        }
        producersAll.get(producers)?.push(awardYear);
      }
    }

    let maxInterval = { producer: '', interval: 0, previousWin: 0, followingWin: 0 };
    let minInterval = { producer: '', interval: Number.MAX_VALUE, previousWin: 0, followingWin: 0 };

    // Verificando intervalos entre prêmios para cada produtor
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

    // Formatar e retornar a resposta no formato esperado
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
