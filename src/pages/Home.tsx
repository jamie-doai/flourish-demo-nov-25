import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-greenhouse.jpg";
import { Sprout, CheckCircle, BarChart3, Users, Truck } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Sprout,
      title: "Batch Tracking",
      description: "Track every plant from seed to sale with complete traceability",
    },
    {
      icon: CheckCircle,
      title: "Daily Tasks",
      description: "Streamline operations with simple task lists for your team",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      description: "Get insights on yield, success rates, and forecasting",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built for managers, supervisors, and greenhouse workers",
    },
    {
      icon: Truck,
      title: "Sales Management",
      description: "Handle quotes, orders, and invoices in one place",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sprout className="w-4 h-4" />
                Purpose-built for production nurseries
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Grow with{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  clarity & control
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">
                Flourish replaces spreadsheets with a complete platform for managing your plant
                lifecycle — from seed to sale. Built for the teams who grow.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/dashboard">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg">
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm text-muted-foreground">Traceability</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-muted-foreground">Nurseries</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-muted-foreground">Access</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl -z-10" />
              <img
                src={heroImage}
                alt="Modern greenhouse with healthy plants"
                className="rounded-2xl shadow-[var(--shadow-medium)] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to flourish</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful tools designed specifically for production nurseries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border bg-card hover:shadow-[var(--shadow-soft)] transition-[var(--transition-smooth)]"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary-foreground">
            Ready to transform your nursery?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join production nurseries using Flourish to manage their operations with confidence
          </p>
          <Button variant="secondary" size="lg">
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>Flourish</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Flourish. Built for growers, by growers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
