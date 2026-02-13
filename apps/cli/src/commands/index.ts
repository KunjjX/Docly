import { runGenerator } from '../core/runGenerator';
import { diagramRender } from './diagramRender';
import { handleDiagramCommand } from './diagramGenerator';

export async function readme(options: any) {
  await runGenerator('readme', options);
}

export async function srs(options: any) {
  await runGenerator('srs', options);
}

export async function architecture(options: any) {
  await runGenerator('architecture', options);
}

export async function workflow(options: any) {
  await runGenerator('workflow', options);
}


export async function testcases(options: any) {
  await runGenerator('testcases', options);
}

export async function apidocs(options: any) {
  await runGenerator('api-docs', options);
}

export async function setup(options: any) {
  await runGenerator('setup', options);
}

export async function deploy(options: any) {
  await runGenerator('deploy', options);
}

export async function security(options: any) {
  await runGenerator('security', options);
}

export async function requirements(options: any) {
  await runGenerator('requirements', options);
}

export async function diagram(options: any) {
  // If --all is passed, we might implemented bulk generation later,
  // but for now let's support single diagram generation or handle it in runGenerator
  // But runGenerator handles one type.
  // The plan said options: -t, --type <type>, -f, --format <format>, --all
  // If --all, we need to iterate.
  // Let's implement basic diagram support here.
  // If options.all is true, loop through types.


  if (options.all) {
    const types = ['architecture', 'workflow', 'erd', 'component', 'deployment', 'dfd', 'usecase', 'state', 'activity'];
    console.log('Generating all diagram types...');

    // Helper delay function
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      await runGenerator('diagram', { ...options, diagramType: type });

      // Add significant delay between requests to avoid rate limits (except for the last one)
      if (i < types.length - 1) {
        console.log('Waiting 40 seconds to respect API rate limits...');
        await delay(40000);
      }
    }
  } else {
    // diagramType comes from options.type
    await runGenerator('diagram', { ...options, diagramType: options.type });
  }
}

export { diagramRender, handleDiagramCommand };
