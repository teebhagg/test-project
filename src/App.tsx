import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "./components/ui/checkbox";
import { Button } from "./components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RotateCcw } from "lucide-react";

const pages = [
  { label: "Page 1", id: "page-1", checked: false },
  { label: "Page 2", id: "page-2", checked: false },
  { label: "Page 3", id: "page-3", checked: false },
  { label: "Page 4", id: "page-4", checked: false },
  { label: "Page 5", id: "page-5", checked: false },
];

function App() {
  const [pageData, setPageData] = useState(pages);
  const [openModel, setOpenModel] = useState(false);
  const [allPages, setAllPages] = useState<boolean>(false);

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    setPageData((prevData) =>
      prevData.map((data) =>
        data.id === id ? { ...data, checked: !data.checked } : data
      )
    );
  };

  // Handle all pages checkbox change
  const handleAllPagesCheckboxChange = () => {
    setPageData((prevData) =>
      prevData.map((data) => ({ ...data, checked: !allPages }))
    );
    setAllPages(!allPages);
  };

  // Handle Submit
  const handleSubmit = () => {
    setOpenModel(true);
  };

  // Handle Reset
  const handleReset = () => {
    setPageData(pages);
    setAllPages(false);
  };
  return (
    <main>
      <div className="flex justify-end mx-auto max-w-[600px] px-4 sm:px-6 lg:px-8 mt-10">
        <Button size={"sm"} className="rounded-full" onClick={handleReset}>
          <RotateCcw size={20} className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
      <div className="mx-auto max-w-[600px] px-4 sm:px-6 lg:px-8 my-4 text-[14px]">
        <Card className="px-[15px] py-[10px] shadow-xl rounded-[6px]">
          <div className="flex justify-between items-center py-[12px] px-[7px]">
            <p>All pages</p>
            <Checkbox
              id="all-pages"
              checked={allPages}
              onCheckedChange={() => handleAllPagesCheckboxChange()}
            />
          </div>
          <Separator className="my-[10px]" />
          <div>
            {pageData.map((component) => (
              <div
                key={component.id}
                className="flex justify-between items-center py-[12px] px-[7px]">
                <p>{component.label}</p>
                <Checkbox
                  id={component.id}
                  checked={component.checked}
                  onCheckedChange={() => handleCheckboxChange(component.id)}
                />
              </div>
            ))}
          </div>
          <Separator className="my-[10px]" />
          <Dialog open={openModel} onOpenChange={setOpenModel}>
            <Button
              onClick={handleSubmit}
              className="w-full h-[40px] my-[10px] bg-[#FFCE22] hover:bg-[#FFD84D] text-black font-normal">
              Done
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <p className="text-2xl">
                    Total Selected Pages:{" "}
                    {pageData.filter((data) => data.checked).length}
                  </p>
                </DialogTitle>
                <Separator className="my-[10px]" />
                <DialogDescription>
                  <p className="">
                    Pages:{" "}
                    {pageData
                      .filter((data) => data.checked)
                      .map((data) => data.label)
                      .join(", ")}
                  </p>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Card>
      </div>
    </main>
  );
}

export default App;
