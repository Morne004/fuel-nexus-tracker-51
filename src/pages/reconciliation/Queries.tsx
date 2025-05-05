
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

const mockQueries = [
  { id: "QRY-2023-0042", recordRef: "REC-2023-5842", flightDate: "2023-05-11", flightNumber: "FA302", queryType: "Volume Discrepancy", description: "Movement report shows 4200L but IFS shows 4250L", createdDate: "2023-05-12", status: "Open", assignee: "John Smith" },
  { id: "QRY-2023-0041", recordRef: "REC-2023-5825", flightDate: "2023-05-10", flightNumber: "FA154", queryType: "Missing Invoice", description: "No supplier invoice received for this uplift", createdDate: "2023-05-12", status: "In Progress", assignee: "Sarah Johnson" },
  { id: "QRY-2023-0040", recordRef: "REC-2023-5801", flightDate: "2023-05-09", flightNumber: "FA201", queryType: "Tariff Issue", description: "Applied tariff does not match contract terms", createdDate: "2023-05-11", status: "Resolved", assignee: "Michael Brown" },
  { id: "QRY-2023-0039", recordRef: "REC-2023-5789", flightDate: "2023-05-08", flightNumber: "FA103", queryType: "PO Number Mismatch", description: "PO number on movement report doesn't match IFS", createdDate: "2023-05-10", status: "Closed", assignee: "Lisa Williams" },
  { id: "QRY-2023-0038", recordRef: "REC-2023-5774", flightDate: "2023-05-08", flightNumber: "FA245", queryType: "Volume Discrepancy", description: "Movement report shows 3750L but IFS shows 3850L", createdDate: "2023-05-09", status: "In Progress", assignee: "John Smith" },
];

const Queries = () => {
  return (
    <PageLayout title="Reconciliation - Queries">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">26</div>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">31% of total</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">46% of total</p>
            </CardContent>
          </Card>
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">23% of total</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Query Management</CardTitle>
            <CardDescription>Manage and resolve record discrepancies and issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-4">
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Status</label>
                <Select defaultValue="open">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Query Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="volume">Volume Discrepancy</SelectItem>
                    <SelectItem value="tariff">Tariff Issue</SelectItem>
                    <SelectItem value="invoice">Missing Invoice</SelectItem>
                    <SelectItem value="po">PO Number Mismatch</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Assignee</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Assignees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Assignees</SelectItem>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="michael">Michael Brown</SelectItem>
                    <SelectItem value="lisa">Lisa Williams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Query ID, Flight..." className="pl-8" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                Advanced Filter
              </Button>
              <div className="text-sm text-muted-foreground">
                Showing 5 of 26 queries
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query ID</TableHead>
                    <TableHead>Record Ref</TableHead>
                    <TableHead>Flight Details</TableHead>
                    <TableHead>Query Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockQueries.map((query) => (
                    <TableRow key={query.id}>
                      <TableCell className="font-medium">{query.id}</TableCell>
                      <TableCell>{query.recordRef}</TableCell>
                      <TableCell>{query.flightDate}<br/>{query.flightNumber}</TableCell>
                      <TableCell>{query.queryType}</TableCell>
                      <TableCell className="max-w-xs truncate">{query.description}</TableCell>
                      <TableCell>{query.createdDate}</TableCell>
                      <TableCell>{query.assignee}</TableCell>
                      <TableCell>
                        <Badge variant={
                          query.status === "Open" ? "destructive" : 
                          query.status === "In Progress" ? "outline" : 
                          query.status === "Resolved" ? "default" :
                          "secondary"
                        }>
                          {query.status}
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

export default Queries;
