const Tag = ({ tag }: { tag: string }) => {
  return (
    <div className="bg-tag-gray text-white rounded-full px-2.5 py-0.5 inline-block">
      <span className="text-xs tracking-tight">{tag}</span>
    </div>
  );
};

export default Tag;
