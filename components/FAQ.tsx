import { Accordion } from "@/components/ui/accordion";

export function FAQ({ items }: { items: { question: string; answer: string }[] }) {
  return <Accordion items={items} />;
}
