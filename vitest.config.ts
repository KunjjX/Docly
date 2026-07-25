import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['tests/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            include: ['src/**/*.ts'],
            thresholds: {
                lines: 50,
                functions: 50,
                branches: 50,
                statements: 50,
            },
        },
    },
});
