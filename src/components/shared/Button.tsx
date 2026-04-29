const Button = ({ link, text }: { link: string; text: string }) => {
  return (
    <a
      href={link}
      className="inline-block bg-brand-primary text-black hover:bg-brand-primary/90 py-2 lg:py-3 px-3.5 lg:px-4 rounded-lg text-sm font-semibold"
    >
      {text}
    </a>
  );
};

export default Button;
