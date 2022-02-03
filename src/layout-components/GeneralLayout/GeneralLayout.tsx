import Link from "next/link";
import { ReactNode } from "react";

interface GeneralLayoutProps {
  children: ReactNode;
}

export const GeneralLayout = (props: GeneralLayoutProps) => {
  const { children } = props;

  return (
    <div className="general-layout">
      <div className="general-layout__header">
        <header className="header-default">
          <div className="header-default__left">
            <Link href="/">
              <a className="logo">Zakaz Frontend Guild</a>
            </Link>
          </div>
          <div className="header-default__right"></div>
        </header>
      </div>

      <div className="general-layout__main">{children}</div>

      <div className="general-layout__footer"></div>
    </div>
  );
};
