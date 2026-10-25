import { DashboardHome } from '@/components/dashboard/home/dashboard-home';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function Page() {
  return (
    <section className="map-page">
      <DashboardHome />
    </section>
  );
}
