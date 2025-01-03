"use client";
import { useRouter } from "next/navigation";
type Experience = {
  _id: string;
  companyId: string;
  title?: string;
  company?: string;
  startDate: string;
  endDate: string;
  logo: string;
  displayName: string;
  isIndefinite: string;
};

type ExperienceCardProps = {
  experience: Experience;
};

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const current = new Date(experience.startDate) > new Date();
  const formatDateToMMYY = (dateString: string) => {
    // Converts 2023-01-01T00:00:00.000Z to January 2023
    const date = new Date(dateString);

    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center gap-3"
      key={experience._id}
    >
      <div
        className="inline-block rounded-md p-2 backdrop-blur-2xl backdrop-filter transition duration-500 hover:scale-125 hover:cursor-pointer"
        onClick={() => {
          router.push(`/company/${experience.companyId}`);
        }}
      >
        <img
          className="h-24 w-24 rounded-md object-contain"
          src={experience.logo}
          alt={`${experience.displayName}_logo`}
        />
        <div className="absolute left-2 top-5 h-24 w-24 animate-blob rounded-full bg-pipelines-gray-100/20 opacity-70 mix-blend-multiply blur-xl filter" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-pipelines-gray-100">
          {experience.displayName}
        </h1>
        <h1 className="text-x font-thin text-pipelines-gray-100">
          {experience.title}
        </h1>
        <h1 className="text-s font-light text-pipelines-gray-100 opacity-60">
          {formatDateToMMYY(experience.startDate)} -{" "}
          {!experience.isIndefinite
            ? formatDateToMMYY(experience.endDate)
            : !current
              ? "Present"
              : "Indefinite"}
        </h1>
      </div>
    </div>
  );
};
