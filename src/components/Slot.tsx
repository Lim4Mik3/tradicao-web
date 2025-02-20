import { cn } from "@/lib/utils";
import { SlotProps } from "input-otp";
import { FakeCaret } from "./FakeCarot";

export function Slot(props: SlotProps) {
  return (
    <div
      className={cn("relative w-12 rounded-md h-12 border border-gray-800 flex items-center justify-center text-lg",
        { '': props.isActive },
      )}
    >
      {props.char !== null && <div className="text-gray-700" >{props.char}</div>}
      {props.hasFakeCaret && <FakeCaret />}
    </div>
  )
}