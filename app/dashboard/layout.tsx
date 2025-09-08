
import SideNav from "../ui/dashboard/sidenav";
import { font } from "../ui/fonts";
import TopBar from "../ui/dashboard/topbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
    
    return (
      <div className="p-2 w-full h-full">
      
      <TopBar/>
      
      <div className={`${font.className} flex flex-col md:flex-row md:overflow-hidden`}>
        <div className="w-full min-h-fit flex-none md:w-48">
          <SideNav/>
        </div>
        <div className="flex-grow min-h-fit p-3 md:overflow-y-auto md:p-4">{children}</div>
      </div>
      </div>
    );
  }