const Tag = ({ tag, color }: { tag: string; color?: string }) => {
  const colorMap: Record<string, string> = {
    "brand-primary": "bg-brand-primary text-black",
    "brand-secondary": "bg-brand-secondary text-black",
  };

  return (
    <div
      className={`${color ? colorMap[color] || `bg-[var(--color-${color})] text-black` : "bg-tag-gray text-white"} rounded-full px-2 py-1.5 flex first-letter:uppercase`}
    >
      <span className="text-[10px] lg:text-xs tracking-tight font-medium">
        {tag}
      </span>
    </div>
  );
};

export default Tag;
