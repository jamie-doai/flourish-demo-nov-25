import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface KPICardProps {
  value: string | number;
  label: string;
  subtitle?: string;
  subtitleColor?: "success" | "caution" | "info" | "warning";
  href?: string;
  className?: string;
}

export function KPICard({ 
  value, 
  label, 
  subtitle, 
  subtitleColor,
  href,
  className = ""
}: KPICardProps) {
  const subtitleClass = subtitleColor
    ? `text-body-small text-${subtitleColor} mt-0.5`
    : "text-body-small text-muted-foreground mt-0.5";

  const content = (
    <Card className={`h-full ${className}`}>
      <div className="text-heading-2 font-heading font-bold">
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      <div className="text-body-small text-muted-foreground mt-0.5">{label}</div>
      {subtitle && <div className={subtitleClass}>{subtitle}</div>}
    </Card>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
}

