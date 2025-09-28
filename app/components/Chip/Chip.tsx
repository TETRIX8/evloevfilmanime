export const Chip = (props: {
  icon_name?: string;
  icon_color?: string;
  name?: string;
  name_2?: string;
  devider?: string;
  bg_color?: string;
  style?: React.CSSProperties;
  className?: string;
}) => {
  return (
    <div className={`${props.bg_color || "bg-gray-500/90"} backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl chip-glow ${props.className || ""}`}>
      {props.icon_name && (
        <span
          className={`iconify w-3 h-3 sm:w-4 sm:h-4 ml-1.5 icon-bounce ${props.icon_name}`}
          style={
            {
              color: "var(--icon-color)",
              "--icon-color": props.icon_color || "#fff",
            } as React.CSSProperties
          }
        ></span>
      )}
      <p className="px-2 py-1 text-white text-xs font-medium sm:text-sm">
        {props.name}
        {props.name && props.devider ? props.devider : " "}
        {props.name_2}
      </p>
    </div>
  );
};
