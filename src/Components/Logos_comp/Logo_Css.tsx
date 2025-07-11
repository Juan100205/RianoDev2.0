const Logo_Css = () => {
    return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-full transition-transform transform hover:scale-110 cursor-pointer"
    viewBox="0 0 24 24"
    style={{ fill: "rgba(255, 255, 255, 1)" }}
    onClick={()=>window.open("https://developer.mozilla.org/es/docs/Web/CSS",'_blank')}
  >
    <path d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zM16.9 6.424l-9.8-.002.158 1.949 7.529.002-.189 2.02H9.66l.179 1.913h4.597l-.272 2.62-2.164.598-2.197-.603-.141-1.569h-1.94l.216 2.867L12 17.484l3.995-1.137.905-9.923z" />
  </svg>

    );
  };
  
  export default Logo_Css;
  