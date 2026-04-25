const Button = ({ link, text }: { link: string; text: string }) => {
  return (
    <a
      href={link}
      className="inline-block bg-brand-primary text-black hover:bg-brand-primary/90 py-2 px-4 rounded text-sm font-semibold"
    >
      {text}
    </a>
  );
};

export default Button;
