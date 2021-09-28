const jwt = require('jsonwebtoken');
const jsonServer = require('json-server');
const server = jsonServer.create();
const path = require('path');
// const router = jsonServer.router(path.join(__dirname, 'db.json'));
const router = jsonServer.router({ blogs: [] });
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require('uuid');

let users = ['ilkka', 'test', 'foobar'];

const isTestRequest = (req) => {
  return req.path.includes('/api/testing');
};

const isAuthorized = (req) => {

  return !( req.headers.authorization === undefined );
};

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  console.log(`${ req.method } ${ req.url }`);
  next();
});

server.post('/api/testing/reset', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application\\text' });
  users = ['ilkka', 'test', 'foobar'];
  router.db.setState({ blogs: [] });
  res.write('OK');
  res.end();
});

server.post('/api/testing/user', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application\\text' });

  users = users.concat(req.body.user);
  res.write('OK');

  res.end();
});

server.post('/login', (req, res) => {

  const user = users.find(u => u === req.body.user);

  if (user !== undefined) {
    const userForToken = {
      name: req.body.user,
      token: uuidv4()
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    res.writeHead(200, { 'Content-Type': 'application\\json' });
    res.write(JSON.stringify({
      name: req.body.user,
      token: token
    }));
  } else {
    res.writeHead(401, { 'Content-Type': 'application\\json' });
    res.write(JSON.stringify({
      error: 'Wrong username or password'
    }));
  }

  res.end();
});

server.use((req, res, next) => {
  if (isAuthorized(req) || isTestRequest(req)) { // add your authorization logic here
    next(); // continue to JSON Server router
  } else {
    res.sendStatus(401);
  }
});

server.use('/api', router);
server.listen(3003, () => {
  console.log('JSON Server is running');
});
