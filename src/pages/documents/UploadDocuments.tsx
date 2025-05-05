
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';

const UploadDocuments = () => {
  return (
    <PageLayout title="Documents - Upload Documents">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Document</CardTitle>
            <CardDescription>Upload invoices and supporting documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Document Type</label>
                <Select defaultValue="invoice">
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
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
                <label className="text-sm font-medium leading-none mb-2 block">Invoice Date</label>
                <Input type="date" />
              </div>
              
              <div>
                <label className="text-sm font-medium leading-none mb-2 block">Invoice Number</label>
                <Input placeholder="Enter invoice number" />
              </div>
              
              <div className="sm:col-span-2">
                <label className="text-sm font-medium leading-none mb-2 block">Notes</label>
                <Textarea placeholder="Add any additional notes about this document" rows={3} />
              </div>
            </div>
            
            <div className="mt-6 border-2 border-dashed rounded-lg p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Drag & Drop Document Here</h3>
                <p className="text-sm text-muted-foreground">or</p>
                <Button>Browse Files</Button>
                <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, JPG, PNG</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default UploadDocuments;
