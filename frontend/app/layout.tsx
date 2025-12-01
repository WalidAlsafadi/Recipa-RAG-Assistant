import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'RecipeAI - Precision Cooking with AI',
	description: 'Precision cooking queries powered by our advanced RAG engine.',
	viewport: {
		width: 'device-width',
		initialScale: 1,
		maximumScale: 1,
		userScalable: false,
		viewportFit: 'cover',
	},
	icons: {
		icon: '/logo.png',
		shortcut: '/favicon.ico',
		apple: '/logo.png',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${inter.className} min-h-screen antialiased flex flex-col bg-white dark:bg-slate-950 selection:bg-orange-100 selection:text-orange-900`}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<a href="#content" className="sr-only focus:not-sr-only">
						Skip to content
					</a>
					<main id="content" className="flex-1">
						{children}
					</main>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}