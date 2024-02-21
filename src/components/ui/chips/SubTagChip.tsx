import tinycolor from "tinycolor2";

export const SubtagChip = ({
  name,
  color,
  subname,
}: {
  name: string;
  color: string;
  subname?: string|null;
}) => {
  let bgHSLA = tinycolor(color).brighten(70).toHexString();
  let colorHSLA = tinycolor(color).toHexString();

  return (
    <div
      className="cursor-default flex rounded-lg px-4 py-1 text-sm shadow-md w-fit"
      style={{ backgroundColor: bgHSLA, color: colorHSLA }}
    >
      {name}
      {subname && subname.length > 0 && (
        <div className="text-black mx-2">|</div>
      )}
      {subname && subname.length > 0 && (
        <div className="text-black w-fit max-w-[44px] line-clamp-1 text-ellipsis" title={subname}>
          {subname}
        </div>
      )}
    </div>
  );
};
