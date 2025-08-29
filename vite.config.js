import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    content: [
        './src/**/*.ts'
    ],
    plugins: [tailwindcss(),], }
)