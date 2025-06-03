import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import TariffModal from '@/components/modals/TariffModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface CustomPrice {
  id: string;
  description: string;
  price: number;
}

interface Tariff {
  id?: number;
  supplierId: string;
  locationId: string;
  replacementSupplierId?: string;
  basePrice: number;
  differential: number;
  markup: number;
  startDate: Date;
  endDate: Date;
  customPerLiterPrices?: CustomPrice[];
  customPerUpliftmentPrices?: CustomPrice[];
  isSpotTariff: boolean;
  contractRef?: string;
  supplier?: string;
  location?: string;
  replacementSupplier?: string;
  status?: string;
}

const initialTariffs: Tariff[] = [
  { 
    id: 1, 
    supplierId: '1',
    locationId: '1',
    supplier: "Shell Aviation", 
    location: "Cape Town International", 
    contractRef: "SH-CPT-2023", 
    basePrice: 18.45, 
    differential: 0.85, 
    markup: 0.35, 
    startDate: new Date("2023-01-01"), 
    endDate: new Date("2023-06-30"), 
    status: "Active",
    isSpotTariff: false,
    customPerLiterPrices: [
      { id: '1', description: 'Peak hour surcharge', price: 0.50 }
    ]
  },
  { 
    id: 2, 
    supplierId: '2',
    locationId: '2',
    supplier: "BP Fuel", 
    location: "O.R. Tambo International", 
    contractRef: "BP-JNB-2023", 
    basePrice: 18.65, 
    differential: 0.75, 
    markup: 0.40, 
    startDate: new Date("2023-01-01"), 
    endDate: new Date("2023-12-31"), 
    status: "Active",
    isSpotTariff: false,
    customPerUpliftmentPrices: [
      { id: '2', description: 'Weekend service fee', price: 150.00 }
    ]
  },
  { 
    id: 3, 
    supplierId: '3',
    locationId: '3',
    supplier: "Engen", 
    location: "King Shaka International", 
    replacementSupplierId: '4',
    replacementSupplier: "Total",
    basePrice: 18.55, 
    differential: 0.80, 
    markup: 0.38, 
    startDate: new Date("2023-01-01"), 
    endDate: new Date("2023-03-31"), 
    status: "Expired",
    isSpotTariff: true
  },
  { 
    id: 4, 
    supplierId: '4',
    locationId: '4',
    supplier: "Total", 
    location: "George Airport", 
    basePrice: 18.90, 
    differential: 0.90, 
    markup: 0.42, 
    startDate: new Date("2023-04-01"), 
    endDate: new Date("2023-06-30"), 
    status: "Active",
    isSpotTariff: true,
    customPerLiterPrices: [
      { id: '3', description: 'Airport access fee', price: 0.25 }
    ],
    customPerUpliftmentPrices: [
      { id: '4', description: 'Security handling', price: 75.00 },
      { id: '5', description: 'Emergency response', price: 50.00 }
    ]
  },
];

const Tariffs = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>(initialTariffs);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedTariff, setSelectedTariff] = useState<Tariff | undefined>();

  const filteredTariffs = tariffs.filter(tariff =>
    tariff.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tariff.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tariff.contractRef?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTariff = () => {
    setSelectedTariff(undefined);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEditTariff = (tariff: Tariff) => {
    setSelectedTariff(tariff);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDeleteTariff = (id: number) => {
    setTariffs(tariffs.filter(tariff => tariff.id !== id));
  };

  const handleSaveTariff = (tariffData: Tariff) => {
    if (modalMode === 'create') {
      const newTariff = {
        ...tariffData,
        id: Math.max(...tariffs.map(t => t.id || 0), 0) + 1,
        supplier: getSupplierName(tariffData.supplierId),
        location: getLocationName(tariffData.locationId),
        replacementSupplier: tariffData.replacementSupplierId ? getSupplierName(tariffData.replacementSupplierId) : undefined,
        status: 'Active'
      };
      setTariffs([...tariffs, newTariff]);
    } else {
      setTariffs(tariffs.map(tariff =>
        tariff.id === selectedTariff?.id
          ? {
              ...tariffData,
              id: selectedTariff.id,
              supplier: getSupplierName(tariffData.supplierId),
              location: getLocationName(tariffData.locationId),
              replacementSupplier: tariffData.replacementSupplierId ? getSupplierName(tariffData.replacementSupplierId) : undefined,
              status: tariff.status
            }
          : tariff
      ));
    }
  };

  const getSupplierName = (supplierId: string) => {
    const suppliers = [
      { id: '1', name: 'Shell Aviation' },
      { id: '2', name: 'BP Fuel' },
      { id: '3', name: 'Engen' },
      { id: '4', name: 'Total' },
    ];
    return suppliers.find(s => s.id === supplierId)?.name || '';
  };

  const getLocationName = (locationId: string) => {
    const locations = [
      { id: '1', name: 'Cape Town International' },
      { id: '2', name: 'O.R. Tambo International' },
      { id: '3', name: 'King Shaka International' },
      { id: '4', name: 'George Airport' },
    ];
    return locations.find(l => l.id === locationId)?.name || '';
  };

  const calculateTotalPrice = (tariff: Tariff) => {
    return tariff.basePrice + tariff.differential + tariff.markup;
  };

  const hasCustomPrices = (tariff: Tariff) => {
    return (tariff.customPerLiterPrices && tariff.customPerLiterPrices.length > 0) ||
           (tariff.customPerUpliftmentPrices && tariff.customPerUpliftmentPrices.length > 0);
  };

  return (
    <PageLayout title="Master Data - Tariffs">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tariff Management</CardTitle>
          <Button onClick={handleAddTariff} className="flex items-center gap-1">
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                  <TableHead>Total Price/L</TableHead>
                  <TableHead>Base Price/L</TableHead>
                  <TableHead>Differential/L</TableHead>
                  <TableHead>Markup/L</TableHead>
                  <TableHead>Valid From</TableHead>
                  <TableHead>Valid To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTariffs.map((tariff) => (
                  <TableRow key={tariff.id}>
                    <TableCell className="font-medium">
                      <div>
                        {tariff.supplier}
                        {tariff.isSpotTariff && tariff.replacementSupplier && (
                          <div className="text-xs text-muted-foreground">
                            Replacement: {tariff.replacementSupplier}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{tariff.location}</TableCell>
                    <TableCell>
                      {tariff.contractRef ? (
                        tariff.contractRef
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground text-sm">Spot Tariff</span>
                          <Badge variant="outline" className="text-xs">Spot</Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>
                        R {calculateTotalPrice(tariff).toFixed(2)}
                        {hasCustomPrices(tariff) && (
                          <div className="text-xs text-muted-foreground">+ custom prices</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>R {tariff.basePrice.toFixed(2)}</TableCell>
                    <TableCell>R {tariff.differential.toFixed(2)}</TableCell>
                    <TableCell>R {tariff.markup.toFixed(2)}</TableCell>
                    <TableCell>{tariff.startDate.toLocaleDateString()}</TableCell>
                    <TableCell>{tariff.endDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={tariff.status === "Active" ? "default" : "secondary"}>
                        {tariff.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditTariff(tariff)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Tariff</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this tariff for {tariff.supplier} at {tariff.location}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteTariff(tariff.id!)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <TariffModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        tariff={selectedTariff}
        onSave={handleSaveTariff}
        mode={modalMode}
      />
    </PageLayout>
  );
};

export default Tariffs;
