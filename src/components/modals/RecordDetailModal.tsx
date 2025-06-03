
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
import { Eye, Save, X, Edit3, FileText, Calculator, AlertCircle, CheckCircle } from 'lucide-react';

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

  const getMatchIcon = (isMatch: boolean) => (
    isMatch ? <CheckCircle className="h-4 w-4 text-green-600" /> : <AlertCircle className="h-4 w-4 text-red-600" />
  );

  const calculateMatchScore = () => {
    const matches = Object.values(record.matchingCriteria);
    return matches.filter(Boolean).length;
  };

  const handleViewContract = () => {
    console.log(`Viewing contract ${record.contractId} for flight ${record.flightNumber}`);
    // Navigate to contract detail view
    window.open(`/master-data/contracts?id=${record.contractId}`, '_blank');
  };

  const handleViewTariff = () => {
    console.log(`Viewing tariff ${record.tariffId} for flight ${record.flightNumber}`);
    // Navigate to tariff detail view
    window.open(`/master-data/tariffs?id=${record.tariffId}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-2xl font-bold">
                Flight {record.flightNumber}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant={calculateMatchScore() === 5 ? "default" : "destructive"} className="text-sm px-3 py-1">
                  {calculateMatchScore()}/5 Match
                </Badge>
                <Badge variant={
                  record.status === "Ready to be Invoiced" ? "default" : 
                  record.status === "Need Credit Note" ? "destructive" : 
                  record.status.includes("Query") ? "destructive" :
                  "secondary"
                } className="text-sm px-3 py-1">
                  {record.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {record.contractId && (
                <Button variant="outline" onClick={handleViewContract} className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  View Contract
                </Button>
              )}
              {record.tariffId && (
                <Button variant="outline" onClick={handleViewTariff} className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  View Tariff
                </Button>
              )}
              {isEditing ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                    Cancel
                  </Button>
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 py-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-blue-600">
                  {editedRecord.flySafairData.upliftmentVolume} L
                </div>
                <p className="text-sm text-muted-foreground">FlySafair Volume</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-2xl font-bold text-green-600">
                  {editedRecord.supplierData.volume} L
                </div>
                <p className="text-sm text-muted-foreground">Supplier Volume</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className={`text-2xl font-bold ${
                  record.variance === 0 ? "text-green-600" : 
                  Math.abs(record.variance) < 30 ? "text-amber-600" : "text-red-600"
                }`}>
                  {record.variance > 0 ? "+" : ""}{record.variance} L
                </div>
                <p className="text-sm text-muted-foreground">Variance</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-4">
                <div className="text-lg font-bold">
                  {record.flightDate}
                </div>
                <p className="text-sm text-muted-foreground">Flight Date</p>
              </CardContent>
            </Card>
          </div>

          {/* Matching Criteria */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Matching Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                  {getMatchIcon(record.matchingCriteria.flight_match)}
                  <span className="text-sm font-medium">Flight</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                  {getMatchIcon(record.matchingCriteria.date_match)}
                  <span className="text-sm font-medium">Date</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                  {getMatchIcon(record.matchingCriteria.reg_match)}
                  <span className="text-sm font-medium">Registration</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                  {getMatchIcon(record.matchingCriteria.fuel_match)}
                  <span className="text-sm font-medium">Fuel</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/30">
                  {getMatchIcon(record.matchingCriteria.ticket_slip_match)}
                  <span className="text-sm font-medium">Ticket/Slip</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FlySafair Data */}
            <Card className="border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-lg text-blue-700 flex items-center gap-2">
                  FlySafair Data
                  <Badge variant="outline" className="text-blue-600 border-blue-300">
                    Internal
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fs-flight" className="text-sm font-medium">Flight Number</Label>
                    <Input
                      id="fs-flight"
                      value={editedRecord.flySafairData.flightNumber}
                      onChange={(e) => updateFlySafairField('flightNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fs-aircraft" className="text-sm font-medium">Aircraft Registration</Label>
                    <Input
                      id="fs-aircraft"
                      value={editedRecord.flySafairData.aircraftRegistration}
                      onChange={(e) => updateFlySafairField('aircraftRegistration', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fs-volume" className="text-sm font-medium">Upliftment Volume (L)</Label>
                    <Input
                      id="fs-volume"
                      type="number"
                      value={editedRecord.flySafairData.upliftmentVolume}
                      onChange={(e) => updateFlySafairField('upliftmentVolume', parseFloat(e.target.value))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fs-slip" className="text-sm font-medium">Fuel Slip Number</Label>
                    <Input
                      id="fs-slip"
                      value={editedRecord.flySafairData.fuelSlipNumber}
                      onChange={(e) => updateFlySafairField('fuelSlipNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </div>

                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Date</Label>
                    <Input value={editedRecord.flySafairData.date} disabled className="bg-muted text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <Input value={editedRecord.flySafairData.location} disabled className="bg-muted text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supplier Data */}
            <Card className="border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                  Supplier Data
                  <Badge variant="outline" className="text-green-600 border-green-300">
                    {editedRecord.supplierData.supplier}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sup-flight" className="text-sm font-medium">Flight Number</Label>
                    <Input
                      id="sup-flight"
                      value={editedRecord.supplierData.flightNumber}
                      onChange={(e) => updateSupplierField('flightNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sup-aircraft" className="text-sm font-medium">Aircraft Registration</Label>
                    <Input
                      id="sup-aircraft"
                      value={editedRecord.supplierData.aircraftRegistration}
                      onChange={(e) => updateSupplierField('aircraftRegistration', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sup-date" className="text-sm font-medium">Flight Date</Label>
                    <Input
                      id="sup-date"
                      value={editedRecord.supplierData.flightDate}
                      onChange={(e) => updateSupplierField('flightDate', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sup-ticket" className="text-sm font-medium">Ticket/Invoice Number</Label>
                    <Input
                      id="sup-ticket"
                      value={editedRecord.supplierData.ticketInvoiceNumber}
                      onChange={(e) => updateSupplierField('ticketInvoiceNumber', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </div>

                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Volume (L)</Label>
                    <Input value={editedRecord.supplierData.volume} disabled className="bg-muted text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <Input value={editedRecord.supplierData.location} disabled className="bg-muted text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordDetailModal;
