const Logo_Maya = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full transition-transform transform hover:scale-110 cursor-pointer fill-white"
      viewBox="0 0 32 32"
      onClick={() => window.open("https://www.autodesk.com/latam/products/maya/overview", "_blank")}
    >
      <title>file_type_maya</title>
      <path d="M21.6,3.462H30L18.767,24.211s-1.893-5.5-2.706-7.459"  />
      <path d="M23.669,29.118H30V3.462C29.995,16.869,24.36,29.118,23.669,29.118Z"  />
      <path d="M18.767,24.211H13.541L2,3.462c2.047-.26,6.135-.611,8.16-.776Z"  />
      <path d="M8.693,16.019C6.96,22.866,1.995,29.32,2,29.314c5.752,0,6.991-.835,6.991-1.276V16.54C8.89,16.37,8.794,16.194,8.693,16.019Z"  />
      <path d="M2,3.462V29.314c3.147-5.2,4.981-8.6,6.6-13.45C4.6,8.794,2,3.462,2,3.462Z" />
      <polyline points="23.233 28.102 23.669 29.118 23.669 15.647 23.233 16.375"  />
      <path d="M23.647,15.673v13.4l.016.043c.452,0,6.332-14.5,6.332-25.656C29.995,3.462,26.406,10.947,23.647,15.673Z"  />
    </svg>
  );
};

export default Logo_Maya;
