
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockContracts = [
  { id: 1, supplier: "Shell Aviation", location: "Cape Town International", startDate: "2023-01-01", endDate: "2023-12-31", updateFrequency: "Weekly (Tuesday)", splitType: "Percentage", splitValue: "60%", status: "Active" },
  { id: 2, supplier: "BP Fuel", location: "O.R. Tambo International", startDate: "2023-01-01", endDate: "2023-12-31", updateFrequency: "First day of Month", splitType: "Days", splitValue: "15 days", status: "Active" },
  { id: 3, supplier: "Engen", location: "King Shaka International", startDate: "2023-01-01", endDate: "2023-06-30", updateFrequency: "Weekly (Tuesday)", splitType: "Percentage", splitValue: "50%", status: "Expired" },
  { id: 4, supplier: "Total", location: "George Airport", startDate: "2023-03-01", endDate: "2024-02-29", updateFrequency: "First day of Month", splitType: "Days", splitValue: "20 days", status: "Active" },
];

const Contracts = () => {
  return (
    <PageLayout title="Master Data - Contracts">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contract Management</CardTitle>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Contract
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contracts..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Price Update</TableHead>
                  <TableHead>Split Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.supplier}</TableCell>
                    <TableCell>{contract.location}</TableCell>
                    <TableCell>{contract.startDate}</TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                    <TableCell>{contract.updateFrequency}</TableCell>
                    <TableCell>{contract.splitType} ({contract.splitValue})</TableCell>
                    <TableCell>
                      <Badge variant={contract.status === "Active" ? "default" : "secondary"}>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default Contracts;
