import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify';
import { router } from './routes';

const fastify = Fastify({ logger: true });

fastify.register(router, { prefix: '/' });

export default async (req: FastifyRequest, res: FastifyReply) => {
  try {
    await fastify.ready();
    fastify.server.emit('request', req, res);
  } catch (error) {
    res.status(500).send({ error });
  }
};
