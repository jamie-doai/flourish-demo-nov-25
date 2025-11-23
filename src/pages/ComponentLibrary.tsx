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
          <TabsList className="grid grid-cols-3 gap-2 border-2 border-forest-green h-auto px-1 !py-1">
            <TabsTrigger value="shared" className="text-body font-heading font-bold">
              Shared Components
            </TabsTrigger>
            <TabsTrigger value="manager" className="text-body font-heading font-bold">
              Manager Web
            </TabsTrigger>
            <TabsTrigger value="worker" className="text-body font-heading font-bold">
              Worker Mobile
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

