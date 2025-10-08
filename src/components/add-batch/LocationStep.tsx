import { BatchFormData } from "@/types/batch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locations } from "@/data";

interface LocationStepProps {
  formData: Partial<BatchFormData>;
  updateFormData: (data: Partial<BatchFormData>) => void;
}

const staffMembers = [
  "Alex Thompson",
  "Jordan Smith",
  "Kevin Farrell",
  "John Walter",
  "Sarah Chen",
];

export function LocationStep({ formData, updateFormData }: LocationStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Assign Nursery Location</h2>
      <p className="text-muted-foreground mb-6">
        Set the initial location and responsibility for this batch
      </p>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="initialLocation">Initial Location *</Label>
          <Select
            value={formData.initialLocation || ""}
            onValueChange={(value) => updateFormData({ initialLocation: value })}
          >
            <SelectTrigger id="initialLocation">
              <SelectValue placeholder="Select location..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.name}>
                  {location.name}
                </SelectItem>
              ))}
              <SelectItem value="Seed Store">Seed Store</SelectItem>
              <SelectItem value="Propagation Tunnel 1">Propagation Tunnel 1</SelectItem>
              <SelectItem value="Propagation Tunnel 2">Propagation Tunnel 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="responsiblePerson">Responsible Person *</Label>
          <Select
            value={formData.responsiblePerson || ""}
            onValueChange={(value) => updateFormData({ responsiblePerson: value })}
          >
            <SelectTrigger id="responsiblePerson">
              <SelectValue placeholder="Select person..." />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {staffMembers.map((member) => (
                <SelectItem key={member} value={member}>
                  {member}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedMoveDate">Expected Move Date (Optional)</Label>
          <Input
            id="expectedMoveDate"
            type="date"
            value={formData.expectedMoveDate?.toISOString().split('T')[0] || ""}
            onChange={(e) => updateFormData({ expectedMoveDate: new Date(e.target.value) })}
          />
          <p className="text-xs text-muted-foreground">
            When do you expect to move this batch to another location?
          </p>
        </div>

        <div className="flex items-center space-x-2 pt-4 border-t">
          <Switch
            id="trackMovements"
            checked={formData.trackMovements || false}
            onCheckedChange={(checked) => updateFormData({ trackMovements: checked })}
          />
          <Label htmlFor="trackMovements" className="cursor-pointer">
            Track all movements for this batch
          </Label>
        </div>
      </div>
    </div>
  );
}
