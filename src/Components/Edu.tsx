import type { ReactNode } from "react";

interface Props {
  place: ReactNode;
  certification: ReactNode;
  date_init: ReactNode;
  date_finish: ReactNode;
  initialLine: number;
}

function Edu({ place, certification, date_init, date_finish, initialLine }: Props) {
  const numberOfLines = 9; 

  return (
    <div className="flex fade-in-up ">
      {/* Números de línea individuales */}
      <div className="w-10 text-right mr-5 text-black  ">
        {Array.from({ length: numberOfLines }, (_, i) => (
          <div key={i}>{initialLine + i}</div>
        ))}
      </div>

      {/* Contenido de educación con estilo tipo código */}
      <div className="whitespace-pre text-sm text-cyan-500 ">
  <span className="text-cyan-500">init_education</span>{" "}
  <span className="text-black">&#123;</span>
  {"\n"}
  {"   "}
  <span className="text-cyan-500">place</span>: <span className="text-pink-500">String</span>
  <span className="text-black">(</span>
  <span className="text-yellow-500">"{place}"</span>
  <span className="text-black">)</span>;
  {"\n"}
  {"   "}
  <span className="text-cyan-500">certification</span>: <span className="text-pink-500">String</span>
  <span className="text-black">(</span>
  <span className="text-yellow-500">"{certification}"</span>
  <span className="text-black">)</span>;
  {"\n"}
  {"   "}
  <span className="text-cyan-500">time</span>: <span className="text-black">&#123;</span>
  {"\n"}
  {"     "}
  <span className="text-cyan-500">for</span> <span className="text-black">&#123;</span>
  {"\n"}
  {"       "}
  <span className="text-cyan-500">date_init</span> = <span className="text-pink-500">Date</span>
  <span className="text-black">(</span>
  <span className="text-black">{date_init}</span>
  <span className="text-black">)</span>;
  {"\n"}
  {"       "}
  <span className="text-cyan-500">date_finish</span> = <span className="text-pink-500">Date</span>
  <span className="text-black">(</span>
  <span className="text-black">{date_finish}</span>
  <span className="text-black">)</span>;
  {"\n"}
  {"     "}
  <span className="text-black">&#125;</span>
  {"\n"}
  {"   "}
  <span className="text-black">&#125;</span>
  {"\n"}
  <span className="text-black">&#125;</span>
</div>

    </div>
  );
}

export default Edu;
