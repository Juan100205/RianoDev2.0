const Logo_A3D = () => {
    return (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full transition-transform transform hover:scale-110 cursor-pointer fill-white"
      viewBox="0 0 24 24"
      onClick={()=>window.open("https://www.adobe.com/co/products/substance3d.html", '_blank')}
    >
      <path d="M21 19.966V4.034h-6.654zM3 4.034v15.932L9.658 4.034zM9.092 16.76h3.104l1.268 3.205h2.778L12.003 9.904z" />
    </svg>
    );
  };
  
  export default Logo_A3D;
  