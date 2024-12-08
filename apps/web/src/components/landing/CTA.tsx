"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import bg from "~/../public/hero.png";
import hero from "~/../public/Hero2.svg";

export default function CTA() {
  const router = useRouter();
  const { data: session } = useSession();
  const linkedinRedirectUrl = `https://linkedin.com/oauth/v2/authorization?client_id=${process.env.CLIENT_ID}&response_type=code&scope=${process.env.SCOPE}&redirect_uri=${process.env.HOMEPAGE}`;

  const handleNavigation = () => {
    if (session?.user) {
      router.push("/edit");
    } else {
      window.location.href = linkedinRedirectUrl;
    }
  };

  return (
    <>
      <section
        className="flex h-[100vh] w-full flex-col items-center justify-center gap-4 py-12"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100dvh",
        }}
      >
        <div className="mb-20 mt-20 flex h-full w-full flex-col items-center justify-center space-y-8 text-center">
          <p className="xs:text-3xl mx-20 text-3xl font-light text-pipelines-gray-100 md:max-w-2xl md:text-4xl  lg:text-4xl xl:text-5xl">
            What are you waiting for? <br />
            <br />
            <span className="font-semibold text-pipeline-blue-200">
              Share
            </span>{" "}
            your own pipeline and inspire others to follow in your footsteps.
          </p>

          <img
            className="h-[35vh] w-full -translate-x-4 scale-90 object-contain"
            src={hero.src}
            alt={"Hero"}
          />

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
              Add Your Pipeline
            </span>
            <span className="invisible relative">Add Your Pipeline</span>
          </a>
        </div>
      </section>
    </>
  );
}
