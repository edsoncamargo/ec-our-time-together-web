import Fastify, {
  FastifyListenOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

import QRCode from 'qrcode';

const fastify = Fastify();

fastify.get('/qrcode', async (request: FastifyRequest, reply: FastifyReply) => {
  const redirectToUrl = '/redirect';

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
    reply.status(500).send(error);
  }
});

fastify.get('/redirect', async (_, reply: FastifyReply) => {
  const redirectToUrl = 'https://nosso-tempo-juntos-beta.vercel.app/';
  reply.redirect(redirectToUrl);
});

const start = async () => {
  try {
    const options: FastifyListenOptions = {
      port: 3000,
      host: '0.0.0.0',
    };
    await fastify.listen(options);
    console.log('Server listening at http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
