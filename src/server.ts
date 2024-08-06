// src/app.ts
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import countryRoutes from './routes/countryRoutes';
import { connectDB } from './utils/db';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from './utils/swagger';



const app = express();


// Security middleware
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize());
// app.use(xss());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

app.use('/api', countryRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).json({ message: 'Invalid CSRF token' });
});


// // Generate Swagger JSON
// const specs = swaggerJsdoc(swaggerOptions);

// // Serve Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Connect to DB and start server
connectDB();


export default app ;
