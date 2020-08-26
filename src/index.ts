import fastify from 'fastify';

import main from './routes/main';
import fastifyRateLimit from 'fastify-rate-limit';

const PORT = process.env.PORT || 8080;

const initServer = async PORT => {
  const server = fastify();
  server.register(fastifyRateLimit, { max: 1000, timeWindow: 60000, whitelist: [] });
  server.register(main);

  server.setErrorHandler((error, req, res) => {
    req.log.error(error.toString());
    res.send({ error });
  });

  server.listen(PORT, '0.0.0.0', (err, host) => {
    if (err) throw err;
    console.info(`server initiated on ${host}`);
  });
};

initServer(PORT);
