"use client";

import { Navbar, NavbarProps } from "./Navbar";

export type HeaderProps = NavbarProps;

export function Header(props: HeaderProps) {
  return <Navbar {...props} />;
}

export { Navbar };

