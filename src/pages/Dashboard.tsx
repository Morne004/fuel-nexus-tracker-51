
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  return (
    <PageLayout title="Dashboard">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Uplifts</CardTitle>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2M L</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Queries</CardTitle>
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                -4 from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Invoices</CardTitle>
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +3 from yesterday
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start space-x-4 border-b pb-3 last:border-0">
                  <div className="rounded-full w-2 h-2 mt-2 bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New movement report uploaded</p>
                    <p className="text-xs text-muted-foreground">Supplier: Shell, Location: CPT</p>
                    <p className="text-xs text-muted-foreground">12 minutes ago</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Attention Required</CardTitle>
              <CardDescription>Items requiring immediate action</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start space-x-4 border-b pb-3 last:border-0">
                  <div className="rounded-full w-2 h-2 mt-2 bg-destructive"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Tariff expiring in 2 days</p>
                    <p className="text-xs text-muted-foreground">Supplier: Engen, Location: JNB</p>
                    <p className="text-xs text-muted-foreground">Action required before 2023-06-15</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
