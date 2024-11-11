import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif']
			},
			colors: {
				primary: '#246BFD',
				secondary: '#C25FFF',
				background: '#181A20',
				backgroundSecondary: '#262A34'
			},
			backgroundImage: {
				'primary-gradient': 'linear-gradient(to right, #246BFD, #C25FFF)',
				'dark-gradient': 'radial-gradient(circle at top left, rgba(194, 95, 255, 0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(194, 95, 255, 0.1), transparent 30%), linear-gradient(180deg, #1F222A 0%, #181A20 100%)'
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
