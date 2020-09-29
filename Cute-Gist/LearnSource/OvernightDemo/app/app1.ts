import ServerController from "../controller/server.controller";
const port = 4000

const server = new ServerController();
server.start(port);