import { json } from 'body-parser';
import { Container } from "inversify";
import "reflect-metadata";
import { InversifyExpressServer } from "inversify-express-utils";
import './controllers/matches.controller';
import './controllers/standings.controller';
import './controllers/user.controller';
import './controllers/comment.controller';
import {MatchesService} from "./services/matches.service";
import {StandingsService} from "./services/standings.service";
import * as Mongoose from 'mongoose';
import {UserService} from "./services/user.service";
import {CommentService} from "./services/comment.service";

const port = process.env.PORT || 8080;

Mongoose.connect(process.env.MONGODB_URI!, {useNewUrlParser: true});

const container = new Container();

container.bind<StandingsService>('StandingsService').to(StandingsService).inSingletonScope();
container.bind<MatchesService>('MatchesService').to(MatchesService).inSingletonScope();
container.bind<UserService>('UserService').to(UserService).inSingletonScope();
container.bind<CommentService>('CommentService').to(CommentService).inSingletonScope();

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(json());
});

const app = server.build();

app.listen(port, () => console.log(`Server is running on http://localhost:${port}...`));