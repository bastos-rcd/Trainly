import Link from "next/link";
import Image from "next/image";

export default function LinkImage({
  link,
  color,
  img,
  size,
}: {
  link: string;
  color: string;
  img: string;
  size: number;
}) {
  return (
    <Link href={link} className={`bg-${color}-300 rounded-lg p-2`}>
      <Image src={`/icons/${img}.webp`} alt={img} width={size} height={size} />
    </Link>
  );
}
