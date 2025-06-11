function Logo_SQL() {
return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      onClick={()=>window.open("https://www.mysql.com/",'blank')}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full stroke-white fill-transparent transition-transform transform hover:scale-110 cursor-pointer"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
);
}
export default Logo_SQL;