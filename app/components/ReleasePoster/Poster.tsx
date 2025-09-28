import Image from "next/image";

export const Poster = (props: {
  image: string;
  alt?: string;
  className?: string;
}) => {
  return (
    <div className="relative overflow-hidden">
      <Image
        className={`object-cover transition-all duration-500 group-hover:scale-110 ${props.className}`}
        src={props.image}
        alt={props.alt || ""}
        width={285}
        height={385}
        style={{
          width: "100%",
          height: "auto",
        }}
      />
      {/* Эффект свечения при hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};
