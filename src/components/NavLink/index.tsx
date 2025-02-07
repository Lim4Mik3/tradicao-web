import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()
  return (
    <Link
      data-current={pathname === props.to}
      className="flex text-black items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground data-[current=true]:text-orange-500 data-[current=true]:underline"
      {...props}
    />
  )
}