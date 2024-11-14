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
				'primary-gradient': 'linear-gradient(90deg, #246BFD 0%, #C25FFF 100%)', // Using brand colors
				'secondary-gradient': 'linear-gradient(90deg, #C25FFF 0%, #246BFD 100%)', // Reversed brand colors
				'dark-gradient': `
					radial-gradient(circle at top left, rgba(194, 95, 255, 0.08), transparent 35%),
					radial-gradient(circle at bottom right, rgba(36, 107, 253, 0.08), transparent 35%),
					linear-gradient(180deg, #181A20 0%, #121418 100%)
				`,
				'progress-low': 'linear-gradient(90deg, #FF6B00 0%, #FFD600 100%)',
				'progress-mid': 'linear-gradient(90deg, #FF0000 0%, #7C3AED 100%)',
				'progress-high': 'linear-gradient(90deg, #246BFD 0%, #C25FFF 100%)'
			}
		}
	},

	plugins: [typography, forms, containerQueries]
} satisfies Config;
