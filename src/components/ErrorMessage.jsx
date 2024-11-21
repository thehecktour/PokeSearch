/* eslint-disable react/prop-types */
export default function ErrorMessage({ title, message }) {
  return (
    <div className="mt-56 flex flex-col items-center justify-center gap-3">
      <h2 className="text-3xl text-red-200">{title}</h2>
      <h3 className="text-xl">{message}</h3>
    </div>
  );
} 