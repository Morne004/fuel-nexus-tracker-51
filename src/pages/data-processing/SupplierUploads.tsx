
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';

const mockUploads = [
  { id: 1, type: "Movement Report", supplier: "Shell Aviation", dateRange: "2023-05-01 to 2023-05-15", filename: "Shell_CPT_May2023_1.csv", uploadDate: "2023-05-16 09:23", status: "Processed", records: 42 },
  { id: 2, type: "Split Report", supplier: "Shell Aviation", dateRange: "2023-05-01 to 2023-05-15", filename: "Shell_CPT_May2023_Split_1.csv", uploadDate: "2023-05-16 10:45", status: "Processed", records: 42 },
  { id: 3, type: "Movement Report", supplier: "BP Fuel", dateRange: "2023-05-01 to 2023-05-31", filename: "BP_JNB_May2023.xlsx", uploadDate: "2023-06-01 14:12", status: "Processed", records: 87 },
  { id: 4, type: "Movement Report", supplier: "Engen", dateRange: "2023-06-01 to 2023-06-15", filename: "Engen_DUR_June2023_1.csv", uploadDate: "2023-06-16 08:32", status: "Processing", records: 38 },
  { id: 5, type: "Movement Report", supplier: "Total", dateRange: "2023-05-01 to 2023-05-31", filename: "Total_GRJ_May2023.csv", uploadDate: "2023-06-02 11:05", status: "Error", records: 0 },
];

const SupplierUploads = () => {
  return (
    <PageLayout title="Data Processing - Supplier Uploads">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Movement or Split Report</CardTitle>
            <CardDescription>Import movement data from suppliers or upload split reports for existing movement data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">File Type</label>
                <Select defaultValue="movement">
                  <SelectTrigger>
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="movement">Movement Report</SelectItem>
                    <SelectItem value="split">Split Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Supplier</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shell">Shell Aviation</SelectItem>
                    <SelectItem value="bp">BP Fuel</SelectItem>
                    <SelectItem value="engen">Engen</SelectItem>
                    <SelectItem value="total">Total</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">From Date</label>
                <Input type="date" />
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">To Date</label>
                <Input type="date" />
              </div>
            </div>
            
            <div className="mt-6 border-2 border-dashed rounded-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Drag & Drop Files Here</h3>
                <p className="text-sm text-muted-foreground">or</p>
                <Button>Browse Files</Button>
                <p className="text-xs text-muted-foreground mt-2">Supported formats: CSV, Excel (XLSX)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>History of recent file imports</CardDescription>
            </div>
            <Button variant="outline">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell>{upload.type}</TableCell>
                      <TableCell>{upload.supplier}</TableCell>
                      <TableCell>{upload.dateRange}</TableCell>
                      <TableCell className="font-mono text-xs">{upload.filename}</TableCell>
                      <TableCell>{upload.uploadDate}</TableCell>
                      <TableCell>{upload.records}</TableCell>
                      <TableCell>
                        <Badge variant={
                          upload.status === "Processed" ? "default" : 
                          upload.status === "Processing" ? "outline" : "destructive"
                        }>
                          {upload.status}
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

export default SupplierUploads;
