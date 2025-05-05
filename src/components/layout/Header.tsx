
import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
      <h1 className="text-xl font-semibold">{title}</h1>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm text-right">
            <div className="font-medium">Admin User</div>
            <div className="text-xs text-muted-foreground">admin@b4i.com</div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
