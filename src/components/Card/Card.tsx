interface ICardProps {
  children: React.ReactNode;
  title?: string;
}

export default function Card({ children, title }: ICardProps) {
  return (
    <div className="card w-full bg-white rounded-xs p-4">
      {!!title && <h3 className="mb-2 text-2xl text-gray-500">{title}</h3>}
      <div className="body">{children}</div>
    </div>
  );
}
