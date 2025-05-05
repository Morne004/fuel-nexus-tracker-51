
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockTariffs = [
  { id: 1, supplier: "Shell Aviation", location: "Cape Town International", contractRef: "SH-CPT-2023", basePrice: 18.45, differential: 0.85, markup: 0.35, startDate: "2023-01-01", endDate: "2023-06-30", status: "Active" },
  { id: 2, supplier: "BP Fuel", location: "O.R. Tambo International", contractRef: "BP-JNB-2023", basePrice: 18.65, differential: 0.75, markup: 0.40, startDate: "2023-01-01", endDate: "2023-12-31", status: "Active" },
  { id: 3, supplier: "Engen", location: "King Shaka International", contractRef: "ENG-DUR-2023", basePrice: 18.55, differential: 0.80, markup: 0.38, startDate: "2023-01-01", endDate: "2023-03-31", status: "Expired" },
  { id: 4, supplier: "Total", location: "George Airport", contractRef: null, basePrice: 18.90, differential: 0.90, markup: 0.42, startDate: "2023-04-01", endDate: "2023-06-30", status: "Active" },
];

const Tariffs = () => {
  return (
    <PageLayout title="Master Data - Tariffs">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tariff Management</CardTitle>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Tariff
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tariffs..."
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
                  <TableHead>Contract Ref</TableHead>
                  <TableHead>Base Price/L</TableHead>
                  <TableHead>Differential/L</TableHead>
                  <TableHead>Markup/L</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTariffs.map((tariff) => (
                  <TableRow key={tariff.id}>
                    <TableCell className="font-medium">{tariff.supplier}</TableCell>
                    <TableCell>{tariff.location}</TableCell>
                    <TableCell>{tariff.contractRef || <span className="text-muted-foreground text-sm">Spot Supply</span>}</TableCell>
                    <TableCell>R {tariff.basePrice.toFixed(2)}</TableCell>
                    <TableCell>R {tariff.differential.toFixed(2)}</TableCell>
                    <TableCell>R {tariff.markup.toFixed(2)}</TableCell>
                    <TableCell>{tariff.startDate}</TableCell>
                    <TableCell>{tariff.endDate}</TableCell>
                    <TableCell>
                      <Badge variant={tariff.status === "Active" ? "default" : "secondary"}>
                        {tariff.status}
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

export default Tariffs;
