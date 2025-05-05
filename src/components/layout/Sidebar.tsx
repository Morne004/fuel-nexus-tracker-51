
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Database,
  Upload,
  FileText,
  BarChart3,
  Layers
} from 'lucide-react';

type NavItemProps = {
  title: string;
  path?: string;
  icon: React.ReactNode;
  children?: { title: string; path: string }[];
  isActive?: boolean;
};

const NavItem = ({ title, path, icon, children, isActive }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const hasChildren = Array.isArray(children) && children.length > 0;
  
  return (
    <div className="mb-1">
      {hasChildren ? (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center w-full px-3 py-2 text-sm rounded-md font-medium",
              isActive ? "text-white bg-sidebar-accent" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <span className="flex items-center flex-1">
              <span className="mr-2 h-5 w-5">{icon}</span>
              {title}
            </span>
            <span className="h-4 w-4">
              {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </span>
          </button>
          {isOpen && (
            <div className="ml-4 mt-1 pl-2 border-l border-sidebar-border">
              {children?.map((child, index) => (
                <Link
                  key={index}
                  to={child.path}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md",
                    useLocation().pathname === child.path
                      ? "text-white bg-sidebar-accent"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          to={path || "#"}
          className={cn(
            "flex items-center px-3 py-2 text-sm rounded-md font-medium",
            isActive ? "text-white bg-sidebar-accent" : "text-sidebar-foreground hover:bg-sidebar-accent/50"
          )}
        >
          <span className="mr-2 h-5 w-5">{icon}</span>
          {title}
        </Link>
      )}
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-sidebar z-50 flex flex-col border-r border-sidebar-border">
      <div className="p-4 flex items-center justify-center border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-white">B4i Fuel Nexus</h1>
      </div>
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        <NavItem
          title="Dashboard"
          path="/"
          icon={<LayoutDashboard className="h-5 w-5" />}
          isActive={path === "/"}
        />
        <NavItem
          title="Master Data"
          icon={<Database className="h-5 w-5" />}
          isActive={path.includes("/master-data")}
          children={[
            { title: "Locations", path: "/master-data/locations" },
            { title: "Suppliers", path: "/master-data/suppliers" },
            { title: "Contracts", path: "/master-data/contracts" },
            { title: "Tariffs", path: "/master-data/tariffs" },
          ]}
        />
        <NavItem
          title="Data Processing"
          icon={<Upload className="h-5 w-5" />}
          isActive={path.includes("/data-processing")}
          children={[
            { title: "Supplier Uploads", path: "/data-processing/supplier-uploads" },
            { title: "FlySafair Uploads", path: "/data-processing/flysafair-uploads" },
          ]}
        />
        <NavItem
          title="Reconciliation"
          icon={<Layers className="h-5 w-5" />}
          isActive={path.includes("/reconciliation")}
          children={[
            { title: "Combined Records", path: "/reconciliation/combined-records" },
            { title: "Queries", path: "/reconciliation/queries" },
          ]}
        />
        <NavItem
          title="Documents"
          icon={<FileText className="h-5 w-5" />}
          isActive={path.includes("/documents")}
          children={[
            { title: "Upload Documents", path: "/documents/upload" },
            { title: "Manage Documents", path: "/documents/manage" },
          ]}
        />
        <NavItem
          title="Reports"
          icon={<BarChart3 className="h-5 w-5" />}
          path="/reports"
          isActive={path.includes("/reports")}
        />
      </div>
      <div className="p-3 text-xs text-sidebar-foreground/60 border-t border-sidebar-border">
        B4i Fuel Management System v1.0
      </div>
    </div>
  );
};

export default Sidebar;
