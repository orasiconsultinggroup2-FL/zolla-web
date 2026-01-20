import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background-dark relative">
        {children}
      </main>
    </div>
  );
};

export default Layout;