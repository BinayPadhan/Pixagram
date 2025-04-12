import { SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/action/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlobeIcon, MapPinIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export default async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;

  const user = await getUserByClerkId(authUser.id);
  if (!user) return null;

  console.log({ user });

  return (
    <Card className="w-[300px] p-4">
      <CardHeader className="items-center text-center space-y-2">
        <Avatar className="w-20 h-20 mx-auto">
          <AvatarImage src={user.image || "/avatar.png"} alt="User profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-muted-foreground">{user.username}</p>
        <CardDescription className="text-sm text-muted-foreground">
          {user.bio}
        </CardDescription>
      </CardHeader>

      <Separator className="my-2" />

      <CardContent className="space-y-4 text-sm">
        <div className="flex justify-between px-4 text-center">
          <div>
            <p className="font-semibold text-base">{user._count.followers}</p>
            <p className="text-muted-foreground text-xs">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-base">{user._count.following}</p>
            <p className="text-muted-foreground text-xs">Following</p>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPinIcon className="w-4 h-4" />
          <span>{user.location || "No location"}</span>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <GlobeIcon className="w-4 h-4" />
          {user.website ? (
            <a
              href={`${user.website}`}
              className="hover:underline truncate"
              target="_blank"
            >
              {user.website}
            </a>
          ) : (
            "NA"
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function UnAuthenticatedSidebar() {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Welcome
        </CardTitle>
        <CardDescription>
          <p className="text-center text-muted-foreground mb-4">
            Login to access your profile and connect with others.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <SignInButton mode="modal">
            <Button className="w-full">Log In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="outline" className="w-full">
              Sign Up
            </Button>
          </SignUpButton>
        </div>
      </CardContent>
    </Card>
  );
}
