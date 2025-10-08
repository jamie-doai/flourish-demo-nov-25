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
    <div className="min-h-screen bg-background">
      {header}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Link key={section.path} to={section.path}>
              <Card className="p-4 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-card-foreground/5 flex items-center justify-center ${section.color || 'text-primary'}`}>
                    <section.icon className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{section.title}</h3>
                <p className="text-muted-foreground text-xs">{section.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
