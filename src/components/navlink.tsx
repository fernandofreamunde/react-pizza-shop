import { Link, useLocation, type LinkProps } from "react-router";

export type NavlinkProps = LinkProps;

export function Navlink(props: NavlinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      data-current={pathname === props.to}
      className="text-muted-foreground hover:text-foreground data-[current=true]:text-foreground flex items-center gap-1.5 text-sm font-medium"
      {...props}
    />
  );
}
