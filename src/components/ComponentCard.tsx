import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Icons } from "./Icons";
import Link from "next/link";
import { User, Project } from "@prisma/client";
import { Button, buttonVariants } from "./ui/button";

interface ComponentCardProps {
  project: Project & {
    user: User;
  };
}

const ComponentCard: React.FC<ComponentCardProps> = ({ project }) => {
  return (
    <Card
      key={project.id}
      className="max-w-xs mx-auto overflow-hidden transition-all duration-200 rounded-lg shadow-lg sm:max-w-sm hover:shadow-xl"
    >
      <Image
        alt="Profile picture"
        className="object-cover w-full"
        height="320"
        src={project.ogLink!}
        style={{
          aspectRatio: "320/320",
          objectFit: "cover",
        }}
        width="320"
      />
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold ">{project.name}</h2>
          {project.usingTailwind ? (
            <Icons.tailwind className="w-10 h-10" />
          ) : (
            <Icons.css className="w-10 h-10" />
          )}
        </div>
        <p className="pb-2 line-clamp-1">{project.description}</p>
        <Link
          href={`/editor/${project.id}`}
          className={buttonVariants({
            size: "sm",
            className:
              "w-full transition-all duration-200 hover:bg-gray-700 hover:text-white",
          })}
        >
          Open
        </Link>
      </CardContent>
    </Card>
  );
};

export default ComponentCard;
