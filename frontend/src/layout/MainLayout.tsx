import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSizebar from "./components/LeftSizebar";
const MainLayout = () => {
  const isMobile = false;

  return (
    <div className="h-screen bg-black text-white flex flex-col ">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2 "
      >
        {/*Left sizebar*/}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSizebar />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"></ResizableHandle>
        {/*Main sidebar */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>
        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors"></ResizableHandle>

        {/*right sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          friend activity{" "}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout;
