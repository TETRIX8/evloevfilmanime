export const Chip = (props: {
  icon_name?: string;
  icon_color?: string;
  name?: string;
  name_2?: string;
  devider?: string;
  bg_color?: string;
  style?: React.CSSProperties;
  className?: string;
}) => (
  <span
    className={`ef-chip ${props.bg_color || "bg-gray-900"} ${props.className || ""}`}
    style={props.style}
  >
    {props.icon_name && (
      <span
        aria-hidden="true"
        className={`iconify ${props.icon_name}`}
        style={{ color: props.icon_color || "#fff" }}
      />
    )}
    <span>
      {props.name}
      {props.name && props.devider ? props.devider : " "}
      {props.name_2}
    </span>
  </span>
);
