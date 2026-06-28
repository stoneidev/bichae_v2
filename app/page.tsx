import { HeaderWidget, HeroWidget, DailyReportWidget, ArchiveWidget, FooterWidget } from '@/src/widgets';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <HeaderWidget />
      <HeroWidget />
      <DailyReportWidget />
      <ArchiveWidget />
      <FooterWidget />
    </main>
  );
}
