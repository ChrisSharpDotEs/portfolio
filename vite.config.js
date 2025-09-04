import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    base: '/portfolio/', 
    content: [
        './src/**/*.ts'
    ],
    plugins: [tailwindcss(),], }
)