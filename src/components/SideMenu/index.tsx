import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";

export const SideMenu = () => {
	const isMobile = useIsMobile();

	return <>{isMobile ? <MobileMenu /> : <DesktopMenu />}</>;
};
