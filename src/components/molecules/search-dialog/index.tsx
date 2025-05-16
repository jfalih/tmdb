"use client";

import { memo, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const SearchDialog = memo(({ open, setOpen }: Props) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  // Handler for form submit or Enter key
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim() === "") return;
    // Navigate to /search?keyword=...
    router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    setOpen(false); // close dialog after search
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-background text-white max-w-md w-full">
        <form onSubmit={onSearch} className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Search Movies</h2>
            <p className="text-gray-400">
              Find your favorite movies, actors, and genres.
            </p>
          </div>
          <Input
            autoFocus
            placeholder="Search for movies, actors, genres..."
            type="search"
            className="bg-input h-10 focus-visible:ring-0 rounded-full text-black"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
});

SearchDialog.displayName = "SearchDialog";
export default SearchDialog;
