import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import borrowingRoutes from './routes/borrowingRoutes.js';
import damageReportRoutes from './routes/damageReportRoutes.js';
import personRoutes from './routes/personRoutes.js'; // Import Person Routes
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

try {
    const swaggerDefinition = fs.readFileSync(path.resolve(__dirname, '../src/swagger/swaggerOptions.js'), 'utf-8');
    const options = {
      definition: swaggerDefinition,
      apis: [], // No longer needed as definition is used
    };
  
    const swaggerDocs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  } catch (e) {
    console.error(e);
    process.exit(1); // Exit if YAML parsing fails
  }

// Routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/borrowings', borrowingRoutes);
app.use('/api/damage-reports', damageReportRoutes);
app.use('/api/people', personRoutes); // Use Person Routes

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;