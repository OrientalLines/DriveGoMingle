import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'com.github.orientallines.drivegomigle',
	appName: 'DriveGoMingle',
	webDir: 'dist',
	server: {
		androidScheme: 'https'
	}
};

export default config;
