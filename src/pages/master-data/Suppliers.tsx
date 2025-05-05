
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash } from 'lucide-react';

const mockSuppliers = [
  { id: 1, friendlyName: "Shell Aviation", legalName: "Shell South Africa (Pty) Ltd", pdfInvoiceName: "Shell Aviation SA", primaryContactName: "John Smith", primaryContactEmail: "john.smith@shell.com" },
  { id: 2, friendlyName: "BP Fuel", legalName: "BP Southern Africa (Pty) Ltd", pdfInvoiceName: "BP Aviation", primaryContactName: "Sarah Johnson", primaryContactEmail: "sarah.j@bp.com" },
  { id: 3, friendlyName: "Engen", legalName: "Engen Petroleum Ltd", pdfInvoiceName: "Engen Aviation", primaryContactName: "Michael Brown", primaryContactEmail: "m.brown@engen.co.za" },
  { id: 4, friendlyName: "Total", legalName: "TotalEnergies Marketing South Africa (Pty) Ltd", pdfInvoiceName: "TotalEnergies Aviation", primaryContactName: "Lisa Williams", primaryContactEmail: "lisa.w@totalenergies.com" },
];

const Suppliers = () => {
  return (
    <PageLayout title="Master Data - Suppliers">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supplier Management</CardTitle>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Supplier
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Friendly Name</TableHead>
                  <TableHead>Legal Entity Name</TableHead>
                  <TableHead>PDF Invoice Name</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.friendlyName}</TableCell>
                    <TableCell>{supplier.legalName}</TableCell>
                    <TableCell>{supplier.pdfInvoiceName}</TableCell>
                    <TableCell>{supplier.primaryContactName}</TableCell>
                    <TableCell>{supplier.primaryContactEmail}</TableCell>
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

export default Suppliers;
