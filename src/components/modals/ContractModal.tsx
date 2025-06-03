
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Contract {
  id?: number;
  supplierId: string;
  locationId: string;
  startDate: Date;
  endDate: Date;
  priceChangeFrequency: 'Weekly' | 'Monthly';
  splitType: 'Percentage' | 'Days';
  splitValue: string | number[];
}

interface ContractModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract?: Contract;
  onSave: (contract: Contract) => void;
  mode: 'create' | 'edit';
}

// Mock data - in real app this would come from your data source
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

const ContractModal = ({ open, onOpenChange, contract, onSave, mode }: ContractModalProps) => {
  const [formData, setFormData] = useState<Contract>({
    supplierId: '',
    locationId: '',
    startDate: new Date(),
    endDate: new Date(),
    priceChangeFrequency: 'Weekly',
    splitType: 'Percentage',
    splitValue: '50',
  });

  const [supplierOpen, setSupplierOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [percentage, setPercentage] = useState(50);

  useEffect(() => {
    if (contract && mode === 'edit') {
      setFormData(contract);
      if (contract.splitType === 'Days' && Array.isArray(contract.splitValue)) {
        setSelectedDays(contract.splitValue);
      } else if (contract.splitType === 'Percentage') {
        setPercentage(Number(contract.splitValue));
      }
    } else {
      setFormData({
        supplierId: '',
        locationId: '',
        startDate: new Date(),
        endDate: new Date(),
        priceChangeFrequency: 'Weekly',
        splitType: 'Percentage',
        splitValue: '50',
      });
      setSelectedDays([]);
      setPercentage(50);
    }
  }, [contract, mode, open]);

  const handleDayToggle = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day].sort((a, b) => a - b)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalFormData = {
      ...formData,
      splitValue: formData.splitType === 'Percentage' ? percentage.toString() + '%' : selectedDays,
    };
    
    onSave(finalFormData);
    onOpenChange(false);
  };

  const selectedSupplier = mockSuppliers.find(s => s.id === formData.supplierId);
  const selectedLocation = mockLocations.find(l => l.id === formData.locationId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Contract' : 'Edit Contract'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Supplier Selection */}
          <div className="space-y-2">
            <Label>Supplier</Label>
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

          {/* Location Selection */}
          <div className="space-y-2">
            <Label>Location</Label>
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

          {/* Date Pickers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
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
              <Label>End Date</Label>
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

          {/* Price Change Frequency */}
          <div className="space-y-2">
            <Label>Price Change Frequency</Label>
            <Select
              value={formData.priceChangeFrequency}
              onValueChange={(value: 'Weekly' | 'Monthly') => 
                setFormData({ ...formData, priceChangeFrequency: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Weekly">Weekly</SelectItem>
                <SelectItem value="Monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Split Type */}
          <div className="space-y-3">
            <Label>Split Type</Label>
            <RadioGroup
              value={formData.splitType}
              onValueChange={(value: 'Percentage' | 'Days') => 
                setFormData({ ...formData, splitType: value })
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Percentage" id="percentage" />
                <Label htmlFor="percentage">Percentage</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Days" id="days" />
                <Label htmlFor="days">Days</Label>
              </div>
            </RadioGroup>

            {/* Conditional Split Value Input */}
            {formData.splitType === 'Percentage' ? (
              <div className="space-y-2">
                <Label>Percentage (%)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={percentage}
                    onChange={(e) => setPercentage(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-12 text-sm font-medium">{percentage}%</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label>Select Days of Month</Label>
                <div className="grid grid-cols-7 gap-2 p-4 border rounded-lg">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <div key={day} className="flex items-center space-x-1">
                      <Checkbox
                        id={`day-${day}`}
                        checked={selectedDays.includes(day)}
                        onCheckedChange={() => handleDayToggle(day)}
                      />
                      <Label htmlFor={`day-${day}`} className="text-xs">
                        {day}
                      </Label>
                    </div>
                  ))}
                </div>
                {selectedDays.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Selected days: {selectedDays.join(', ')}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Add Contract' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContractModal;
