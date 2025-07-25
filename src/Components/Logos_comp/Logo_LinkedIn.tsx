const Logo_LinkedIn = () => {
  return (
    <svg
      onClick={() => window.open("https://www.linkedin.com/in/juan-jose-ria%C3%B1o-zabaleta-86320a2a3/", '_blank')}
      viewBox="0 0 24 24"
      style={{ fill: 'rgb(255, 255, 255)' }}
      className="transition-transform transform hover:scale-110 cursor-pointer"
    >
      <circle cx="4.983" cy="5.009" r="2.188">
        
      </circle>
      <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path>
    </svg>
  );
};

export default Logo_LinkedIn;
