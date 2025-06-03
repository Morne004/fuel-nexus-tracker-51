
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';

interface TariffViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tariffId: string;
}

const TariffViewModal = ({ open, onOpenChange, tariffId }: TariffViewModalProps) => {
  // Mock tariff data - replace with actual data fetching
  const tariffData = {
    id: tariffId,
    name: "Shell CPT Standard Rates",
    supplier: "Shell Aviation",
    location: "CPT",
    status: "Active",
    effectiveDate: "2023-01-01",
    expiryDate: "2023-12-31",
    basePrice: 18.50,
    currency: "ZAR",
    priceType: "Per Liter",
    customPrices: [
      { description: "Night Operations", value: 2.50 },
      { description: "Weekend Premium", value: 1.25 }
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Tariff Details - {tariffData.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{tariffData.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Supplier:</span>
                  <p className="text-sm">{tariffData.supplier}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Location:</span>
                  <p className="text-sm">{tariffData.location}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Status:</span>
                  <Badge variant="default" className="ml-2">{tariffData.status}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Base Price:</span>
                  <p className="text-sm font-bold">{tariffData.currency} {tariffData.basePrice} {tariffData.priceType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Effective:</span>
                  <p className="text-sm">{tariffData.effectiveDate}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Expires:</span>
                  <p className="text-sm">{tariffData.expiryDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {tariffData.customPrices.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Additional Charges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tariffData.customPrices.map((charge, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <span className="text-sm">{charge.description}</span>
                      <span className="text-sm font-medium">+{tariffData.currency} {charge.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TariffViewModal;
