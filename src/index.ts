import { json } from 'body-parser';
import { Container } from "inversify";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import './controllers/matches.controller';
import './controllers/standings.controller';
import {MatchesService} from "./services/matches.service";
import {StandingsService} from "./services/standings.service";

const port = process.env.PORT || 8080;

const container = new Container();

container.bind<StandingsService>('StandingsService').to(StandingsService).inSingletonScope();
container.bind<MatchesService>('MatchesService').to(MatchesService).inSingletonScope();

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
   app.use(json());
});

const app = server.build();

app.listen(port, () => console.log(`Server is running on http://localhost:${port}...`));