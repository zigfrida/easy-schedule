// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        // Simulating iphone xr viewports
        viewportHeight: 896,
        viewportWidth: 414,
    },
});
