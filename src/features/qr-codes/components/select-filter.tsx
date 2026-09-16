import {
  Select,
  SelectGroup,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

const SelectFilter = ({
  items,
  value,
  onChange,
  ariaLabel,
}: {
  items: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string | null) => void;
  ariaLabel: string;
}) => {
  return (
    <Select items={items} value={value} onValueChange={onChange}>
      <SelectTrigger className="md:w-40" aria-label={ariaLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
