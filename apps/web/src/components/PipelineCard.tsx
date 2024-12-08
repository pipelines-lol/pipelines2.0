import { trpc } from "~/trpc/server";
import { ConditionalLink } from "./ConditionalLink";
import { ExperienceCard } from "./ExperienceCard";

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

type PipelineCardProps = {
  profileId: string;
  name: string;
  pfp: string;
  anonymous: boolean;
  pipeline: Experience[];
};

export const PipelineCard = async ({
  profileId,
  name,
  pfp,
  anonymous,
  pipeline,
}: PipelineCardProps) => {
  if (!profileId || profileId === "") return;
  if (!pfp || pfp === "") return;

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <ConditionalLink
        className="w-2/3"
        condition={true}
        to={`/user/${profileId}`}
      >
        <div className="mx-auto flex w-4/6 flex-row items-center justify-center gap-4 px-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={anonymous ? "avatar.png" : pfp || "avatar.png"}
            alt="avatar"
          />
          <h1 className="mx-auto whitespace-nowrap text-xl font-light uppercase text-pipelines-gray-100">
            {anonymous ? "Anonymous" : name}
          </h1>
        </div>
      </ConditionalLink>

      <div className="flex flex-row gap-3">
        {pipeline.length > 0 && (
          <div
            className="flex flex-row items-center justify-center gap-3"
            key={pipeline[pipeline.length - 1]._id}
          >
            <ExperienceCard experience={pipeline[pipeline.length - 1]} />
          </div>
        )}
      </div>
    </div>
  );
};
