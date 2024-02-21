import { ReactNode } from "react";

const SettingsRolesLayout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default SettingsRolesLayout;
