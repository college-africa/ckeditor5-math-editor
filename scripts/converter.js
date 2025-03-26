const fs = require('fs').promises;
const path = require('path');
const coffee = require('coffeescript');
const babel = require('@babel/core');
const { mkdirp } = require('mkdirp');

class CoffeeScriptConverter {
  constructor(inputDir, outputDir) {
    this.inputDir = path.resolve(inputDir);
    this.outputDir = path.resolve(outputDir);
  }

  async convertDirectory() {
    try {
      // Ensure output directory exists
      await mkdirp(this.outputDir);

      // Recursively convert files
      await this.processDirectoryRecursively(this.inputDir);

      console.log('Finished converting CoffeeScript files');
    } catch (error) {
      console.error('Error converting directory:', error);
    }
  }

  async processDirectoryRecursively(currentDir) {
    // Read all files and directories in the current directory
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      // Construct full path
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        // If it's a directory, recursively process
        await this.processDirectoryRecursively(fullPath);
      } else if (path.extname(entry.name) === '.coffee') {
        // If it's a .coffee file, convert it
        await this.convertFile(fullPath);
      }
    }
  }

  async convertFile(inputPath) {
    try {
      // Read CoffeeScript file
      const coffeeContent = await fs.readFile(inputPath, 'utf8');

      // Convert CoffeeScript to JavaScript
      const jsContent = coffee.compile(coffeeContent, {
        bare: true, // Removes the top-level function wrapper
      });

      // Transform to modern JavaScript syntax
      const modernJsContent = await this.transformToModernJs(jsContent);

      // Determine output path (maintaining directory structure)
      const relativePath = path.relative(this.inputDir, inputPath);
      const outputPath = path.join(
        this.outputDir,
        path.dirname(relativePath),
        path.basename(relativePath, '.coffee') + '.js'
      );

      // Ensure output directory exists
      await mkdirp(path.dirname(outputPath));

      // Write transformed file
      await fs.writeFile(outputPath, modernJsContent);

      console.log(`Converted ${inputPath} to ${outputPath}`);
    } catch (error) {
      console.error(`Error converting ${inputPath}:`, error);
    }
  }

  async transformToModernJs(jsContent) {
    try {
      // Babel transformation options for modern JavaScript
      const transformOptions = {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current', // Use current Node.js syntax
              },
            },
          ],
        ],
        plugins: [
          '@babel/plugin-transform-class-properties',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator',
        ],
      };

      // Transform the JavaScript
      const result = await babel.transformAsync(jsContent, transformOptions);
      return result.code;
    } catch (error) {
      console.error('Error transforming to modern JavaScript:', error);
      return jsContent; // Fallback to original if transformation fails
    }
  }
}

// Usage example
async function main() {
  // Example usage: convert files from 'coffee-src' to 'js-dist'
  const converter = new CoffeeScriptConverter('tmc', 'tmc.js');
  await converter.convertDirectory();
}

// Uncomment to run directly
main();

module.exports = CoffeeScriptConverter;
