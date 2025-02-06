'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import DatePickerWithRange from '@/components/ui/date-picker-with-range';
import { addDays } from 'date-fns';

interface AddContractDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: ContractFormData) => void;
}

interface ContractFormData {
  contractName: string;
  contractType: string;
  startDate: Date;
  endDate: Date;
  value: string;
  description: string;
  status: string;
}

const AddContractDialog: React.FC<AddContractDialogProps> = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {}
}) => {
  const [formData, setFormData] = React.useState<ContractFormData>({
    contractName: '',
    contractType: '',
    startDate: new Date(),
    endDate: addDays(new Date(), 30),
    value: '',
    description: '',
    status: 'draft'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Contract</Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Contract</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractName">Contract Name</Label>
              <Input
                id="contractName"
                placeholder="Enter contract name"
                value={formData.contractName}
                onChange={(e) => setFormData({ ...formData, contractName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contractType">Contract Type</Label>
              <Select
                value={formData.contractType}
                onValueChange={(value) => setFormData({ ...formData, contractType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">Service Agreement</SelectItem>
                  <SelectItem value="license">License Agreement</SelectItem>
                  <SelectItem value="purchase">Purchase Agreement</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Contract Period</Label>
            <DatePickerWithRange
              from={formData.startDate}
              to={formData.endDate}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setFormData({
                    ...formData,
                    startDate: range.from,
                    endDate: range.to
                  });
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Contract Value</Label>
            <Input
              id="value"
              placeholder="Enter contract value"
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter contract description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Contract</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddContractDialog;
