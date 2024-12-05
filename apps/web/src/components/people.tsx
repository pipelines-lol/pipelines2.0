"use server";
import DiscoverButton from "./DiscoverButton";
import { trpc } from "~/trpc/server";
import { PipelineCard } from "./PipelineCard";
import type { profiles } from "@prisma/client";

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

export default async function People() {
  const profiles = await trpc.profile.getRandomProfiles.query({ amount: 5 });

  console.log("Result: ", profiles);

  return (
    <>
      <section className="flex h-full w-full flex-row flex-wrap items-center justify-center border-t-[0.5px] border-pipeline-blue-200 bg-pipelines-gray-100/10 bg-opacity-95  py-20 backdrop-blur-lg backdrop-filter">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h1 className="xs:text-xl mx-8 text-center text-xl font-light text-pipelines-gray-100/80 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
            People from{" "}
            <span className="font-bold text-pipeline-blue-200">
              Around the World
            </span>{" "}
            are Sharing Their Pipelines
          </h1>

          <div className="mt-10 flex h-full w-full flex-row flex-wrap items-center justify-evenly p-5">
            {profiles.map((profile: profiles) => (
              <div
                key={`profile_${profile.id}`}
                className="mb-10 rounded-md bg-zinc-800 p-7"
              >
                <PipelineCard
                  key={`pipeline_${profile.id}`}
                  profileId={profile.id}
                  name={profile.firstName + " " + profile.lastName}
                  pfp={profile.pfp}
                  anonymous={profile.anonymous}
                  pipeline={profile.pipeline as Experience[]}
                />
              </div>
            ))}
          </div>
          <div className="flex h-full w-full flex-row flex-wrap items-center justify-evenly p-5"></div>
          <DiscoverButton />
        </div>
      </section>
    </>
  );
}
