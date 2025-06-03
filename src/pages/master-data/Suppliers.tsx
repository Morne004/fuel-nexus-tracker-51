
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import SupplierModal from '@/components/modals/SupplierModal';

interface Supplier {
  id: number;
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

const initialSuppliers: Supplier[] = [
  { 
    id: 1, 
    friendlyName: "Shell Aviation", 
    legalName: "Shell South Africa (Pty) Ltd", 
    pdfInvoiceName: "Shell Aviation SA", 
    uniqueId: "SHELL001",
    vatNumber: "4123456789",
    companyRegistrationNumber: "1990/123456/07",
    primaryContactName: "John Smith", 
    primaryContactEmail: "john.smith@shell.com",
    primaryContactPhone: "+27 11 123 4567"
  },
  { 
    id: 2, 
    friendlyName: "BP Fuel", 
    legalName: "BP Southern Africa (Pty) Ltd", 
    pdfInvoiceName: "BP Aviation", 
    uniqueId: "BP001",
    vatNumber: "4234567890",
    companyRegistrationNumber: "1985/234567/07",
    primaryContactName: "Sarah Johnson", 
    primaryContactEmail: "sarah.j@bp.com",
    primaryContactPhone: "+27 21 234 5678"
  },
  { 
    id: 3, 
    friendlyName: "Engen", 
    legalName: "Engen Petroleum Ltd", 
    pdfInvoiceName: "Engen Aviation", 
    uniqueId: "ENGEN001",
    vatNumber: "4345678901",
    companyRegistrationNumber: "1980/345678/07",
    primaryContactName: "Michael Brown", 
    primaryContactEmail: "m.brown@engen.co.za",
    primaryContactPhone: "+27 31 345 6789"
  },
  { 
    id: 4, 
    friendlyName: "Total", 
    legalName: "TotalEnergies Marketing South Africa (Pty) Ltd", 
    pdfInvoiceName: "TotalEnergies Aviation", 
    uniqueId: "TOTAL001",
    vatNumber: "4456789012",
    companyRegistrationNumber: "1975/456789/07",
    primaryContactName: "Lisa Williams", 
    primaryContactEmail: "lisa.w@totalenergies.com",
    primaryContactPhone: "+27 41 456 7890"
  },
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialSuppliers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | undefined>();
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.friendlyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.legalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.pdfInvoiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.primaryContactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.primaryContactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSupplier = () => {
    setEditingSupplier(undefined);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleSaveSupplier = (supplierData: Supplier) => {
    if (modalMode === 'create') {
      const newSupplier = {
        ...supplierData,
        id: Math.max(...suppliers.map(s => s.id)) + 1
      };
      setSuppliers([...suppliers, newSupplier]);
    } else {
      setSuppliers(suppliers.map(s => 
        s.id === editingSupplier?.id ? { ...supplierData, id: editingSupplier.id } : s
      ));
    }
  };

  const handleDeleteSupplier = (id: number) => {
    setSuppliers(suppliers.filter(s => s.id !== id));
  };

  return (
    <PageLayout title="Master Data - Suppliers">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Supplier Management</CardTitle>
          <Button className="flex items-center gap-1" onClick={handleAddSupplier}>
            <Plus className="h-4 w-4" />
            Add Supplier
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search suppliers..."
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
                  <TableHead>Friendly Name</TableHead>
                  <TableHead>Legal Entity Name</TableHead>
                  <TableHead>PDF Invoice Name</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Contact Email</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSuppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.friendlyName}</TableCell>
                    <TableCell>{supplier.legalName}</TableCell>
                    <TableCell>{supplier.pdfInvoiceName}</TableCell>
                    <TableCell>{supplier.primaryContactName}</TableCell>
                    <TableCell>{supplier.primaryContactEmail}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditSupplier(supplier)}
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
                              <AlertDialogTitle>Delete Supplier</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{supplier.friendlyName}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteSupplier(supplier.id)}>
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

      <SupplierModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        supplier={editingSupplier}
        onSave={handleSaveSupplier}
        mode={modalMode}
      />
    </PageLayout>
  );
};

export default Suppliers;
