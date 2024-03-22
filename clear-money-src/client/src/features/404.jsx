export default function PageNotFound() {
  return (
    <div className="text-center mt-36">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10em"
        height="10em"
        viewBox="0 0 24 24"
        style={{display: 'block', margin: '0 auto'}}
      >
        <path
          fill="none"
          stroke="#6d28d9"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 7v4a1 1 0 0 0 1 1h3m0-5v10m3-9v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1m7-1v4a1 1 0 0 0 1 1h3m0-5v10"
        />
      </svg>
      <h1>Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}
