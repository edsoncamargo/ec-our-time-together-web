import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
  FastifyServerOptions,
} from 'fastify';

import QRCode from 'qrcode';

export const router: FastifyPluginAsync = async (server) => {
  server.register(
    async (instance: FastifyInstance, _: FastifyServerOptions, done) => {
      instance.get(
        '/qrcode',
        async (request: FastifyRequest, reply: FastifyReply) => {
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
            reply.status(500).send(error);
          }
        }
      );

      instance.get('/redirect', async (_, reply: FastifyReply) => {
        const redirectToUrl = 'https://nosso-tempo-juntos-beta.vercel.app/';
        reply.redirect(redirectToUrl);
      });

      done();
    }
  );
};
