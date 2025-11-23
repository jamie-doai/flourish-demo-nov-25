import { useState } from "react";
import { ManagerLayout } from "@/components/layouts/ManagerLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sprout, Package, User, CheckCircle2, AlertCircle, 
  Search, Plus, ArrowRight, MapPin, Clock, Settings,
  LayoutDashboard, ShoppingCart, ClipboardList, Calendar
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { WorkerBottomNav } from "@/components/WorkerBottomNav";
import { StatsCard } from "@/components/StatsCard";
import { SectionLandingPage } from "@/components/SectionLandingPage";

export default function ComponentLibrary() {
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});

  const toggleCode = (id: string) => {
    setShowCode(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const CodeBlock = ({ children, id }: { children: string; id: string }) => (
    <div className="mt-4">
      <Button 
        variant="primary-ghost" 
        size="sm" 
        onClick={() => toggleCode(id)}
        className="mb-2"
      >
        {showCode[id] ? "Hide" : "Show"} Code
      </Button>
      {showCode[id] && (
        <pre className="bg-sage-gray/20 p-4 rounded-lg border-2 border-forest-green overflow-x-auto text-body-small">
          <code>{children}</code>
        </pre>
      )}
    </div>
  );

  return (
    <ManagerLayout>
      <div className="container mx-auto px-4 py-6 bg-white">
        <div className="mb-6">
          <h1 className="text-heading-1 font-heading font-bold mb-2">Component Library</h1>
          <p className="text-body text-muted-foreground">
            Comprehensive showcase of all UI components organized by Atomic Design principles
          </p>
        </div>

        <Tabs defaultValue="shared" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-2 border-2 border-forest-green h-auto px-1 !py-1">
            <TabsTrigger value="shared" className="text-body font-heading font-bold">
              Shared Components
            </TabsTrigger>
            <TabsTrigger value="manager" className="text-body font-heading font-bold">
              Manager Web
            </TabsTrigger>
            <TabsTrigger value="worker" className="text-body font-heading font-bold">
              Worker Mobile
            </TabsTrigger>
            <TabsTrigger value="styleguide" className="text-body font-heading font-bold">
              Styleguide
            </TabsTrigger>
          </TabsList>

          {/* SHARED COMPONENTS */}
          <TabsContent value="shared" className="space-y-8">
            {/* Atoms */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Atoms</h2>
              <p className="text-body text-muted-foreground mb-6">
                Basic building blocks that cannot be broken down further
              </p>

              <div className="space-y-6">
                {/* Buttons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                    <CardDescription>All button variants and sizes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-heading-4 font-heading font-bold mb-3">Primary Variants</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="default">Primary Solid</Button>
                        <Button variant="primary-outline">Primary Outline</Button>
                        <Button variant="primary-ghost">Primary Ghost</Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-heading-4 font-heading font-bold mb-3">Secondary Variants</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="secondary">Secondary Solid</Button>
                        <Button variant="secondary-outline">Secondary Outline</Button>
                        <Button variant="secondary-ghost">Secondary Ghost</Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-heading-4 font-heading font-bold mb-3">Tertiary Variants</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button variant="tertiary">Tertiary Solid</Button>
                        <Button variant="tertiary-outline">Tertiary Outline</Button>
                        <Button variant="tertiary-ghost">Tertiary Ghost</Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-heading-4 font-heading font-bold mb-3">Sizes</h3>
                      <div className="flex flex-wrap items-center gap-4">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon"><Plus className="w-3 h-3" /></Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-heading-4 font-heading font-bold mb-3">States</h3>
                      <div className="flex flex-wrap gap-4">
                        <Button>Normal</Button>
                        <Button disabled>Disabled</Button>
                        <Button variant="destructive">Destructive</Button>
                      </div>
                    </div>
                    <CodeBlock id="buttons">
{`<Button variant="default">Primary Solid</Button>
<Button variant="primary-outline">Primary Outline</Button>
<Button variant="primary-ghost">Primary Ghost</Button>
<Button variant="secondary">Secondary Solid</Button>
<Button variant="destructive">Destructive</Button>
<Button size="sm">Small</Button>
<Button disabled>Disabled</Button>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Inputs */}
                <Card>
                  <CardHeader>
                    <CardTitle>Inputs</CardTitle>
                    <CardDescription>Text input fields</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="input-default">Default Input</Label>
                      <Input id="input-default" placeholder="Enter text..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="input-disabled">Disabled Input</Label>
                      <Input id="input-disabled" placeholder="Disabled" disabled />
                    </div>
                    <CodeBlock id="inputs">
{`<Input placeholder="Enter text..." />
<Input disabled placeholder="Disabled" />`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Labels */}
                <Card>
                  <CardHeader>
                    <CardTitle>Labels</CardTitle>
                    <CardDescription>Form labels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Label>Default Label</Label>
                    <Label htmlFor="label-example">Label with HTML For</Label>
                    <CodeBlock id="labels">
{`<Label>Default Label</Label>
<Label htmlFor="input-id">Label with HTML For</Label>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Badges */}
                <Card>
                  <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Status indicators and tags</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                    <CodeBlock id="badges">
{`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Avatars */}
                <Card>
                  <CardHeader>
                    <CardTitle>Avatars</CardTitle>
                    <CardDescription>User profile images</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-lime-green text-forest-green">JB</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarFallback className="bg-sage-green text-forest-green">AB</AvatarFallback>
                      </Avatar>
                    </div>
                    <CodeBlock id="avatars">
{`<Avatar>
  <AvatarFallback className="bg-lime-green text-forest-green">JB</AvatarFallback>
</Avatar>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Icons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Icons</CardTitle>
                    <CardDescription>Icon size standards (minimum 24px)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-heading-4 font-heading font-bold mb-3">Icon Sizes</h3>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                          <Sprout className="w-3 h-3 text-forest-green" />
                          <span className="text-body-small">24px (w-3) - Standard</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Sprout className="w-8 h-8 text-forest-green" />
                          <span className="text-body-small">64px (w-8) - Large</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Sprout className="w-12 h-12 text-forest-green" />
                          <span className="text-body-small">48px (w-12) - Extra Large</span>
                        </div>
                      </div>
                    </div>
                    <CodeBlock id="icons">
{`<Sprout className="w-3 h-3" />  {/* Small - 24px */}
<Sprout className="w-8 h-8" />  {/* Medium - 32px */}
<Sprout className="w-12 h-12" />  {/* Large - 48px */}`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Typography */}
                <Card>
                  <CardHeader>
                    <CardTitle>Typography</CardTitle>
                    <CardDescription>Text styles and hierarchy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h1 className="text-display font-display">Display (64px)</h1>
                      <h1 className="text-heading-1 font-heading font-bold">Heading 1 (40px)</h1>
                      <h2 className="text-heading-2 font-heading font-bold">Heading 2 (36px)</h2>
                      <h3 className="text-heading-3 font-heading font-bold">Heading 3 (28px)</h3>
                      <h4 className="text-heading-4 font-heading font-bold">Heading 4 (24px)</h4>
                      <p className="text-body-large font-body">Body Large (20px)</p>
                      <p className="text-body font-body">Body (16px)</p>
                      <p className="text-body-small font-body">Body Small (14px)</p>
                    </div>
                    <CodeBlock id="typography">
{`<h1 className="text-heading-1 font-heading font-bold">Heading 1</h1>
<h2 className="text-heading-2 font-heading font-bold">Heading 2</h2>
<p className="text-body font-body">Body text</p>
<p className="text-body-small font-body">Small text</p>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Separators */}
                <Card>
                  <CardHeader>
                    <CardTitle>Separators</CardTitle>
                    <CardDescription>Visual dividers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div>Content above</div>
                      <Separator />
                      <div>Content below</div>
                    </div>
                    <CodeBlock id="separators">
{`<Separator />`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Molecules */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Molecules</h2>
              <p className="text-body text-muted-foreground mb-6">
                Simple combinations of atoms
              </p>

              <div className="space-y-6">
                {/* Form Fields */}
                <Card>
                  <CardHeader>
                    <CardTitle>Form Fields</CardTitle>
                    <CardDescription>Input + Label combinations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="form-example">Email Address</Label>
                      <Input id="form-example" type="email" placeholder="name@example.com" />
                    </div>
                    <CodeBlock id="form-fields">
{`<div className="space-y-2">
  <Label htmlFor="email">Email Address</Label>
  <Input id="email" type="email" placeholder="name@example.com" />
</div>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Cards */}
                <Card>
                  <CardHeader>
                    <CardTitle>Cards</CardTitle>
                    <CardDescription>Content containers with consistent styling</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card description text</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-body">Card content goes here</p>
                      </CardContent>
                    </Card>
                    <CodeBlock id="cards">
{`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
</Card>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Search Bar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Search Bar</CardTitle>
                    <CardDescription>Search input with icon</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Search..." />
                    </div>
                    <CodeBlock id="search-bar">
{`<div className="relative">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3" />
  <Input className="pl-10" placeholder="Search..." />
</div>`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Organisms */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Organisms</h2>
              <p className="text-body text-muted-foreground mb-6">
                Complex components combining molecules and atoms
              </p>

              <div className="space-y-6">
                {/* Navigation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Navigation</CardTitle>
                    <CardDescription>Main navigation component</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-forest-green rounded-lg overflow-hidden">
                      <Navigation />
                    </div>
                    <CodeBlock id="navigation">
{`<Navigation />`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Stats Card</CardTitle>
                    <CardDescription>Dashboard statistics display</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <StatsCard
                        title="Total Plants"
                        value="18.2K"
                        icon={Package}
                        trend={{ value: "12% increase", positive: true }}
                      />
                      <StatsCard
                        title="Active Batches"
                        value="34"
                        icon={Sprout}
                        trend={{ value: "4 ready", positive: true }}
                      />
                    </div>
                    <CodeBlock id="stats-card">
{`<StatsCard
  title="Total Plants"
  value="18.2K"
  icon={Package}
  trend={{ value: "12% increase", positive: true }}
/>`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* MANAGER WEB COMPONENTS */}
          <TabsContent value="manager" className="space-y-8">
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Manager Web Components</h2>
              <p className="text-body text-muted-foreground mb-6">
                Desktop-optimized components for manager interface
              </p>

              <div className="space-y-6">
                {/* Manager Dashboard Widgets */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dashboard Widgets</CardTitle>
                    <CardDescription>KPI cards and data visualizations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <Card>
                        <div className="text-heading-2 font-heading font-bold">1,234</div>
                        <div className="text-body-small text-muted-foreground mt-0.5">Total Plants</div>
                      </Card>
                      <Card>
                        <div className="text-heading-2 font-heading font-bold">45</div>
                        <div className="text-body-small text-muted-foreground mt-0.5">Active Batches</div>
                      </Card>
                      <Card>
                        <div className="text-heading-2 font-heading font-bold">$12.5K</div>
                        <div className="text-body-small text-muted-foreground mt-0.5">Sales This Month</div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>

                {/* Data Tables */}
                <Card>
                  <CardHeader>
                    <CardTitle>Data Tables</CardTitle>
                    <CardDescription>Complex data display components</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body text-muted-foreground">
                      Data tables are used throughout the manager interface for displaying batches, orders, and inventory.
                    </p>
                  </CardContent>
                </Card>

                {/* Manager Navigation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Manager Navigation</CardTitle>
                    <CardDescription>Top navigation bar for manager interface</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-forest-green rounded-lg overflow-hidden">
                      <Navigation />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* WORKER MOBILE COMPONENTS */}
          <TabsContent value="worker" className="space-y-8">
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Worker Mobile Components</h2>
              <p className="text-body text-muted-foreground mb-6">
                Mobile-optimized components for worker interface
              </p>

              <div className="space-y-6">
                {/* Worker Bottom Navigation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Worker Bottom Navigation</CardTitle>
                    <CardDescription>Mobile bottom navigation bar</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-forest-green rounded-lg overflow-hidden bg-white">
                      <WorkerBottomNav />
                    </div>
                    <CodeBlock id="worker-nav">
{`<WorkerBottomNav />`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Mobile Cards */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mobile Cards</CardTitle>
                    <CardDescription>Touch-friendly card components</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Card className="hover:shadow-card transition-all">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-forest-green" />
                        <div>
                          <p className="text-body font-heading font-bold">Task Completed</p>
                          <p className="text-body-small text-muted-foreground">Watering batch MAN-2024-156</p>
                        </div>
                      </div>
                    </Card>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          {/* STYLEGUIDE TAB */}
          <TabsContent value="styleguide" className="space-y-8">
            {/* Colors Section */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Colors</h2>
              <p className="text-body text-muted-foreground mb-6">
                Brand colors and semantic color tokens used throughout the design system
              </p>

              <div className="space-y-6">
                {/* Brand Colors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Brand Colors</CardTitle>
                    <CardDescription>Primary brand color palette</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-lime-green border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Lime Green</p>
                          <p className="text-body-small">HSL: 78 92% 80%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Primary brand color</p>
                          <p className="text-body-small font-mono mt-1">bg-lime-green</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-sage-green border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Sage Green</p>
                          <p className="text-body-small">HSL: 85 52% 68%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Secondary accents</p>
                          <p className="text-body-small font-mono mt-1">bg-sage-green</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-neon-yellow border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Neon Yellow</p>
                          <p className="text-body-small">HSL: 60 95% 78%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Primary CTAs</p>
                          <p className="text-body-small font-mono mt-1">bg-neon-yellow</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-forest-green border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold text-white">Forest Green</p>
                          <p className="text-body-small text-white">HSL: 130 13% 19%</p>
                          <p className="text-body-small text-white/80">Usage: Primary buttons and text</p>
                          <p className="text-body-small font-mono mt-1 text-white">bg-forest-green</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-sage-gray border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Sage Gray</p>
                          <p className="text-body-small">HSL: 140 6% 84%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Borders and dividers</p>
                          <p className="text-body-small font-mono mt-1">bg-sage-gray</p>
                        </div>
                      </div>
                    </div>
                    <CodeBlock id="brand-colors">
{`<div className="bg-lime-green">Lime Green</div>
<div className="bg-sage-green">Sage Green</div>
<div className="bg-neon-yellow">Neon Yellow</div>
<div className="bg-forest-green">Forest Green</div>
<div className="bg-sage-gray">Sage Gray</div>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Color Variants */}
                <Card>
                  <CardHeader>
                    <CardTitle>Color Variants</CardTitle>
                    <CardDescription>Complete color scale from 000 (lightest, 95% lightness) to 1000 (darkest, 5% lightness) with even 9% increments for each brand color. All variants maintain the same hue and saturation as the base color.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Lime Green Variants */}
                    <div>
                      <h3 className="text-heading-3 font-heading font-bold mb-4">Lime Green Variants</h3>
                      <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-000" />
                          <p className="text-body-small font-mono">000</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-000</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-100" />
                          <p className="text-body-small font-mono">100</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-100</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-200" />
                          <p className="text-body-small font-mono">200</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-200</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-300" />
                          <p className="text-body-small font-mono">300</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-300</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-400" />
                          <p className="text-body-small font-mono">400</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-400</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-500" />
                          <p className="text-body-small font-mono">500</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-500</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-600" />
                          <p className="text-body-small font-mono">600</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-600</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-700" />
                          <p className="text-body-small font-mono">700</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-700</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-800" />
                          <p className="text-body-small font-mono">800</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-800</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-900" />
                          <p className="text-body-small font-mono">900</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-900</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-lime-green-1000" />
                          <p className="text-body-small font-mono">1000</p>
                          <p className="text-body-small text-muted-foreground">bg-lime-green-1000</p>
                        </div>
                      </div>
                    </div>

                    {/* Sage Green Variants */}
                    <div>
                      <h3 className="text-heading-3 font-heading font-bold mb-4">Sage Green Variants</h3>
                      <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-000" />
                          <p className="text-body-small font-mono">000</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-000</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-100" />
                          <p className="text-body-small font-mono">100</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-100</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-200" />
                          <p className="text-body-small font-mono">200</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-200</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-300" />
                          <p className="text-body-small font-mono">300</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-300</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-400" />
                          <p className="text-body-small font-mono">400</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-400</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-500" />
                          <p className="text-body-small font-mono">500</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-500</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-600" />
                          <p className="text-body-small font-mono">600</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-600</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-700" />
                          <p className="text-body-small font-mono">700</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-700</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-800" />
                          <p className="text-body-small font-mono">800</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-800</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-900" />
                          <p className="text-body-small font-mono">900</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-900</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-sage-green-1000" />
                          <p className="text-body-small font-mono">1000</p>
                          <p className="text-body-small text-muted-foreground">bg-sage-green-1000</p>
                        </div>
                      </div>
                    </div>

                    {/* Neon Yellow Variants */}
                    <div>
                      <h3 className="text-heading-3 font-heading font-bold mb-4">Neon Yellow Variants</h3>
                      <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-000" />
                          <p className="text-body-small font-mono">000</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-000</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-100" />
                          <p className="text-body-small font-mono">100</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-100</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-200" />
                          <p className="text-body-small font-mono">200</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-200</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-300" />
                          <p className="text-body-small font-mono">300</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-300</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-400" />
                          <p className="text-body-small font-mono">400</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-400</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-500" />
                          <p className="text-body-small font-mono">500</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-500</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-600" />
                          <p className="text-body-small font-mono">600</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-600</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-700" />
                          <p className="text-body-small font-mono">700</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-700</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-800" />
                          <p className="text-body-small font-mono">800</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-800</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-900" />
                          <p className="text-body-small font-mono">900</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-900</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-neon-yellow-1000" />
                          <p className="text-body-small font-mono">1000</p>
                          <p className="text-body-small text-muted-foreground">bg-neon-yellow-1000</p>
                        </div>
                      </div>
                    </div>

                    {/* Forest Green Variants */}
                    <div>
                      <h3 className="text-heading-3 font-heading font-bold mb-4">Forest Green Variants</h3>
                      <div className="grid grid-cols-6 md:grid-cols-11 gap-2">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-000" />
                          <p className="text-body-small font-mono">000</p>
                          <p className="text-body-small text-muted-foreground">bg-forest-green-000</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-100" />
                          <p className="text-body-small font-mono">100</p>
                          <p className="text-body-small text-muted-foreground">bg-forest-green-100</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-200" />
                          <p className="text-body-small font-mono">200</p>
                          <p className="text-body-small text-muted-foreground">bg-forest-green-200</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-300" />
                          <p className="text-body-small font-mono">300</p>
                          <p className="text-body-small text-muted-foreground">bg-forest-green-300</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-400" />
                          <p className="text-body-small font-mono">400</p>
                          <p className="text-body-small text-muted-foreground">bg-forest-green-400</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-500" />
                          <p className="text-body-small font-mono text-white">500</p>
                          <p className="text-body-small text-white/80">bg-forest-green-500</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-600" />
                          <p className="text-body-small font-mono text-white">600</p>
                          <p className="text-body-small text-white/80">bg-forest-green-600</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-700" />
                          <p className="text-body-small font-mono text-white">700</p>
                          <p className="text-body-small text-white/80">bg-forest-green-700</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-800" />
                          <p className="text-body-small font-mono text-white">800</p>
                          <p className="text-body-small text-white/80">bg-forest-green-800</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-900" />
                          <p className="text-body-small font-mono text-white">900</p>
                          <p className="text-body-small text-white/80">bg-forest-green-900</p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full h-16 rounded-lg border-2 border-forest-green bg-forest-green-1000" />
                          <p className="text-body-small font-mono text-white">1000</p>
                          <p className="text-body-small text-white/80">bg-forest-green-1000</p>
                        </div>
                      </div>
                    </div>

                    <CodeBlock id="color-variants">
{`<div className="bg-lime-green-000">Lime Green 000 (lightest)</div>
<div className="bg-lime-green-300">Lime Green 300</div>
<div className="bg-lime-green-500">Lime Green 500</div>
<div className="bg-lime-green-700">Lime Green 700</div>
<div className="bg-lime-green-1000">Lime Green 1000 (darkest)</div>

<div className="bg-sage-green-300">Sage Green 300</div>
<div className="bg-neon-yellow-400">Neon Yellow 400</div>
<div className="bg-forest-green-600">Forest Green 600</div>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Semantic Colors */}
                <Card>
                  <CardHeader>
                    <CardTitle>Semantic Colors</CardTitle>
                    <CardDescription>Colors for UI states and feedback</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-primary border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Primary</p>
                          <p className="text-body-small">HSL: 130 13% 19%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Primary actions</p>
                          <p className="text-body-small font-mono mt-1">bg-primary</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-secondary border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Secondary</p>
                          <p className="text-body-small">HSL: 60 95% 78%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Secondary actions</p>
                          <p className="text-body-small font-mono mt-1">bg-secondary</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-tertiary border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Tertiary</p>
                          <p className="text-body-small">HSL: 85 52% 68%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Tertiary actions</p>
                          <p className="text-body-small font-mono mt-1">bg-tertiary</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-success border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Success</p>
                          <p className="text-body-small">HSL: 149 79% 27%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Success states</p>
                          <p className="text-body-small font-mono mt-1">bg-success</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-warning border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Warning</p>
                          <p className="text-body-small">HSL: 48 97% 54%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Warning states</p>
                          <p className="text-body-small font-mono mt-1">bg-warning</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-destructive border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Error</p>
                          <p className="text-body-small">HSL: 355 82% 42%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Error states</p>
                          <p className="text-body-small font-mono mt-1">bg-destructive</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-info border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Info</p>
                          <p className="text-body-small">HSL: 0 0% 29%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Informational states</p>
                          <p className="text-body-small font-mono mt-1">bg-info</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                        <div className="w-16 h-16 rounded-lg bg-caution border-2 border-forest-green flex-shrink-0" />
                        <div>
                          <p className="text-heading-4 font-heading font-bold">Caution</p>
                          <p className="text-body-small">HSL: 25 100% 42%</p>
                          <p className="text-body-small text-muted-foreground">Usage: Caution states</p>
                          <p className="text-body-small font-mono mt-1">bg-caution</p>
                        </div>
                      </div>
                    </div>
                    <CodeBlock id="semantic-colors">
{`<div className="bg-primary">Primary</div>
<div className="bg-secondary">Secondary</div>
<div className="bg-success">Success</div>
<div className="bg-warning">Warning</div>
<div className="bg-destructive">Error</div>`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Typography Section */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Typography</h2>
              <p className="text-body text-muted-foreground mb-6">
                Font families, sizes, and line heights for consistent text hierarchy
              </p>

              <div className="space-y-6">
                {/* Font Families */}
                <Card>
                  <CardHeader>
                    <CardTitle>Font Families</CardTitle>
                    <CardDescription>Typeface system for the design system</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <p className="text-heading-4 font-heading font-bold mb-1">Carter One</p>
                        <p className="text-body-small text-muted-foreground mb-2">Display font - Logo only</p>
                        <p className="text-display font-display">Flourish</p>
                        <p className="text-body-small font-mono mt-2">font-display</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <p className="text-heading-4 font-heading font-bold mb-1">Plus Jakarta Sans</p>
                        <p className="text-body-small text-muted-foreground mb-2">Headings and buttons</p>
                        <p className="text-heading-2 font-heading font-bold">Heading Text</p>
                        <p className="text-body-small font-mono mt-2">font-heading</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <p className="text-heading-4 font-heading font-bold mb-1">DM Sans</p>
                        <p className="text-body-small text-muted-foreground mb-2">Body text</p>
                        <p className="text-body font-body">Body text for paragraphs and content</p>
                        <p className="text-body-small font-mono mt-2">font-body</p>
                      </div>
                    </div>
                    <CodeBlock id="font-families">
{`<h1 className="font-display">Display Text</h1>
<h2 className="font-heading font-bold">Heading Text</h2>
<p className="font-body">Body Text</p>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Font Sizes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Font Sizes</CardTitle>
                    <CardDescription>Type scale with line heights</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <p className="text-display font-display mb-1">Display</p>
                        <p className="text-body-small text-muted-foreground">64px / 72px line height</p>
                        <p className="text-body-small font-mono mt-2">text-display</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <h1 className="text-heading-1 font-heading font-bold mb-1">Heading 1</h1>
                        <p className="text-body-small text-muted-foreground">40px / 48px line height</p>
                        <p className="text-body-small font-mono mt-2">text-heading-1</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <h2 className="text-heading-2 font-heading font-bold mb-1">Heading 2</h2>
                        <p className="text-body-small text-muted-foreground">36px / 44px line height</p>
                        <p className="text-body-small font-mono mt-2">text-heading-2</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <h3 className="text-heading-3 font-heading font-bold mb-1">Heading 3</h3>
                        <p className="text-body-small text-muted-foreground">28px / 36px line height</p>
                        <p className="text-body-small font-mono mt-2">text-heading-3</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <h4 className="text-heading-4 font-heading font-bold mb-1">Heading 4</h4>
                        <p className="text-body-small text-muted-foreground">24px / 32px line height</p>
                        <p className="text-body-small font-mono mt-2">text-heading-4</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <p className="text-body-large font-body mb-1">Body Large</p>
                        <p className="text-body-small text-muted-foreground">20px / 32px line height</p>
                        <p className="text-body-small font-mono mt-2">text-body-large</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <p className="text-body font-body mb-1">Body</p>
                        <p className="text-body-small text-muted-foreground">16px / 24px line height</p>
                        <p className="text-body-small font-mono mt-2">text-body</p>
                      </div>
                      <div className="p-3 border-2 border-forest-green rounded-lg">
                        <p className="text-body-small font-body mb-1">Body Small</p>
                        <p className="text-body-small text-muted-foreground">14px / 20px line height</p>
                        <p className="text-body-small font-mono mt-2">text-body-small</p>
                      </div>
                    </div>
                    <CodeBlock id="font-sizes">
{`<h1 className="text-heading-1 font-heading font-bold">Heading 1</h1>
<h2 className="text-heading-2 font-heading font-bold">Heading 2</h2>
<p className="text-body font-body">Body text</p>
<p className="text-body-small font-body">Small text</p>`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Spacing Section */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Spacing</h2>
              <p className="text-body text-muted-foreground mb-6">
                4px grid system for consistent spacing throughout the application
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Spacing Scale</CardTitle>
                  <CardDescription>Visual representation of the 4px grid system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                      <div className="w-0.5 h-0.5 bg-forest-green rounded-full" />
                      <div className="flex-1">
                        <p className="text-heading-4 font-heading font-bold">0.5 (4px)</p>
                        <p className="text-body-small text-muted-foreground">p-0.5, gap-0.5, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                      <div className="w-1 h-1 bg-forest-green rounded-full" />
                      <div className="flex-1">
                        <p className="text-heading-4 font-heading font-bold">1 (8px)</p>
                        <p className="text-body-small text-muted-foreground">p-1, gap-1, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                      <div className="w-1.5 h-1.5 bg-forest-green rounded-full" />
                      <div className="flex-1">
                        <p className="text-heading-4 font-heading font-bold">1.5 (12px)</p>
                        <p className="text-body-small text-muted-foreground">p-1.5, gap-1.5, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                      <div className="w-2 h-2 bg-forest-green rounded-full" />
                      <div className="flex-1">
                        <p className="text-heading-4 font-heading font-bold">2 (16px)</p>
                        <p className="text-body-small text-muted-foreground">p-2, gap-2, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                      <div className="w-3 h-3 bg-forest-green rounded-full" />
                      <div className="flex-1">
                        <p className="text-heading-4 font-heading font-bold">3 (24px)</p>
                        <p className="text-body-small text-muted-foreground">p-3, gap-3, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                      <div className="w-4 h-4 bg-forest-green rounded-full" />
                      <div className="flex-1">
                        <p className="text-heading-4 font-heading font-bold">4 (32px)</p>
                        <p className="text-body-small text-muted-foreground">p-4, gap-4, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                      <div className="w-6 h-6 bg-forest-green rounded-full" />
                      <div className="flex-1">
                        <p className="text-heading-4 font-heading font-bold">6 (48px)</p>
                        <p className="text-body-small text-muted-foreground">p-6, gap-6, etc.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 border-2 border-forest-green rounded-lg">
                      <div className="w-8 h-8 bg-forest-green rounded-full" />
                      <div className="flex-1">
                        <p className="text-heading-4 font-heading font-bold">8 (64px)</p>
                        <p className="text-body-small text-muted-foreground">p-8, gap-8, etc.</p>
                      </div>
                    </div>
                  </div>
                  <CodeBlock id="spacing">
{`<div className="p-3">24px padding</div>
<div className="gap-4">32px gap</div>
<div className="space-y-2">16px vertical spacing</div>`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </section>

            {/* Borders Section */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Borders</h2>
              <p className="text-body text-muted-foreground mb-6">
                Border radius and width standards
              </p>

              <div className="space-y-6">
                {/* Border Radius */}
                <Card>
                  <CardHeader>
                    <CardTitle>Border Radius</CardTitle>
                    <CardDescription>Rounded corner styles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 border-2 border-forest-green rounded-sm bg-lime-green/20">
                        <p className="text-heading-4 font-heading font-bold mb-1">sm (4px)</p>
                        <p className="text-body-small text-muted-foreground">rounded-sm</p>
                      </div>
                      <div className="p-4 border-2 border-forest-green rounded bg-lime-green/20">
                        <p className="text-heading-4 font-heading font-bold mb-1">DEFAULT (8px)</p>
                        <p className="text-body-small text-muted-foreground">rounded</p>
                      </div>
                      <div className="p-4 border-2 border-forest-green rounded-lg bg-lime-green/20">
                        <p className="text-heading-4 font-heading font-bold mb-1">lg (16px)</p>
                        <p className="text-body-small text-muted-foreground">rounded-lg</p>
                      </div>
                    </div>
                    <CodeBlock id="border-radius">
{`<div className="rounded-sm">4px radius</div>
<div className="rounded">8px radius (default)</div>
<div className="rounded-lg">16px radius</div>`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                {/* Border Widths */}
                <Card>
                  <CardHeader>
                    <CardTitle>Border Widths</CardTitle>
                    <CardDescription>Border thickness options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="p-4 border border-forest-green bg-lime-green/20">
                        <p className="text-heading-4 font-heading font-bold mb-1">1px</p>
                        <p className="text-body-small text-muted-foreground">border (default)</p>
                      </div>
                      <div className="p-4 border-2 border-forest-green bg-lime-green/20">
                        <p className="text-heading-4 font-heading font-bold mb-1">2px</p>
                        <p className="text-body-small text-muted-foreground">border-2</p>
                      </div>
                    </div>
                    <CodeBlock id="border-widths">
{`<div className="border">1px border</div>
<div className="border-2">2px border</div>`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Shadows Section */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Shadows</h2>
              <p className="text-body text-muted-foreground mb-6">
                Elevation and depth through shadow effects
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Shadow Variants</CardTitle>
                  <CardDescription>Shadow styles for depth and elevation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border-2 border-forest-green rounded-lg bg-white">
                      <p className="text-heading-4 font-heading font-bold mb-1">No Shadow</p>
                      <p className="text-body-small text-muted-foreground">Default state</p>
                    </div>
                    <div className="p-4 border-2 border-forest-green rounded-lg bg-white shadow-card">
                      <p className="text-heading-4 font-heading font-bold mb-1">Card Shadow</p>
                      <p className="text-body-small text-muted-foreground">0px 4px 24px rgba(0,0,0,0.1)</p>
                      <p className="text-body-small font-mono mt-1">shadow-card</p>
                    </div>
                    <div className="p-4 border-2 border-forest-green rounded-lg bg-white shadow-medium">
                      <p className="text-heading-4 font-heading font-bold mb-1">Medium Shadow</p>
                      <p className="text-body-small text-muted-foreground">var(--shadow-medium)</p>
                      <p className="text-body-small font-mono mt-1">shadow-medium</p>
                    </div>
                  </div>
                  <CodeBlock id="shadows">
{`<div className="shadow-card">Card shadow</div>
<div className="shadow-soft">Soft shadow</div>
<div className="shadow-medium">Medium shadow</div>`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </section>

            {/* Transitions Section */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Transitions</h2>
              <p className="text-body text-muted-foreground mb-6">
                Animation timing and easing functions
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Transition Standards</CardTitle>
                  <CardDescription>Standardized transition properties for smooth interactions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-4 border-2 border-forest-green rounded-lg">
                      <p className="text-heading-4 font-heading font-bold mb-2">Smooth Transition</p>
                      <p className="text-body mb-1"><strong>Property:</strong> transition-[var(--transition-smooth)]</p>
                      <p className="text-body mb-1"><strong>Duration:</strong> 0.15s</p>
                      <p className="text-body mb-1"><strong>Easing:</strong> cubic-bezier(0.4, 0, 0.2, 1)</p>
                      <p className="text-body-small text-muted-foreground mt-2">Used for all interactive elements</p>
                      <p className="text-body-small font-mono mt-2">transition-[var(--transition-smooth)]</p>
                    </div>
                    <div className="p-4 border-2 border-forest-green rounded-lg bg-lime-green/20 transition-[var(--transition-smooth)] hover:bg-lime-green/40">
                      <p className="text-heading-4 font-heading font-bold mb-1">Interactive Example</p>
                      <p className="text-body-small text-muted-foreground">Hover to see transition effect</p>
                    </div>
                  </div>
                  <CodeBlock id="transitions">
{`<div className="transition-[var(--transition-smooth)]">
  Smooth transition
</div>
<button className="transition-[var(--transition-smooth)] hover:bg-primary">
  Interactive button
</button>`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </section>

            {/* Interaction States Section */}
            <section>
              <h2 className="text-heading-2 font-heading font-bold mb-4">Interaction States</h2>
              <p className="text-body text-muted-foreground mb-6">
                Standardized states for all interactive elements
              </p>

              <Card>
                <CardHeader>
                  <CardTitle>Universal Interaction Rules</CardTitle>
                  <CardDescription>Hover, focus, active, and disabled states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-heading-3 font-heading font-bold mb-3">Hover States</h3>
                    <div className="space-y-2 text-body">
                      <p><strong>Buttons (Solid):</strong> Darken background by 10% or use specific hover color</p>
                      <p><strong>Buttons (Outline/Ghost):</strong> Fill with background color, invert text</p>
                      <p><strong>Cards:</strong> Elevate shadow (hover:shadow-card), change border to lime-green</p>
                      <p><strong>Links:</strong> Underline on hover for text links, background color change for button-style links</p>
                      <p><strong>Navigation Items:</strong> Light background tint, smooth transitions</p>
                      <p><strong>Transition:</strong> All interactions use transition-[var(--transition-smooth)] (0.15s cubic-bezier)</p>
                    </div>
                    <div className="mt-4 flex gap-4">
                      <Button>Hover Me</Button>
                      <Button variant="primary-outline">Hover Me</Button>
                      <Card className="p-3 cursor-pointer hover:shadow-card hover:border-lime-green transition-[var(--transition-smooth)]">
                        <p className="text-body">Hover Card</p>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-heading-3 font-heading font-bold mb-3">Focus States</h3>
                    <div className="space-y-2 text-body">
                      <p><strong>All Interactive Elements:</strong> 2px outline with 2px offset</p>
                      <p><strong>Implementation:</strong> focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2</p>
                      <p><strong>Color:</strong> Forest green ring (--ring: 130 13% 19%)</p>
                    </div>
                    <div className="mt-4">
                      <Button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">Focus Me (Tab)</Button>
                      <Input className="mt-4" placeholder="Focus me (Tab)" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-heading-3 font-heading font-bold mb-3">Active States</h3>
                    <div className="space-y-2 text-body">
                      <p><strong>Buttons:</strong> 80% opacity or slight scale down (scale-95)</p>
                      <p><strong>Feedback:</strong> Immediate visual feedback on click/touch</p>
                    </div>
                    <div className="mt-4">
                      <Button className="active:opacity-80 active:scale-95">Click Me</Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-heading-3 font-heading font-bold mb-3">Disabled States</h3>
                    <div className="space-y-2 text-body">
                      <p><strong>All Interactive Elements:</strong> 40% opacity</p>
                      <p><strong>Pointer Events:</strong> disabled:pointer-events-none</p>
                      <p><strong>Cursor:</strong> not-allowed (handled by browser default)</p>
                    </div>
                    <div className="mt-4 flex gap-4">
                      <Button disabled>Disabled Button</Button>
                      <Input disabled placeholder="Disabled Input" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-heading-3 font-heading font-bold mb-3">Touch Interactions (Mobile)</h3>
                    <div className="space-y-2 text-body">
                      <p><strong>Minimum Touch Target:</strong> 44px x 44px</p>
                      <p><strong>Active State Feedback:</strong> Visual feedback on touch</p>
                      <p><strong>Swipe Gestures:</strong> Where appropriate for mobile interactions</p>
                    </div>
                    <div className="mt-4">
                      <Button size="lg" className="min-h-[44px] min-w-[44px]">Touch Target</Button>
                    </div>
                  </div>

                  <CodeBlock id="interaction-states">
{`<Button className="hover:bg-primary/90">Hover</Button>
<Button className="focus-visible:ring-2 focus-visible:ring-ring">Focus</Button>
<Button className="active:opacity-80">Active</Button>
<Button disabled>Disabled</Button>`}
                  </CodeBlock>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>

        {/* INTERACTION RULES SECTION */}
        <section className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Universal Interaction Rules</CardTitle>
              <CardDescription>Standardized hover, focus, active, and disabled states</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-heading-3 font-heading font-bold mb-3">Hover States</h3>
                <div className="space-y-2 text-body">
                  <p><strong>Buttons (Solid):</strong> Darken background by 10% or use specific hover color</p>
                  <p><strong>Buttons (Outline/Ghost):</strong> Fill with background color, invert text</p>
                  <p><strong>Cards:</strong> Elevate shadow (hover:shadow-card), change border to lime-green</p>
                  <p><strong>Links:</strong> Underline on hover for text links, background color change for button-style links</p>
                  <p><strong>Navigation Items:</strong> Light background tint, smooth transitions</p>
                  <p><strong>Transition:</strong> All interactions use transition-[var(--transition-smooth)] (0.15s cubic-bezier)</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-heading-3 font-heading font-bold mb-3">Focus States</h3>
                <div className="space-y-2 text-body">
                  <p><strong>All Interactive Elements:</strong> 2px outline with 2px offset</p>
                  <p><strong>Implementation:</strong> focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2</p>
                  <p><strong>Color:</strong> Forest green ring (--ring: 130 13% 19%)</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-heading-3 font-heading font-bold mb-3">Active States</h3>
                <div className="space-y-2 text-body">
                  <p><strong>Buttons:</strong> 80% opacity or slight scale down (scale-95)</p>
                  <p><strong>Feedback:</strong> Immediate visual feedback on click/touch</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-heading-3 font-heading font-bold mb-3">Disabled States</h3>
                <div className="space-y-2 text-body">
                  <p><strong>All Interactive Elements:</strong> 40% opacity</p>
                  <p><strong>Pointer Events:</strong> disabled:pointer-events-none</p>
                  <p><strong>Cursor:</strong> not-allowed (handled by browser default)</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-heading-3 font-heading font-bold mb-3">Touch Interactions (Mobile)</h3>
                <div className="space-y-2 text-body">
                  <p><strong>Minimum Touch Target:</strong> 44px x 44px</p>
                  <p><strong>Active State Feedback:</strong> Visual feedback on touch</p>
                  <p><strong>Swipe Gestures:</strong> Where appropriate for mobile interactions</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-heading-3 font-heading font-bold mb-3">Transition Standards</h3>
                <div className="space-y-2 text-body">
                  <p><strong>Property:</strong> transition-[var(--transition-smooth)]</p>
                  <p><strong>Duration:</strong> 0.15s</p>
                  <p><strong>Easing:</strong> cubic-bezier(0.4, 0, 0.2, 1)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </ManagerLayout>
  );
}

