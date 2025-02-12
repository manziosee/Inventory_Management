// src/swaggerOptions.js
import swaggerJsdoc from 'swagger-jsdoc';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import jsyaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let swaggerDocs;

try {
  // Adjust path to correctly locate swagger.yaml
  const swaggerFilePath = path.resolve(__dirname, '../swagger.yaml'); // Updated path
  console.log(`Loading Swagger from: ${swaggerFilePath}`); // Debug log

  if (!fs.existsSync(swaggerFilePath)) {
    throw new Error('Swagger YAML file not found at: ' + swaggerFilePath);
  }

  // Load the YAML file
  const swaggerDefinition = jsyaml.load(fs.readFileSync(swaggerFilePath, 'utf-8'));

  // Generate Swagger documentation
  const options = {
    definition: swaggerDefinition,
    apis: ['./routes/*.js'], // Include route files if needed
  };

  swaggerDocs = swaggerJsdoc(options);
} catch (e) {
  console.error('Failed to load Swagger:', e);
  process.exit(1);
}

export default swaggerDocs;