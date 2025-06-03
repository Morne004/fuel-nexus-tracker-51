
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Eye, Save, X } from 'lucide-react';

interface RecordData {
  id: number;
  flightDate: string;
  flightNumber: string;
  aircraft: string;
  supplier: string;
  location: string;
  movementVolume: number;
  ifsVolume: number;
  variance: number;
  status: string;
  // Additional fields for detailed view
  flySafairData: {
    flightNumber: string;
    aircraftRegistration: string;
    upliftmentVolume: number;
    fuelSlipNumber: string;
    date: string;
    location: string;
  };
  supplierData: {
    flightNumber: string;
    flightDate: string;
    aircraftRegistration: string;
    ticketInvoiceNumber: string;
    volume: number;
    supplier: string;
    location: string;
  };
  matchingCriteria: {
    flight_match: boolean;
    date_match: boolean;
    reg_match: boolean;
    fuel_match: boolean;
    ticket_slip_match: boolean;
  };
  contractId?: string;
  tariffId?: string;
}

interface RecordDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: RecordData | null;
  onSave: (updatedRecord: RecordData) => void;
  onViewContract?: () => void;
  onViewTariff?: () => void;
}

const RecordDetailModal = ({
  open,
  onOpenChange,
  record,
  onSave,
  onViewContract,
  onViewTariff
}: RecordDetailModalProps) => {
  const [editedRecord, setEditedRecord] = useState<RecordData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  React.useEffect(() => {
    if (record) {
      setEditedRecord({ ...record });
    }
  }, [record]);

  if (!record || !editedRecord) return null;

  const handleSave = () => {
    onSave(editedRecord);
    setIsEditing(false);
    onOpenChange(false);
  };

  const updateFlySafairField = (field: string, value: string | number) => {
    setEditedRecord(prev => prev ? {
      ...prev,
      flySafairData: {
        ...prev.flySafairData,
        [field]: value
      }
    } : null);
  };

  const updateSupplierField = (field: string, value: string | number) => {
    setEditedRecord(prev => prev ? {
      ...prev,
      supplierData: {
        ...prev.supplierData,
        [field]: value
      }
    } : null);
  };

  const getMatchBadge = (isMatch: boolean, label: string) => (
    <Badge variant={isMatch ? "default" : "destructive"} className="text-xs">
      {label}: {isMatch ? "✓" : "✗"}
    </Badge>
  );

  const calculateMatchScore = () => {
    const matches = Object.values(record.matchingCriteria);
    return matches.filter(Boolean).length;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Record Details - {record.flightNumber}</span>
            <div className="flex items-center gap-2">
              <Badge variant={calculateMatchScore() === 5 ? "default" : "secondary"}>
                Match Score: {calculateMatchScore()}/5
              </Badge>
              <Badge variant={
                record.status === "Ready to be Invoiced" ? "default" : 
                record.status === "Need Credit Note" ? "destructive" : 
                record.status.includes("Query") ? "destructive" :
                "secondary"
              }>
                {record.status}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Matching Criteria Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Matching Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {getMatchBadge(record.matchingCriteria.flight_match, "Flight")}
                {getMatchBadge(record.matchingCriteria.date_match, "Date")}
                {getMatchBadge(record.matchingCriteria.reg_match, "Registration")}
                {getMatchBadge(record.matchingCriteria.fuel_match, "Fuel")}
                {getMatchBadge(record.matchingCriteria.ticket_slip_match, "Ticket/Slip")}
              </div>
            </CardContent>
          </Card>

          {/* Side-by-side Data Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FlySafair Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">FlySafair Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fs-flight">Flight Number</Label>
                  <Input
                    id="fs-flight"
                    value={editedRecord.flySafairData.flightNumber}
                    onChange={(e) => updateFlySafairField('flightNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fs-aircraft">Aircraft Registration</Label>
                  <Input
                    id="fs-aircraft"
                    value={editedRecord.flySafairData.aircraftRegistration}
                    onChange={(e) => updateFlySafairField('aircraftRegistration', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fs-volume">Upliftment Volume (L)</Label>
                  <Input
                    id="fs-volume"
                    type="number"
                    value={editedRecord.flySafairData.upliftmentVolume}
                    onChange={(e) => updateFlySafairField('upliftmentVolume', parseFloat(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fs-slip">Fuel Slip Number</Label>
                  <Input
                    id="fs-slip"
                    value={editedRecord.flySafairData.fuelSlipNumber}
                    onChange={(e) => updateFlySafairField('fuelSlipNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    value={editedRecord.flySafairData.date}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={editedRecord.flySafairData.location}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Supplier Data */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Supplier Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sup-flight">Flight Number</Label>
                  <Input
                    id="sup-flight"
                    value={editedRecord.supplierData.flightNumber}
                    onChange={(e) => updateSupplierField('flightNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sup-aircraft">Aircraft Registration</Label>
                  <Input
                    id="sup-aircraft"
                    value={editedRecord.supplierData.aircraftRegistration}
                    onChange={(e) => updateSupplierField('aircraftRegistration', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sup-date">Flight Date</Label>
                  <Input
                    id="sup-date"
                    value={editedRecord.supplierData.flightDate}
                    onChange={(e) => updateSupplierField('flightDate', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sup-ticket">Ticket/Invoice Number</Label>
                  <Input
                    id="sup-ticket"
                    value={editedRecord.supplierData.ticketInvoiceNumber}
                    onChange={(e) => updateSupplierField('ticketInvoiceNumber', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Volume (L)</Label>
                  <Input
                    value={editedRecord.supplierData.volume}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supplier</Label>
                  <Input
                    value={editedRecord.supplierData.supplier}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={editedRecord.supplierData.location}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Volume Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Volume Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Label className="text-sm text-muted-foreground">FlySafair Volume</Label>
                  <div className="text-2xl font-bold text-blue-600">
                    {editedRecord.flySafairData.upliftmentVolume} L
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Supplier Volume</Label>
                  <div className="text-2xl font-bold text-green-600">
                    {editedRecord.supplierData.volume} L
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Variance</Label>
                  <div className={`text-2xl font-bold ${
                    record.variance === 0 ? "text-green-600" : 
                    Math.abs(record.variance) < 30 ? "text-amber-600" : "text-red-600"
                  }`}>
                    {record.variance > 0 ? "+" : ""}{record.variance} L
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-2">
              {record.contractId && (
                <Button variant="outline" onClick={onViewContract} className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  View Contract
                </Button>
              )}
              {record.tariffId && (
                <Button variant="outline" onClick={onViewTariff} className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  View Tariff
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="h-4 w-4 mr-1" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Record
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordDetailModal;
