import { Button } from "@/app/components/ui/button";

import { LoaderCircleIcon, RefreshCcwIcon } from "lucide-react";

const SubmitEditButton = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Button type="submit" size="icon">
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <RefreshCcwIcon />
      )}
    </Button>
  );
};

export default SubmitEditButton;
