import type{ ReactNode } from "react";

interface Props {
  name: ReactNode;
  icon: ReactNode;
}

function Tech_card({ name, icon }: Props) {
  return (
    <div className="md:h-35 h-30  bg-gray-300 rounded-2xl flex flex-col justify-between items-center mr-5 md:mr-7">
      <h1 className="text-center font-extralight text-sm w-25 md:w-30 pt-4">
        {name}
      </h1>
      <div className="md:w-20 w-15 pb-3 items-center">
        {icon}
      </div>
    </div>
  );
}

export default Tech_card;
