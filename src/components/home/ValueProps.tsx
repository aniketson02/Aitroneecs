import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  { icon: Truck, title: "Free shipping", text: "On every order across India" },
  { icon: ShieldCheck, title: "2-year warranty", text: "Coverage on all devices" },
  { icon: RefreshCw, title: "30-day returns", text: "No-questions-asked policy" },
  { icon: Headphones, title: "Human support", text: "Real people, every day" },
];

export function ValueProps() {
  return (
    <section className="border-y border-line bg-surface">
      <Container className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3.5 px-2">
            <Icon className="h-6 w-6 shrink-0 text-accent" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-medium">{title}</p>
              <p className="text-xs text-muted">{text}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
