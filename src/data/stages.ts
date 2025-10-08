import { Sprout, Leaf, FlowerIcon, TreePine, Package, DollarSign } from "lucide-react";

export interface Stage {
  id: string;
  name: string;
  icon: any;
  color: string;
  borderColor?: string;
}

export const stages: Stage[] = [
  { 
    id: "seed", 
    name: "Seed", 
    icon: Sprout, 
    color: "bg-amber-100 text-amber-700", 
    borderColor: "border-amber-500" 
  },
  { 
    id: "propagation", 
    name: "Propagation", 
    icon: Leaf, 
    color: "bg-green-100 text-green-700", 
    borderColor: "border-green-500" 
  },
  { 
    id: "potting", 
    name: "Potting", 
    icon: FlowerIcon, 
    color: "bg-blue-100 text-blue-700", 
    borderColor: "border-blue-500" 
  },
  { 
    id: "hardening", 
    name: "Hardening", 
    icon: TreePine, 
    color: "bg-purple-100 text-purple-700", 
    borderColor: "border-purple-500" 
  },
  { 
    id: "ready", 
    name: "Ready", 
    icon: Package, 
    color: "bg-teal-100 text-teal-700", 
    borderColor: "border-teal-500" 
  },
  { 
    id: "sold", 
    name: "Sold", 
    icon: DollarSign, 
    color: "bg-gray-100 text-gray-700", 
    borderColor: "border-gray-500" 
  },
];

export interface LifecycleStage {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
}

export const lifecycleStages: LifecycleStage[] = [
  { id: "seed", name: "Seed", icon: "🌱", completed: true },
  { id: "propagation", name: "Propagation", icon: "🌿", completed: true },
  { id: "potting", name: "Potting", icon: "🪴", completed: true },
  { id: "hardening", name: "Hardening", icon: "🌳", completed: false },
  { id: "ready", name: "Ready", icon: "📦", completed: false },
  { id: "sold", name: "Sold", icon: "💰", completed: false },
];
