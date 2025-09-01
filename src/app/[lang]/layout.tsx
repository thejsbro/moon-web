import { notFound } from 'next/navigation';
import { ThemeProvider } from "@/context/ThemeContext";
import { AppProvider } from "@/context/AppContext";
import I18nProvider from "@/components/I18nProvider";

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

const locales = ['en', 'es'];

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  // Validate that the incoming `lang` parameter is valid
  if (!locales.includes(lang)) {
    notFound();
  }

  return (
    <I18nProvider>
      <ThemeProvider>
        <AppProvider>
          {children}
        </AppProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}