const server = require('./api/server');

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`servr up on ${port} and ready`));