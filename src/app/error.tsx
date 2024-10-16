"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const { refresh } = useRouter();

  return (
    <div className="flex flex-col justify-center items-center mt-[130px]">
      <h2 className="text-[30px] mb-[5px]">Something went wrong!</h2>
      <button
        onClick={() =>
          startTransition(() => {
            refresh();
            reset();
          })
        }
        className="border-[3px] border-black bg-black text-white py-[8px] px-[20px] rounded-[10px] mt-[80px] transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black"
      >
        Try again
      </button>
    </div>
  );
}

// border-[3px] border-black bg-black text-white py-[8px] px-[20px] rounded-[10px] mt-[80px] transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:border-black

// border-[3px] border-black bg-black text-white py-[8px] px-[20px] rounded-[10px] mt-[80px] transition-all duration-300 ease-in-out hover:bg-gray-800 hover:text-white
