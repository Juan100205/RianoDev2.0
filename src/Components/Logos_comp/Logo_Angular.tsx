const Logo_Angular = () => {
    return (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full transition-transform transform hover:scale-110 cursor-pointer"
      viewBox="0 0 24 24"
      style={{ fill: "rgba(255, 255, 255, 1)" }}
      onClick={()=>window.open("https://angular.dev/",'_blank')}
    >
      <path d="M10.483 12.482h3.034L12 8.831z" />
      <path d="M12 3.074 3.689 6.038l1.268 10.987 7.043 3.9 7.043-3.9 1.268-10.987L12 3.074zm5.187 13.621H15.25l-1.045-2.606h-4.41L8.75 16.695H6.813L12 5.047l5.187 11.648z" />
    </svg>
    );
  };
  
  export default Logo_Angular;
  