module.exports = {
    content: [
        './public/**/*.{html,js}', 
        './*.{html}', 
        './component.html', 
        './resources/**/*.{js,ts}',
    ],
    theme: {
        extend: {},
    },
    plugins: [
        tailwindcss()
    ],
};