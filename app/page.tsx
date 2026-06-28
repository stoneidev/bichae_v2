import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import DailyReportCard from '@/components/DailyReportCard';
import ArchiveSection from '@/components/ArchiveSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <HeroSection />
      <DailyReportCard />
      <ArchiveSection />
      <Footer />
    </main>
  );
}
