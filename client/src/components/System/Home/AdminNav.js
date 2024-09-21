import React, { memo } from "react";
import DefaultAvatar from "../../../assets/images/profile.png";
import icons from "../../../utils/icons";
import ButtonCustom from "../../ButtonCustom";

const { IoNotificationsOutline } = icons;
const AdminNav = ({ user }) => {
  return (
    <div className="flex w-full items-center justify-end gap-2">
      <div className="flex w-full items-center justify-center">
        <ButtonCustom HoverColor={"hover:bg-white "} FontWeight={"font-medium"} IconBefore={IoNotificationsOutline} />
      </div>
      <div className="flex w-full items-center justify-center">
        <ButtonCustom User={user} TextColor="text-white" Avatar={user?.Avatar ? user?.Avatar : DefaultAvatar} />
      </div>
    </div>
  );
};

export default memo(AdminNav);
