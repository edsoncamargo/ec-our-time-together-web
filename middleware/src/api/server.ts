import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

import QRCode from 'qrcode';

const fastify = Fastify();

fastify.get('/qrcode', async (request: FastifyRequest, reply: FastifyReply) => {
  const redirectToUrl = '/api/redirect';

  try {
    const qrCodeImage = await QRCode.toDataURL(
      `${request.protocol}://${request.hostname}${redirectToUrl}`
    );

    return reply.header('Content-Type', 'text/html').send(`
      <html>
        <body style="width: 100%; height: 100%; display: 
            flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden;">
          <img src="${qrCodeImage}" alt="QR Code" style="width: 15%" />
        </body>
      </html>
    `);
  } catch (error) {
    // Tratamento de erro
    reply.status(500).send(error);
  }
});

fastify.get('/redirect', async (_, reply: FastifyReply) => {
  const redirectToUrl = 'https://nosso-tempo-juntos-beta.vercel.app/';
  reply.redirect(redirectToUrl);
});

export default async (req: IncomingMessage, res: ServerResponse) => {
  await fastify.ready();
  fastify.server.emit('request', req, res);
};

// const start = async () => {
//   try {
//     await fastify.listen({ port: 3000, host: '0.0.0.0' });
//     console.log('Server is running at http://localhost:3000');
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// if (require.main === module) {
//   start();
// }
