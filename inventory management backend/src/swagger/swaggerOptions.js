// src/swagger/swaggerOptions.js
import swaggerJsdoc from 'swagger-jsdoc';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import jsyaml from 'js-yaml'; // Import js-yaml

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const swaggerDefinition = jsyaml.load(fs.readFileSync(path.resolve(__dirname, './swagger.yaml'), 'utf-8'));
  const options = {
    definition: swaggerDefinition,
    apis: [], // No longer needed as definition is used
  };

  const swaggerDocs = swaggerJsdoc(options);

} catch (e) {
  console.error(e);
  process.exit(1); // Exit if YAML parsing fails
}

export default swaggerDocs;