
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';

const mockUploads = [
  { id: 1, dateRange: "2023-05-01 to 2023-05-15", filename: "FlySafair_IFS_May2023_1.csv", uploadDate: "2023-05-16 14:28", status: "Processed", records: 145, matchedRecords: 142 },
  { id: 2, dateRange: "2023-05-16 to 2023-05-31", filename: "FlySafair_IFS_May2023_2.csv", uploadDate: "2023-06-01 09:15", status: "Processed", records: 152, matchedRecords: 148 },
  { id: 3, dateRange: "2023-06-01 to 2023-06-15", filename: "FlySafair_IFS_June2023_1.csv", uploadDate: "2023-06-16 10:32", status: "Processing", records: 163, matchedRecords: 120 },
  { id: 4, dateRange: "2023-04-16 to 2023-04-30", filename: "FlySafair_IFS_April2023_2.csv", uploadDate: "2023-05-02 15:44", status: "Processed", records: 141, matchedRecords: 141 },
];

const FlySafairUploads = () => {
  return (
    <PageLayout title="Data Processing - FlySafair Uploads">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload IFS Data</CardTitle>
            <CardDescription>Import FlySafair IFS data for reconciliation with supplier movement reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
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
                <h3 className="text-lg font-semibold">Drag & Drop IFS File Here</h3>
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
              <CardTitle>Recent IFS Uploads</CardTitle>
              <CardDescription>History of recent FlySafair IFS data imports</CardDescription>
            </div>
            <Button variant="outline">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Filename</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Records</TableHead>
                    <TableHead>Matched</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUploads.map((upload) => (
                    <TableRow key={upload.id}>
                      <TableCell>{upload.dateRange}</TableCell>
                      <TableCell className="font-mono text-xs">{upload.filename}</TableCell>
                      <TableCell>{upload.uploadDate}</TableCell>
                      <TableCell>{upload.records}</TableCell>
                      <TableCell>{upload.matchedRecords} ({Math.round(upload.matchedRecords / upload.records * 100)}%)</TableCell>
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

export default FlySafairUploads;
