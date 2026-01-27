import Link from "next/link";

export default function StickerCard({
  title,
  desc,
  emoji,
  href,
}: {
  title: string;
  desc: string;
  emoji: string;
  href: string;
}) {
  return (
    <Link href={href} className="sticker-card">
      <div className="emoji">{emoji}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  );
}
