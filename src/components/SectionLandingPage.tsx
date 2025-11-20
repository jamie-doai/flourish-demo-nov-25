import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";

interface SubSection {
  title: string;
  icon: LucideIcon;
  description: string;
  path: string;
  color?: string;
}

interface SectionLandingPageProps {
  title: string;
  description: string;
  sections: SubSection[];
  header?: ReactNode;
}

export function SectionLandingPage({ 
  title, 
  description, 
  sections,
  header 
}: SectionLandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {header}
      <main className="container mx-auto px-4 py-6 bg-white">
        <div className="mb-6">
          <h1 className="text-heading-1 font-heading font-bold mb-2">{title}</h1>
          <p className="text-body text-muted-foreground">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card className="hover:shadow-card transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <section.icon className={`w-6 h-6 ${section.color || 'text-forest-green'}`} />
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-heading-4 font-heading font-bold mb-1">{section.title}</h3>
                <p className="text-muted-foreground text-body-small">{section.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
