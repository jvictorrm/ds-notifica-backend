import 'dotenv/config';
import express from 'express';
import expressQueryBoolean from 'express-query-boolean';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import rateLimitMongoose from '@lykmapipo/rate-limit-mongoose';
import cors from 'cors';
import InspectorRoutes from './app/routes/InspectorRouter';
import MailAddressRoutes from './app/routes/MailAddressRouter';
import NotificationRoutes from './app/routes/NotificationRouter';
import SessionRoutes from './app/routes/SessionRouter';
import UserRoutes from './app/routes/UserRouter';
import './database';
import jsonMiddleware from './app/middlewares/json';
import authMiddleware from './app/middlewares/auth';

class App {
  constructor() {
    this.server = express();
    this.initialMiddlewares();
    this.routes();
  }

  initialMiddlewares() {
    this.server.use(helmet());
    this.server.use(
      cors({
        origin: process.env.FRONT_URL || false,
      })
    );
    this.server.use(express.json());
    this.server.use(expressQueryBoolean());
    this.server.use(jsonMiddleware);

    if (process.env.NODE_ENV !== 'development') {
      const windowMs = 15 * 60 * 1000;
      this.server.use(
        rateLimit({
          store: rateLimitMongoose({ windowMs }),
          windowMs,
          max: 100,
          handler(req, res) {
            res
              .status(400)
              .json({ error: 'Too many requests, please try again later.' });
          },
        })
      );
    }
  }

  routes() {
    this.server.use('/sessions', SessionRoutes);
    this.server.use('/users', UserRoutes);
    this.server.use('/notifications', authMiddleware, NotificationRoutes);
    this.server.use('/mail-address', authMiddleware, MailAddressRoutes);
    this.server.use('/inspectors', authMiddleware, InspectorRoutes);
  }
}

export default new App().server;
