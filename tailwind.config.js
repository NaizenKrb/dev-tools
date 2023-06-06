module.exports = {
    content: [
        "./resources/**/*.{html,htm,njk,js,css}"
    ],
    theme: {
        fontFamily: {
            'sans': ['Locator', 'ui-sans-serif', 'system-ui'],
        },
        extend: {
            bottom: {
                'screen-50-add-2': 'calc(50vh + 2rem)'
            },
            colors: {
                'jhh-light': '#F2FBFF',
                'jhh-blue': '#0AB4FF',
                'jhh-dark': 'rgb(12, 74, 110)',
                'jhh-primary': '#F49100',
                'jhh-primary-light': '#ffe7c5',
                'jhh-accent': '#f5f5f5',
                'jhh-text-primary': '#4d2913',
                'jhh-text-accent': '#5b5b5b'
            },
            dropShadow: {
                'text': '0 1px 1px rgba(0, 0, 0, 1)'
            },
            height: {
                'screen-50': '50vh'
            },
            strokeWidth: {
                '4': '4px'
            },
            translate: {
                'full-2': '200%'
            },
            borderRadius: {
                'navbar': '.45rem'
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('daisyui')
    ],
}
