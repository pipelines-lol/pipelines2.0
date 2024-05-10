"use client";
import { Button } from "@pipelines/ui/button";
import { trpc } from "../trpc";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@pipelines/ui/card";
import Link from "next/link";

const LINKS = [
  {
    title: "Docs",
    href: "https://turbo.build/repo/docs",
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: "https://turbo.build/repo/docs/handbook",
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: "https://turbo.build/repo/docs/getting-started/from-example",
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: "https://vercel.com/new",
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

export default function Page(): JSX.Element {
  const { data: test, isLoading, error } = trpc.test.hello.useQuery();
  if (test) {
    console.log("Data: ", test);
  } else if (isLoading) {
    console.log("loading...");
  } else {
    console.log("error: ", error?.message);
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="grid mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left space-x-3">
        {LINKS.map(({ title, href, description }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>Lorem Ipsum</CardContent>
            <CardFooter className="flex justify-between">
              <Link href={href}>
                <Button variant="outline">Link</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
