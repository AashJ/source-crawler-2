import type { FC } from "react";
import { Avatar } from "@radix-ui/react-avatar";

import { AvatarFallback, AvatarImage } from "../design-system/Avatar";

export type HeaderProps = {};

const Header: FC<HeaderProps> = ({}: HeaderProps) => {
  return (
    <div className="flex items-center space-x-2 rounded-t-md bg-[#0060a4] px-4 py-2 text-white">
      <Avatar className="h-8 w-8 text-[#0060a4]">
        <AvatarImage src={""} />
        <AvatarFallback>{"T"}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">Technically bot</span>
    </div>
  );
};

export default Header;
