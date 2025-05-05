
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Flag } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockRecords = [
  { id: 1, flightDate: "2023-05-10", flightNumber: "FA103", aircraft: "ZS-SFB", supplier: "Shell Aviation", location: "CPT", movementVolume: 4500, ifsVolume: 4520, variance: -20, status: "Matched" },
  { id: 2, flightDate: "2023-05-10", flightNumber: "FA205", aircraft: "ZS-SFA", supplier: "BP Fuel", location: "JNB", movementVolume: 3800, ifsVolume: 3800, variance: 0, status: "Reconciled" },
  { id: 3, flightDate: "2023-05-11", flightNumber: "FA302", aircraft: "ZS-SFC", supplier: "Engen", location: "DUR", movementVolume: 4200, ifsVolume: 4250, variance: -50, status: "Queried" },
  { id: 4, flightDate: "2023-05-12", flightNumber: "FA104", aircraft: "ZS-SFD", supplier: "Shell Aviation", location: "CPT", movementVolume: 4300, ifsVolume: 4280, variance: 20, status: "Matched" },
  { id: 5, flightDate: "2023-05-12", flightNumber: "FA207", aircraft: "ZS-SFE", supplier: "BP Fuel", location: "JNB", movementVolume: 3950, ifsVolume: 3950, variance: 0, status: "Invoiced" },
];

const CombinedRecords = () => {
  return (
    <PageLayout title="Reconciliation - Combined Records">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,284</div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reconciled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,156</div>
              <p className="text-xs text-muted-foreground">90% of total</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">102</div>
              <p className="text-xs text-muted-foreground">8% of total</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Queried</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">26</div>
              <p className="text-xs text-muted-foreground">2% of total</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Combined Records</CardTitle>
            <CardDescription>View and manage matched movement and IFS records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-5">
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Date Range</label>
                <Select defaultValue="this-month">
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Supplier</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Suppliers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Suppliers</SelectItem>
                    <SelectItem value="shell">Shell Aviation</SelectItem>
                    <SelectItem value="bp">BP Fuel</SelectItem>
                    <SelectItem value="engen">Engen</SelectItem>
                    <SelectItem value="total">Total</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Location</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="cpt">Cape Town (CPT)</SelectItem>
                    <SelectItem value="jnb">Johannesburg (JNB)</SelectItem>
                    <SelectItem value="dur">Durban (DUR)</SelectItem>
                    <SelectItem value="grj">George (GRJ)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Status</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="matched">Matched</SelectItem>
                    <SelectItem value="reconciled">Reconciled</SelectItem>
                    <SelectItem value="queried">Queried</SelectItem>
                    <SelectItem value="invoiced">Invoiced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Flight #, Aircraft..." className="pl-8" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  Advanced Filter
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Showing 5 of 1,284 records
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-4">
              <TabsList>
                <TabsTrigger value="all">All Records</TabsTrigger>
                <TabsTrigger value="unmatched">Unmatched</TabsTrigger>
                <TabsTrigger value="queried">Queried</TabsTrigger>
                <TabsTrigger value="reconciled">Reconciled</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flight Date</TableHead>
                    <TableHead>Flight #</TableHead>
                    <TableHead>Aircraft</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Movement Vol.</TableHead>
                    <TableHead>IFS Vol.</TableHead>
                    <TableHead>Variance</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.flightDate}</TableCell>
                      <TableCell>{record.flightNumber}</TableCell>
                      <TableCell>{record.aircraft}</TableCell>
                      <TableCell>{record.supplier}</TableCell>
                      <TableCell>{record.location}</TableCell>
                      <TableCell>{record.movementVolume} L</TableCell>
                      <TableCell>{record.ifsVolume} L</TableCell>
                      <TableCell className={
                        record.variance === 0 ? "text-green-600" : 
                        Math.abs(record.variance) < 30 ? "text-amber-600" : "text-red-600"
                      }>
                        {record.variance > 0 ? "+" : ""}{record.variance} L
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          record.status === "Reconciled" ? "default" : 
                          record.status === "Matched" ? "outline" : 
                          record.status === "Queried" ? "destructive" :
                          "secondary"
                        }>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default CombinedRecords;
