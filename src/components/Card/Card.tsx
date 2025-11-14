interface ICardProps {
  children: React.ReactNode;
  title?: string;
}

export default function Card({ children, title }: ICardProps) {
  return (
    <div>
      {!!title && <h3>{title}</h3>}
      <div className="body">{children}</div>
    </div>
  );
}
