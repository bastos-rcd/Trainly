import Image from "next/image";

export default function ButtonImage({
  onClick,
  color,
  img,
}: {
  onClick: () => void;
  color: string;
  img: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-300",
    orange: "bg-orange-300",
    red: "bg-red-300",
    emerald: "bg-emerald-300",
  };

  return (
    <button onClick={onClick} className={`${colorMap[color]} rounded-lg p-2`}>
      <Image src={`/icons/${img}.webp`} alt={img} width={20} height={20} />
    </button>
  );
}
