
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addWeeks, addMonths, differenceInDays } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown, AlertTriangle, Info, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
}

interface TariffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tariff?: Tariff;
  onSave: (tariff: Tariff) => void;
  mode: 'create' | 'edit';
}

// Mock data
const mockSuppliers = [
  { id: '1', name: 'Shell Aviation' },
  { id: '2', name: 'BP Fuel' },
  { id: '3', name: 'Engen' },
  { id: '4', name: 'Total' },
];

const mockLocations = [
  { id: '1', name: 'Cape Town International' },
  { id: '2', name: 'O.R. Tambo International' },
  { id: '3', name: 'King Shaka International' },
  { id: '4', name: 'George Airport' },
];

const mockContracts = [
  { 
    id: 1, 
    supplierId: '1', 
    locationId: '1', 
    startDate: new Date('2023-01-01'), 
    endDate: new Date('2023-12-31'), 
    priceChangeFrequency: 'Weekly' as const,
    contractRef: 'SH-CPT-2023'
  },
  { 
    id: 2, 
    supplierId: '2', 
    locationId: '2', 
    startDate: new Date('2023-01-01'), 
    endDate: new Date('2023-12-31'), 
    priceChangeFrequency: 'Monthly' as const,
    contractRef: 'BP-JNB-2023'
  },
];

const TariffModal = ({ open, onOpenChange, tariff, onSave, mode }: TariffModalProps) => {
  const [formData, setFormData] = useState<Tariff>({
    supplierId: '',
    locationId: '',
    replacementSupplierId: '',
    basePrice: 0,
    differential: 0,
    markup: 0,
    startDate: new Date(),
    endDate: new Date(),
    customPerLiterPrices: [],
    customPerUpliftmentPrices: [],
    isSpotTariff: false,
  });

  const [supplierOpen, setSupplierOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [replacementSupplierOpen, setReplacementSupplierOpen] = useState(false);
  const [contract, setContract] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (tariff && mode === 'edit') {
      setFormData({
        ...tariff,
        customPerLiterPrices: tariff.customPerLiterPrices || [],
        customPerUpliftmentPrices: tariff.customPerUpliftmentPrices || [],
      });
      checkForContract(tariff.supplierId, tariff.locationId);
    } else {
      setFormData({
        supplierId: '',
        locationId: '',
        replacementSupplierId: '',
        basePrice: 0,
        differential: 0,
        markup: 0,
        startDate: new Date(),
        endDate: new Date(),
        customPerLiterPrices: [],
        customPerUpliftmentPrices: [],
        isSpotTariff: false,
      });
      setContract(null);
      setShowSummary(false);
    }
  }, [tariff, mode, open]);

  const checkForContract = (supplierId: string, locationId: string) => {
    if (!supplierId || !locationId) {
      setContract(null);
      setFormData(prev => ({ ...prev, isSpotTariff: false }));
      return;
    }

    const foundContract = mockContracts.find(
      c => c.supplierId === supplierId && c.locationId === locationId
    );

    if (foundContract) {
      setContract(foundContract);
      setFormData(prev => ({ 
        ...prev, 
        isSpotTariff: false,
        contractRef: foundContract.contractRef,
        startDate: foundContract.startDate,
        endDate: calculateMaxEndDate(foundContract.startDate, foundContract.priceChangeFrequency)
      }));
    } else {
      setContract(null);
      setFormData(prev => ({ 
        ...prev, 
        isSpotTariff: true,
        contractRef: undefined,
        replacementSupplierId: ''
      }));
    }
  };

  const calculateMaxEndDate = (startDate: Date, frequency: 'Weekly' | 'Monthly') => {
    return frequency === 'Weekly' ? addWeeks(startDate, 1) : addMonths(startDate, 1);
  };

  const validateDateRange = () => {
    if (!contract) return true;
    
    const tariffDuration = differenceInDays(formData.endDate, formData.startDate);
    const maxDuration = contract.priceChangeFrequency === 'Weekly' ? 7 : 30;
    
    return tariffDuration <= maxDuration && 
           formData.startDate >= contract.startDate && 
           formData.endDate <= contract.endDate;
  };

  const calculateTotalPrice = () => {
    return formData.basePrice + formData.differential + formData.markup;
  };

  const addCustomPrice = (type: 'liter' | 'upliftment') => {
    const newPrice: CustomPrice = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      price: 0
    };

    setFormData(prev => ({
      ...prev,
      [type === 'liter' ? 'customPerLiterPrices' : 'customPerUpliftmentPrices']: [
        ...(type === 'liter' ? prev.customPerLiterPrices || [] : prev.customPerUpliftmentPrices || []),
        newPrice
      ]
    }));
  };

  const removeCustomPrice = (type: 'liter' | 'upliftment', id: string) => {
    setFormData(prev => ({
      ...prev,
      [type === 'liter' ? 'customPerLiterPrices' : 'customPerUpliftmentPrices']: 
        (type === 'liter' ? prev.customPerLiterPrices || [] : prev.customPerUpliftmentPrices || [])
          .filter(price => price.id !== id)
    }));
  };

  const updateCustomPrice = (type: 'liter' | 'upliftment', id: string, field: 'description' | 'price', value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [type === 'liter' ? 'customPerLiterPrices' : 'customPerUpliftmentPrices']: 
        (type === 'liter' ? prev.customPerLiterPrices || [] : prev.customPerUpliftmentPrices || [])
          .map(price => price.id === id ? { ...price, [field]: value } : price)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.isSpotTariff && !formData.replacementSupplierId) {
      alert('Please select a replacement supplier for spot tariff');
      return;
    }

    if (!validateDateRange()) {
      alert('Date range is invalid. Please check contract constraints.');
      return;
    }
    
    onSave(formData);
    setShowSummary(true);
  };

  const handleNewTariff = () => {
    setShowSummary(false);
    onOpenChange(false);
  };

  const selectedSupplier = mockSuppliers.find(s => s.id === formData.supplierId);
  const selectedLocation = mockLocations.find(l => l.id === formData.locationId);
  const selectedReplacementSupplier = mockSuppliers.find(s => s.id === formData.replacementSupplierId);

  if (showSummary) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Tariff Summary</DialogTitle>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Tariff Created Successfully
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Supplier</Label>
                  <p className="text-sm text-muted-foreground">{selectedSupplier?.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Location</Label>
                  <p className="text-sm text-muted-foreground">{selectedLocation?.name}</p>
                </div>
              </div>
              
              {formData.isSpotTariff && (
                <div>
                  <Label className="text-sm font-medium">Replacement Supplier</Label>
                  <p className="text-sm text-muted-foreground">{selectedReplacementSupplier?.name}</p>
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium">Base Price</Label>
                  <p className="text-sm text-muted-foreground">R {formData.basePrice.toFixed(2)}/L</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Differential</Label>
                  <p className="text-sm text-muted-foreground">R {formData.differential.toFixed(2)}/L</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Markup</Label>
                  <p className="text-sm text-muted-foreground">R {formData.markup.toFixed(2)}/L</p>
                </div>
              </div>
              
              <div className="bg-muted p-3 rounded-md">
                <Label className="text-sm font-medium">Total Price per Liter</Label>
                <p className="text-lg font-bold">R {calculateTotalPrice().toFixed(2)}</p>
              </div>
              
              {(formData.customPerLiterPrices?.length || formData.customPerUpliftmentPrices?.length) && (
                <div className="space-y-3">
                  {formData.customPerLiterPrices && formData.customPerLiterPrices.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Custom Per Liter Prices</Label>
                      <div className="space-y-1">
                        {formData.customPerLiterPrices.map((price) => (
                          <div key={price.id} className="flex justify-between text-sm text-muted-foreground">
                            <span>{price.description}</span>
                            <span>R {price.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {formData.customPerUpliftmentPrices && formData.customPerUpliftmentPrices.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Custom Per Upliftment Prices</Label>
                      <div className="space-y-1">
                        {formData.customPerUpliftmentPrices.map((price) => (
                          <div key={price.id} className="flex justify-between text-sm text-muted-foreground">
                            <span>{price.description}</span>
                            <span>R {price.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Valid From</Label>
                  <p className="text-sm text-muted-foreground">{format(formData.startDate, "PPP")}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Valid To</Label>
                  <p className="text-sm text-muted-foreground">{format(formData.endDate, "PPP")}</p>
                </div>
              </div>
              
              {formData.isSpotTariff && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    This is a Spot Tariff as no contract exists for this supplier-location combination.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleNewTariff}>
              Create Another Tariff
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Tariff' : 'Edit Tariff'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Location Selection */}
          <div className="space-y-2">
            <Label>Location *</Label>
            <Popover open={locationOpen} onOpenChange={setLocationOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={locationOpen}
                  className="w-full justify-between"
                >
                  {selectedLocation ? selectedLocation.name : "Select location..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search locations..." />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {mockLocations.map((location) => (
                        <CommandItem
                          key={location.id}
                          value={location.name}
                          onSelect={() => {
                            setFormData({ ...formData, locationId: location.id });
                            setLocationOpen(false);
                            checkForContract(formData.supplierId, location.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.locationId === location.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {location.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Supplier Selection */}
          <div className="space-y-2">
            <Label>Supplier *</Label>
            <Popover open={supplierOpen} onOpenChange={setSupplierOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={supplierOpen}
                  className="w-full justify-between"
                >
                  {selectedSupplier ? selectedSupplier.name : "Select supplier..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search suppliers..." />
                  <CommandList>
                    <CommandEmpty>No supplier found.</CommandEmpty>
                    <CommandGroup>
                      {mockSuppliers.map((supplier) => (
                        <CommandItem
                          key={supplier.id}
                          value={supplier.name}
                          onSelect={() => {
                            setFormData({ ...formData, supplierId: supplier.id });
                            setSupplierOpen(false);
                            checkForContract(supplier.id, formData.locationId);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              formData.supplierId === supplier.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {supplier.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Contract Status Alert */}
          {formData.supplierId && formData.locationId && (
            <Alert className={formData.isSpotTariff ? "border-orange-200 bg-orange-50" : "border-green-200 bg-green-50"}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {formData.isSpotTariff 
                  ? "No contract found for this supplier-location combination. This will be a Spot Tariff. Please select a replacement supplier."
                  : `Contract found: ${contract?.contractRef}. Price changes allowed ${contract?.priceChangeFrequency?.toLowerCase()}.`
                }
              </AlertDescription>
            </Alert>
          )}

          {/* Replacement Supplier for Spot Tariffs */}
          {formData.isSpotTariff && (
            <div className="space-y-2">
              <Label>Replacement Supplier *</Label>
              <Popover open={replacementSupplierOpen} onOpenChange={setReplacementSupplierOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={replacementSupplierOpen}
                    className="w-full justify-between"
                  >
                    {selectedReplacementSupplier ? selectedReplacementSupplier.name : "Select replacement supplier..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search suppliers..." />
                    <CommandList>
                      <CommandEmpty>No supplier found.</CommandEmpty>
                      <CommandGroup>
                        {mockSuppliers.filter(s => s.id !== formData.supplierId).map((supplier) => (
                          <CommandItem
                            key={supplier.id}
                            value={supplier.name}
                            onSelect={() => {
                              setFormData({ ...formData, replacementSupplierId: supplier.id });
                              setReplacementSupplierOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.replacementSupplierId === supplier.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {supplier.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Pricing Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price (R/L) *</Label>
              <Input
                id="basePrice"
                type="number"
                step="0.01"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="differential">Differential (R/L) *</Label>
              <Input
                id="differential"
                type="number"
                step="0.01"
                value={formData.differential}
                onChange={(e) => setFormData({ ...formData, differential: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="markup">Markup (R/L) *</Label>
              <Input
                id="markup"
                type="number"
                step="0.01"
                value={formData.markup}
                onChange={(e) => setFormData({ ...formData, markup: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          {/* Total Price Display */}
          <div className="bg-muted p-3 rounded-md">
            <Label className="text-sm font-medium">Total Price per Liter</Label>
            <p className="text-lg font-bold">R {calculateTotalPrice().toFixed(2)}</p>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.startDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(formData.endDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Custom Per Liter Prices */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Custom Per Liter Prices</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => addCustomPrice('liter')}>
                <Plus className="h-4 w-4 mr-1" />
                Add Custom Price
              </Button>
            </div>
            {formData.customPerLiterPrices && formData.customPerLiterPrices.map((price) => (
              <div key={price.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label className="text-xs">Description</Label>
                  <Input
                    placeholder="e.g., Peak hour surcharge"
                    value={price.description}
                    onChange={(e) => updateCustomPrice('liter', price.id, 'description', e.target.value)}
                  />
                </div>
                <div className="w-32">
                  <Label className="text-xs">Price (R)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={price.price}
                    onChange={(e) => updateCustomPrice('liter', price.id, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeCustomPrice('liter', price.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Custom Per Upliftment Prices */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Custom Per Upliftment Prices</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => addCustomPrice('upliftment')}>
                <Plus className="h-4 w-4 mr-1" />
                Add Custom Price
              </Button>
            </div>
            {formData.customPerUpliftmentPrices && formData.customPerUpliftmentPrices.map((price) => (
              <div key={price.id} className="flex gap-2 items-end">
                <div className="flex-1">
                  <Label className="text-xs">Description</Label>
                  <Input
                    placeholder="e.g., Weekend service fee"
                    value={price.description}
                    onChange={(e) => updateCustomPrice('upliftment', price.id, 'description', e.target.value)}
                  />
                </div>
                <div className="w-32">
                  <Label className="text-xs">Price (R)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={price.price}
                    onChange={(e) => updateCustomPrice('upliftment', price.id, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon"
                  onClick={() => removeCustomPrice('upliftment', price.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create Tariff' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TariffModal;
