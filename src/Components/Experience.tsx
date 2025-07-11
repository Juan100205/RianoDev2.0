import type { ReactNode } from "react";

interface Props {
    place:ReactNode;
    occ:ReactNode;
    date:ReactNode;
    s_skills:ReactNode;

}
function Experience ({place,occ,date,s_skills}:Props){
    return(

        <>  
          <div className="relative border-l-2 border-black ml-5 pb-10">
            <div className=" ml-10 relative">
              <div className=" absolute -left-15.25 -top-2 w-10 h-10 bg-black border-6 border-black rounded-full z-10"></div>
              <h3 className="md:text-2xl text-base font-semibold">
              {place}
              </h3>
              <p className="font-semibold mt-5 md:text-base text-sm">{occ}</p>
              <p className="md:text-sm text-xs text-gray-400 mb-3 font-thin">{date}</p>
              <div className="flex text-gray-400">
                <>
                  &bull;
                </>
                <ul className="md:text-sm text-xs  list-disc ml-5 space-y-1">
                {s_skills}
                </ul>
              </div>
            </div>
          </div>
      </>

    );  
};
export default Experience;