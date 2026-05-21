import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';

export const metadata: Metadata = {
  title: 'Vidhyaly - NEET Excellence Platform',
  description: 'Master Physics, Chemistry, and Biology for NEET with our advanced tracking and resource library.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background min-h-screen">
        <SidebarProvider>
          <div className="flex w-full">
            <AppSidebar />
            <main className="flex-1 w-full overflow-hidden p-6 md:p-10">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}