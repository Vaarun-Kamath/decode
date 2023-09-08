import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor:{
        'theme1' : '#1e1f1c',
        'theme2' : '#393E46',
        'theme3' : '#FFD369',
        'theme4' : '#EEEEEE',
      },
      textColor:{
        'theme1' : "#EEEEEE",
      },
    },
  },
  plugins: [],
}
export default config
