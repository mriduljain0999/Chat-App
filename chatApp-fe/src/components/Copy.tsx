import { toast } from "sonner"
import { Tick } from "./tick"

interface copySVG{
    text: string
}

export function Copy({ text }: copySVG){
    return <svg onClick={() => navigator.clipboard.writeText(text).then(function(){
        toast(
            <div className="flex items-center gap-3">
              <Tick />
              <p>Room code copied to clipboard!</p>
            </div>
          )
    })} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer lucide lucide-copy h-4 w-4"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
}