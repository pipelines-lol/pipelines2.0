"use client";
import { useRouter } from "next/navigation";

export default function DiscoverButton() {
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/discover");
  };

  return (
    <>
      <a
        role="button"
        onClick={() => handleNavigation()}
        className="group relative mt-12 inline-flex scale-125 items-center justify-center overflow-hidden rounded-full border-2 border-pipeline-blue-200/50 p-4 px-6 font-medium text-pipeline-blue-200 shadow-md transition duration-300 ease-out"
      >
        <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-pipeline-blue-200 text-white duration-300 group-hover:translate-x-0">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
        </span>
        <span className="ease absolute flex h-full w-full transform items-center justify-center text-pipelines-gray-100 transition-all duration-300 group-hover:translate-x-full">
          Discover
        </span>
        <span className="invisible relative">Add Your Pipeline</span>
      </a>
    </>
  );
}
