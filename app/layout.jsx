import '../src/index.css';
import { AppProvider } from '../src/context/AppContext';

export const metadata = {
  title: 'Hospital Billing Discount System',
  description: 'Discount Permission & Approval System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
