import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Recipa',
    // SLOGAN ADDED HERE:
    default: 'Recipa - Precision Cooking with AI', 
  },
  description: 'Your professional AI culinary assistant. Unlock recipes, manage ingredients, and cook smarter with Recipa.',
  keywords: ['Recipa', 'Cookbook', 'AI', 'RAG', 'Next.js', 'Culinary', 'Recipes'],
  icons: {
    // Points to the logo you added to the public folder
    icon: 'public\recipa-logo.jpg', 
  },
  openGraph: {
    title: 'Recipa - Precision Cooking with AI',
    description: 'Your professional AI culinary assistant.',
    siteName: 'Recipa',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen antialiased flex flex-col bg-white`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}