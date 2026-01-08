import { runGenerator } from '../core/runGenerator.js';

export async function readme(options) {
  await runGenerator('readme', options);
}

export async function srs(options) {
  await runGenerator('srs', options);
}

export async function architecture(options) {
  await runGenerator('architecture', options);
}

export async function workflow(options) {
  await runGenerator('workflow', options);
}

export async function testcases(options) {
  await runGenerator('testcases', options);
}
