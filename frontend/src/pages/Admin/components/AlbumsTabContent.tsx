import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumsDialog from "./AddAlbumsDialog";

const AlbumsTabContent = () => {
  return (
    <Card className="border-zinc-800/50 bg-zinc-800/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Library className="size-5 text-violet-500" /> Albums Library
            </CardTitle>
            <CardDescription>Manage your albums collection</CardDescription>
          </div>
          <AddAlbumsDialog />
        </div>
      </CardHeader>
      <CardContent>
        <AlbumsTable />
      </CardContent>
    </Card>
  );
};

export default AlbumsTabContent;
