
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertCircle } from 'lucide-react';

interface QueryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (queryType: string, note: string) => void;
  flightNumber: string;
}

const QueryModal = ({ open, onOpenChange, onSubmit, flightNumber }: QueryModalProps) => {
  const [queryType, setQueryType] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    if (queryType && note.trim()) {
      onSubmit(queryType, note);
      setQueryType('');
      setNote('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            Create Query - Flight {flightNumber}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Query Type</Label>
            <RadioGroup value={queryType} onValueChange={setQueryType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="FlySafair Query" id="flysafair" />
                <Label htmlFor="flysafair">FlySafair Query</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Supplier Query" id="supplier" />
                <Label htmlFor="supplier">Supplier Query</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="General Query" id="general" />
                <Label htmlFor="general">General Query</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Awaiting Credit Note" id="credit" />
                <Label htmlFor="credit">Awaiting Credit Note</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="note" className="text-sm font-medium">Note</Label>
            <Textarea
              id="note"
              placeholder="Enter details about the query..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!queryType || !note.trim()}
          >
            Create Query
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QueryModal;
