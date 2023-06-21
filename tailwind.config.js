module.exports = {
    content: [
        "./resources/**/*.{html,htm,njk,js,css}",
        "./resources/**/**/components/*.{html,htm,njk,js,css}",
        "*.{html,htm,njk,js,css}",

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
            },
        },
    },
    plugins: [
        /*require('@tailwindcss/forms'),*/
        require('daisyui')
    ],
    daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#5497ff", 
            "primary-focus": "#2d6dff",
            "secondary": "#f000b8", 
            "accent": "#1dcdbc",   
            "neutral": "#2b3440",  
            "base-100": "#ffffff",  
            "info": "#3abff8",   
            "success": "#36d399",  
            "warning": "#fbbd23",
            "error": "#f87272",
          },
        },
      ],
    },
}
