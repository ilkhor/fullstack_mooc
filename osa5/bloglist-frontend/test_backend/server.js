const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require('uuid');

const isAuthorized = (req) => {
  return !(req.headers.authorization === undefined);
};

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/login', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application\\json'});
  const userForToken = {
    name: req.body.user,
    token: uuidv4(),
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.write(JSON.stringify({
    name: 'Ilkka',
    token: token,
  }));

  res.end();
});

server.use((req, res, next) => {
  if (isAuthorized(req)) { // add your authorization logic here
    next(); // continue to JSON Server router
  } else {
    res.sendStatus(401);
  }
});

server.use('/api', router);
server.listen(3003, () => {
  console.log('JSON Server is running');
});