/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         fontFamily: {
            slab: ['Roboto Slab', 'serif']
         },
         fontWeight: {
            thin: '200',
            normal: '300',
            semibold: '500',
            bold: '700'
         },
         colors: {
            primary: '#175957',
            greenY: '#99ac53',
            yellowW: '#f4f4ec',
            whiteY: '#f4f4ec',
            orangeH: '#ff9c60',
            blackY: '#100e0a',
            gray: '#b4b4b4',
            overlay: 'rgba(0,0,0,0.5)'
         },
         screens: {
            xs: '480px',
            ss: '620px',
            sm: '768px',
            md: '1060px',
            lg: '1200px',
            xl: '1700px'
         }
      }
   },
   plugins: []
}
