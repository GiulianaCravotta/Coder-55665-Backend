const { fileURLToPath, dirname } = require('url');
const { dirname } = require('path');

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);