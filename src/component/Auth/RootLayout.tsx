import { ReactNode } from "react";
import NavBar from "../NavBar/Navbar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};
export default RootLayout;
