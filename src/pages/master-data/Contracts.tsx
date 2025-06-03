
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import ContractModal from '@/components/modals/ContractModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Contract {
  id?: number;
  supplierId: string;
  locationId: string;
  startDate: Date;
  endDate: Date;
  priceChangeFrequency: 'Weekly' | 'Monthly';
  splitType: 'Percentage' | 'Days';
  splitValue: string | number[];
  status?: string;
  supplier?: string;
  location?: string;
}

const mockContracts: Contract[] = [
  { 
    id: 1, 
    supplierId: '1',
    locationId: '1',
    supplier: "Shell Aviation", 
    location: "Cape Town International", 
    startDate: new Date("2023-01-01"), 
    endDate: new Date("2023-12-31"), 
    priceChangeFrequency: "Weekly", 
    splitType: "Percentage", 
    splitValue: "60%", 
    status: "Active" 
  },
  { 
    id: 2, 
    supplierId: '2',
    locationId: '2',
    supplier: "BP Fuel", 
    location: "O.R. Tambo International", 
    startDate: new Date("2023-01-01"), 
    endDate: new Date("2023-12-31"), 
    priceChangeFrequency: "Monthly", 
    splitType: "Days", 
    splitValue: [1, 15], 
    status: "Active" 
  },
  { 
    id: 3, 
    supplierId: '3',
    locationId: '3',
    supplier: "Engen", 
    location: "King Shaka International", 
    startDate: new Date("2023-01-01"), 
    endDate: new Date("2023-06-30"), 
    priceChangeFrequency: "Weekly", 
    splitType: "Percentage", 
    splitValue: "50%", 
    status: "Expired" 
  },
  { 
    id: 4, 
    supplierId: '4',
    locationId: '4',
    supplier: "Total", 
    location: "George Airport", 
    startDate: new Date("2023-03-01"), 
    endDate: new Date("2024-02-29"), 
    priceChangeFrequency: "Monthly", 
    splitType: "Days", 
    splitValue: [1, 20], 
    status: "Active" 
  },
];

const Contracts = () => {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedContract, setSelectedContract] = useState<Contract | undefined>();

  const filteredContracts = contracts.filter(contract =>
    contract.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contract.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddContract = () => {
    setSelectedContract(undefined);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEditContract = (contract: Contract) => {
    setSelectedContract(contract);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDeleteContract = (id: number) => {
    if (window.confirm('Are you sure you want to delete this contract?')) {
      setContracts(contracts.filter(contract => contract.id !== id));
    }
  };

  const handleSaveContract = (contractData: Contract) => {
    if (modalMode === 'create') {
      const newContract = {
        ...contractData,
        id: Math.max(...contracts.map(c => c.id || 0), 0) + 1,
        supplier: getSupplierName(contractData.supplierId),
        location: getLocationName(contractData.locationId),
        status: 'Active'
      };
      setContracts([...contracts, newContract]);
    } else {
      setContracts(contracts.map(contract =>
        contract.id === selectedContract?.id
          ? {
              ...contractData,
              id: selectedContract.id,
              supplier: getSupplierName(contractData.supplierId),
              location: getLocationName(contractData.locationId),
              status: contract.status
            }
          : contract
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

  const formatSplitValue = (splitType: 'Percentage' | 'Days', splitValue: string | number[]) => {
    if (splitType === 'Percentage') {
      return splitValue;
    } else {
      return Array.isArray(splitValue) ? `Days: ${splitValue.join(', ')}` : splitValue;
    }
  };

  return (
    <PageLayout title="Master Data - Contracts">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contract Management</CardTitle>
          <Button onClick={handleAddContract} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Contract
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contracts..."
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
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Price Update</TableHead>
                  <TableHead>Split Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.supplier}</TableCell>
                    <TableCell>{contract.location}</TableCell>
                    <TableCell>{contract.startDate.toLocaleDateString()}</TableCell>
                    <TableCell>{contract.endDate.toLocaleDateString()}</TableCell>
                    <TableCell>{contract.priceChangeFrequency}</TableCell>
                    <TableCell>{formatSplitValue(contract.splitType, contract.splitValue)}</TableCell>
                    <TableCell>
                      <Badge variant={contract.status === "Active" ? "default" : "secondary"}>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditContract(contract)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteContract(contract.id!)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ContractModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        contract={selectedContract}
        onSave={handleSaveContract}
        mode={modalMode}
      />
    </PageLayout>
  );
};

export default Contracts;
