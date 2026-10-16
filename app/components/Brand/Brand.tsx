import Link from "next/link";
export function Brand() {
  return (
    <Link href="/" className="ef-brand" aria-label="Evloev Film — главная">
      <span className="ef-brand-mark" aria-hidden="true">
        e<span>f</span>
      </span>
      <span>
        evloev<span className="ef-brand-light">film</span>
        <small>ТВОЙ МИР АНИМЕ</small>
      </span>
    </Link>
  );
}
