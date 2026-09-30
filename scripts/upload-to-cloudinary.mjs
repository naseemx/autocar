import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v2 as cloudinary } from 'cloudinary';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const srcDir = path.join(projectRoot, 'src');
const mappingFile = path.join(srcDir, 'data', 'cloudinary-mapping.json');

// 1. Load environment variables from .env.local or .env if present
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(projectRoot, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

// 2. Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudinaryUrl = process.env.CLOUDINARY_URL;

const isDryRun = process.argv.includes('--dry-run');
const shouldReplaceInCode = process.argv.includes('--replace');

// Check credentials if not dry-run
if (!isDryRun) {
  if (!cloudinaryUrl && (!cloudName || !apiKey || !apiSecret)) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Cloudinary credentials not found!');
    console.log('\nPlease add your Cloudinary credentials to .env.local:');
    console.log('\x1b[33m%s\x1b[0m', 'CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.log('\x1b[33m%s\x1b[0m', 'CLOUDINARY_API_KEY=your_api_key');
    console.log('\x1b[33m%s\x1b[0m', 'CLOUDINARY_API_SECRET=your_api_secret');
    console.log('\nOr run with --dry-run to preview files without uploading:');
    console.log('\x1b[36m%s\x1b[0m', 'npm run upload:cloudinary -- --dry-run\n');
    process.exit(1);
  }

  if (cloudinaryUrl) {
    cloudinary.config({ cloudinary_url: cloudinaryUrl });
  } else {
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
  }
}

// 3. Collect all images in public/
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif']);

function getImagesRecursively(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(getImagesRecursively(fullPath));
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

// 4. Main Upload Process
async function main() {
  const images = getImagesRecursively(publicDir);
  console.log(`\nFound \x1b[36m${images.length}\x1b[0m image(s) in public/ directory.\n`);

  if (isDryRun) {
    console.log('\x1b[33m[DRY RUN MODE]\x1b[0m The following images would be uploaded to Cloudinary:');
    images.forEach((img, i) => {
      const relPath = path.relative(publicDir, img);
      console.log(`  ${i + 1}. /${relPath}`);
    });
    console.log('\nRun without --dry-run to upload.\n');
    return;
  }

  let mapping = {};
  if (fs.existsSync(mappingFile)) {
    try {
      mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf-8'));
    } catch {
      mapping = {};
    }
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < images.length; i++) {
    const filePath = images[i];
    const relPath = path.relative(publicDir, filePath);
    const key = `/${relPath.replace(/\\/g, '/')}`;

    // Target folder inside Cloudinary
    const subDir = path.dirname(relPath);
    const folder = subDir === '.' ? 'kauf-auto' : `kauf-auto/${subDir.replace(/\\/g, '/')}`;
    const baseName = path.basename(filePath, path.extname(filePath));

    process.stdout.write(`[${i + 1}/${images.length}] Uploading ${key}... `);

    try {
      const uploadRes = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        public_id: baseName,
        overwrite: true,
        use_filename: true,
        unique_filename: false,
        resource_type: 'image',
      });

      mapping[key] = uploadRes.secure_url;
      successCount++;
      console.log('\x1b[32mOK\x1b[0m');
    } catch (err) {
      failCount++;
      console.log('\x1b[31mFAILED\x1b[0m');
      console.error(`   Error uploading ${key}:`, err.message || err);
    }
  }

  // Ensure output directory exists and write mapping
  fs.mkdirSync(path.dirname(mappingFile), { recursive: true });
  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2), 'utf-8');
  console.log(`\n\x1b[32m✔ Successfully uploaded ${successCount} image(s).\x1b[0m`);
  if (failCount > 0) {
    console.log(`\x1b[31m✖ Failed to upload ${failCount} image(s).\x1b[0m`);
  }
  console.log(`\x1b[36m✔ Generated mapping file: src/data/cloudinary-mapping.json\x1b[0m\n`);

  // Optional: Auto replace paths in code if --replace flag was passed
  if (shouldReplaceInCode) {
    console.log('Replacing image paths in source code...');
    replacePathsInSrc(mapping);
    console.log('\x1b[32m✔ Code references updated with Cloudinary URLs!\x1b[0m\n');
  } else {
    console.log('Tip: Pass \x1b[33m--replace\x1b[0m to automatically update all image references in code:');
    console.log('\x1b[36mnpm run upload:cloudinary -- --replace\x1b[0m\n');
  }
}

// 5. Code Replacer
function replacePathsInSrc(mapping) {
  const codeFiles = [];
  function scan(dir) {
    const list = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of list) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        scan(full);
      } else if (/\.(tsx|ts|js|jsx)$/.test(item.name)) {
        codeFiles.push(full);
      }
    }
  }
  scan(srcDir);

  const keys = Object.keys(mapping).sort((a, b) => b.length - a.length);

  for (const file of codeFiles) {
    let content = fs.readFileSync(file, 'utf-8');
    let changed = false;

    for (const key of keys) {
      const url = mapping[key];
      // match single quotes, double quotes, backticks
      const singleQuoteRegex = new RegExp(`'${escapeRegExp(key)}'`, 'g');
      const doubleQuoteRegex = new RegExp(`"${escapeRegExp(key)}"`, 'g');

      if (singleQuoteRegex.test(content)) {
        content = content.replace(singleQuoteRegex, `'${url}'`);
        changed = true;
      }
      if (doubleQuoteRegex.test(content)) {
        content = content.replace(doubleQuoteRegex, `"${url}"`);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`  Updated: ${path.relative(projectRoot, file)}`);
    }
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

main().catch((err) => {
  console.error('Upload script encountered an unexpected error:', err);
  process.exit(1);
});
