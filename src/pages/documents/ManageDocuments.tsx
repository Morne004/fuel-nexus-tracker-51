
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Eye, Link as LinkIcon } from 'lucide-react';

const mockDocuments = [
  { id: "DOC-2023-0142", type: "Supplier Invoice", supplier: "Shell Aviation", reference: "INV-SA-56789", uploadDate: "2023-05-16", uploadedBy: "John Smith", status: "Processed", linkedRecords: 14 },
  { id: "DOC-2023-0141", type: "Supplier Invoice", supplier: "BP Fuel", reference: "BP-JNB-43215", uploadDate: "2023-05-15", uploadedBy: "Sarah Johnson", status: "Processing", linkedRecords: 9 },
  { id: "DOC-2023-0140", type: "Supporting Document", supplier: "Engen", reference: "Support-ENG-123", uploadDate: "2023-05-14", uploadedBy: "Michael Brown", status: "Processed", linkedRecords: 1 },
  { id: "DOC-2023-0139", type: "Contract Document", supplier: "Total", reference: "CONTRACT-TOTAL-GRJ-2023", uploadDate: "2023-05-12", uploadedBy: "Lisa Williams", status: "Processed", linkedRecords: 0 },
  { id: "DOC-2023-0138", type: "Supplier Invoice", supplier: "Shell Aviation", reference: "INV-SA-56788", uploadDate: "2023-05-10", uploadedBy: "John Smith", status: "Processed", linkedRecords: 12 },
];

const ManageDocuments = () => {
  return (
    <PageLayout title="Documents - Manage Documents">
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
          <CardDescription>View and manage all system documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-sm font-medium leading-none mb-2 block">Document Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="invoice">Supplier Invoice</SelectItem>
                  <SelectItem value="supporting">Supporting Document</SelectItem>
                  <SelectItem value="contract">Contract Document</SelectItem>
                  <SelectItem value="other">Other Document</SelectItem>
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
              <label className="text-sm font-medium leading-none mb-2 block">Status</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="processed">Processed</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium leading-none mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Document ID, Reference..." className="pl-8" />
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
              Showing 5 of 142 documents
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Linked Records</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDocuments.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.supplier}</TableCell>
                    <TableCell>{doc.reference}</TableCell>
                    <TableCell>{doc.uploadDate}</TableCell>
                    <TableCell>{doc.uploadedBy}</TableCell>
                    <TableCell>{doc.linkedRecords}</TableCell>
                    <TableCell>
                      <Badge variant={
                        doc.status === "Processed" ? "default" : 
                        doc.status === "Processing" ? "outline" : "destructive"
                      }>
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <LinkIcon className="h-4 w-4" />
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

export default ManageDocuments;
