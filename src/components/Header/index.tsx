import classNames from "classnames";

type HeaderProps = {
  brownText: string;
  blackText: string;
  className?: string;
  textAlign?: "left" | "center" | "right";
};

const Header = ({
  brownText,
  blackText,
  className = "",
  textAlign = "center",
}: HeaderProps) => {
  return (
    <h2
      className={classNames("text-2xl font-bold", className, {
        "text-center": textAlign === "center",
        "text-left": textAlign === "left",
        "text-right": textAlign === "right",
      })}
    >
      <span className="text-brown-700">{brownText}</span> {blackText}
    </h2>
  );
};

export default Header;
