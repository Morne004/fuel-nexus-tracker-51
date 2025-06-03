
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Supplier {
  id?: number;
  friendlyName: string;
  legalName: string;
  pdfInvoiceName: string;
  uniqueId: string;
  vatNumber: string;
  companyRegistrationNumber: string;
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
}

interface SupplierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier?: Supplier;
  onSave: (supplier: Supplier) => void;
  mode: 'create' | 'edit';
}

const SupplierModal = ({ open, onOpenChange, supplier, onSave, mode }: SupplierModalProps) => {
  const [formData, setFormData] = useState<Supplier>({
    friendlyName: '',
    legalName: '',
    pdfInvoiceName: '',
    uniqueId: '',
    vatNumber: '',
    companyRegistrationNumber: '',
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
  });

  useEffect(() => {
    if (supplier && mode === 'edit') {
      setFormData(supplier);
    } else {
      setFormData({
        friendlyName: '',
        legalName: '',
        pdfInvoiceName: '',
        uniqueId: '',
        vatNumber: '',
        companyRegistrationNumber: '',
        primaryContactName: '',
        primaryContactEmail: '',
        primaryContactPhone: '',
      });
    }
  }, [supplier, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Supplier' : 'Edit Supplier'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="friendlyName">Supplier Name</Label>
            <Input
              id="friendlyName"
              value={formData.friendlyName}
              onChange={(e) => setFormData({ ...formData, friendlyName: e.target.value })}
              placeholder="e.g. Shell Aviation"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdfInvoiceName">Invoice Name</Label>
            <Input
              id="pdfInvoiceName"
              value={formData.pdfInvoiceName}
              onChange={(e) => setFormData({ ...formData, pdfInvoiceName: e.target.value })}
              placeholder="Name as it appears on invoices"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="legalName">Business Name</Label>
            <Input
              id="legalName"
              value={formData.legalName}
              onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
              placeholder="Legal business entity name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="uniqueId">Unique ID</Label>
            <Input
              id="uniqueId"
              value={formData.uniqueId}
              onChange={(e) => setFormData({ ...formData, uniqueId: e.target.value })}
              placeholder="Internal unique identifier"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vatNumber">VAT Number</Label>
              <Input
                id="vatNumber"
                value={formData.vatNumber}
                onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                placeholder="VAT registration number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyRegistrationNumber">Company Registration Number</Label>
              <Input
                id="companyRegistrationNumber"
                value={formData.companyRegistrationNumber}
                onChange={(e) => setFormData({ ...formData, companyRegistrationNumber: e.target.value })}
                placeholder="Company registration number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryContactName">Contact Person Full Name</Label>
            <Input
              id="primaryContactName"
              value={formData.primaryContactName}
              onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
              placeholder="Primary contact person"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryContactPhone">Contact Person Phone Number</Label>
            <Input
              id="primaryContactPhone"
              type="tel"
              value={formData.primaryContactPhone}
              onChange={(e) => setFormData({ ...formData, primaryContactPhone: e.target.value })}
              placeholder="Phone number"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Add Supplier' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupplierModal;
