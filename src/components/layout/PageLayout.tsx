
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ColorDivider from '@/components/ui/color-divider';

type PageLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header title={title} />
        <div className="p-6">
          <ColorDivider />
          <main className="my-6">{children}</main>
          <ColorDivider />
          <footer className="text-center mt-8 pt-5 border-t text-muted-foreground text-[13px]">
            B4i Fuel Management System &copy; {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
