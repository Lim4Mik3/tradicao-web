import { ServiceCard } from "./ServiceCard";

type Props = {
  title: string;
}

export function ServicesInput({ title }: Props) {
  return (
    <div className="flex flex-col w-full">
      <span
        className="flex text-sm font-semibold text-gray-600 mb-4"
      >
        {title}
      </span>

      <div
        className="flex items-center justify-center flex-wrap gap-2"
      >
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </div>
    </div>
  );
}