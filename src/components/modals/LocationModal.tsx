
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

interface Location {
  id?: number;
  name: string;
  country: string;
  airport: string;
  icaoCode: string;
  iataCode: string;
  vatRate: number;
}

interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location?: Location;
  onSave: (location: Location) => void;
  mode: 'create' | 'edit';
}

const defaultCountries = [
  'South Africa',
  'United States',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Canada',
  'Netherlands',
  'Switzerland',
  'Singapore'
];

const LocationModal = ({ open, onOpenChange, location, onSave, mode }: LocationModalProps) => {
  const [formData, setFormData] = useState<Location>({
    name: '',
    country: '',
    airport: '',
    icaoCode: '',
    iataCode: '',
    vatRate: 0,
  });
  const [countries, setCountries] = useState(defaultCountries);
  const [showNewCountry, setShowNewCountry] = useState(false);
  const [newCountry, setNewCountry] = useState('');

  useEffect(() => {
    if (location && mode === 'edit') {
      setFormData(location);
    } else {
      setFormData({
        name: '',
        country: '',
        airport: '',
        icaoCode: '',
        iataCode: '',
        vatRate: 0,
      });
    }
  }, [location, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const handleAddNewCountry = () => {
    if (newCountry.trim() && !countries.includes(newCountry.trim())) {
      const updatedCountries = [...countries, newCountry.trim()].sort();
      setCountries(updatedCountries);
      setFormData({ ...formData, country: newCountry.trim() });
      setNewCountry('');
      setShowNewCountry(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Location' : 'Edit Location'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Location Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <div className="flex gap-2">
              <Select
                value={formData.country}
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setShowNewCountry(!showNewCountry)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {showNewCountry && (
              <div className="flex gap-2">
                <Input
                  placeholder="Enter new country"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                />
                <Button type="button" onClick={handleAddNewCountry}>Add</Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="airport">Airport Name</Label>
            <Input
              id="airport"
              value={formData.airport}
              onChange={(e) => setFormData({ ...formData, airport: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="icaoCode">ICAO Code</Label>
              <Input
                id="icaoCode"
                value={formData.icaoCode}
                onChange={(e) => setFormData({ ...formData, icaoCode: e.target.value.toUpperCase() })}
                maxLength={4}
                placeholder="e.g. FACT"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="iataCode">IATA Code</Label>
              <Input
                id="iataCode"
                value={formData.iataCode}
                onChange={(e) => setFormData({ ...formData, iataCode: e.target.value.toUpperCase() })}
                maxLength={3}
                placeholder="e.g. CPT"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vatRate">VAT Rate (%)</Label>
            <Input
              id="vatRate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={formData.vatRate}
              onChange={(e) => setFormData({ ...formData, vatRate: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Add Location' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LocationModal;
