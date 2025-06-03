
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';

interface ContractViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contractId: string;
}

const ContractViewModal = ({ open, onOpenChange, contractId }: ContractViewModalProps) => {
  // Mock contract data - replace with actual data fetching
  const contractData = {
    id: contractId,
    name: "Shell Aviation Fuel Supply Agreement",
    supplier: "Shell Aviation",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "Active",
    locations: ["CPT", "JNB", "DUR"],
    terms: "Net 30 days payment terms",
    fuelTypes: ["Jet A-1"],
    description: "Primary fuel supply contract for Shell Aviation covering all major airports."
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contract Details - {contractData.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{contractData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Supplier:</span>
                  <p className="text-sm">{contractData.supplier}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Status:</span>
                  <Badge variant="default" className="ml-2">{contractData.status}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Contract Period</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Start Date:</span>
                  <p className="text-sm">{contractData.startDate}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">End Date:</span>
                  <p className="text-sm">{contractData.endDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Contract Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Locations:</span>
                <div className="flex gap-2 mt-1">
                  {contractData.locations.map((location) => (
                    <Badge key={location} variant="outline">{location}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Fuel Types:</span>
                <div className="flex gap-2 mt-1">
                  {contractData.fuelTypes.map((fuel) => (
                    <Badge key={fuel} variant="outline">{fuel}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Payment Terms:</span>
                <p className="text-sm">{contractData.terms}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Description:</span>
                <p className="text-sm">{contractData.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractViewModal;
