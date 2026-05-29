#!/usr/bin/env node
// validate-spec.js — validate a document spec against schema/document.schema.json.
//
// Usage:
//   npm run validate -- specs/examples/postal-notification.json
//   node scripts/validate-spec.js path/to/spec.json
//
// Exits 0 if valid, 1 if invalid or on error. Prints human-readable errors.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = resolve(__dirname, "../schema/document.schema.json");

export function loadSchema() {
  return JSON.parse(readFileSync(SCHEMA_PATH, "utf8"));
}

export function loadSpec(specPath) {
  return JSON.parse(readFileSync(resolve(specPath), "utf8"));
}

/**
 * Validate a parsed spec object. Returns { valid, errors }.
 */
export function validateSpec(spec) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(loadSchema());
  const valid = validate(spec);
  return { valid, errors: validate.errors || [] };
}

function formatErrors(errors) {
  return errors
    .map((e) => {
      const where = e.instancePath || "(root)";
      let msg = `  • ${where} ${e.message}`;
      if (e.params && Object.keys(e.params).length) {
        msg += ` ${JSON.stringify(e.params)}`;
      }
      return msg;
    })
    .join("\n");
}

function main() {
  const specPath = process.argv[2];
  if (!specPath) {
    console.error("Usage: node scripts/validate-spec.js <spec.json>");
    process.exit(1);
  }
  let spec;
  try {
    spec = loadSpec(specPath);
  } catch (err) {
    console.error(`✗ Could not read/parse ${specPath}: ${err.message}`);
    process.exit(1);
  }
  const { valid, errors } = validateSpec(spec);
  if (valid) {
    console.log(`✓ ${specPath} is a valid Trar-Khel spec.`);
    process.exit(0);
  } else {
    console.error(`✗ ${specPath} is INVALID:\n${formatErrors(errors)}`);
    process.exit(1);
  }
}

// Run only when invoked directly (not when imported by render/generate).
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
