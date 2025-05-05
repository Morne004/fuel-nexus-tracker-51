
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

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
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default PageLayout;
