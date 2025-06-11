const Logo_Figma = () => {
    return (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full transition-transform transform hover:scale-110 cursor-pointer"
      viewBox="0 0 24 24"
      style={{ fill: "rgba(255, 255, 255, 1)" }}
      onClick={()=>window.open("https://www.figma.com/",'_blank')}
    >
      <path d="M15.332 8.668a3.333 3.333 0 0 0 0-6.663H8.668a3.333 3.333 0 0 0 0 6.663 3.333 3.333 0 0 0 0 6.665 3.333 3.333 0 0 0 0 6.664A3.334 3.334 0 0 0 12 18.664V8.668h3.332z" />
      <circle cx="15.332" cy="12" r="3.332" />
    </svg>
    );
  };
  
  export default Logo_Figma;
  