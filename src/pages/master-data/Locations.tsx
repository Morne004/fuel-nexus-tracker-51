
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Pencil, Trash } from 'lucide-react';

const mockLocations = [
  { id: 1, name: "Cape Town International", country: "South Africa", airport: "Cape Town International", icaoCode: "FACT", iataCode: "CPT", vatRate: 15 },
  { id: 2, name: "O.R. Tambo International", country: "South Africa", airport: "Johannesburg International", icaoCode: "FAOR", iataCode: "JNB", vatRate: 15 },
  { id: 3, name: "King Shaka International", country: "South Africa", airport: "Durban International", icaoCode: "FALE", iataCode: "DUR", vatRate: 15 },
  { id: 4, name: "George Airport", country: "South Africa", airport: "George Airport", icaoCode: "FAGG", iataCode: "GRJ", vatRate: 15 },
  { id: 5, name: "East London Airport", country: "South Africa", airport: "East London Airport", icaoCode: "FAEL", iataCode: "ELS", vatRate: 15 },
];

const Locations = () => {
  return (
    <PageLayout title="Master Data - Locations">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Location Management</CardTitle>
          <Button className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add Location
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search locations..."
                className="pl-8"
              />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Airport Name</TableHead>
                  <TableHead>ICAO Code</TableHead>
                  <TableHead>IATA Code</TableHead>
                  <TableHead>VAT Rate</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLocations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>{location.country}</TableCell>
                    <TableCell>{location.airport}</TableCell>
                    <TableCell>{location.icaoCode}</TableCell>
                    <TableCell>{location.iataCode}</TableCell>
                    <TableCell>{location.vatRate}%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
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
    </PageLayout>
  );
};

export default Locations;
