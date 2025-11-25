import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

export function DashboardTableHeader() {
  return (
    <div className="p-6 border-b border-border flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-foreground">All Links</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage and track your shortened URLs</p>
      </div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Create a New Shortened Link
              </DialogTitle>
              <DialogDescription>
                Create and customize your shortened URLs with ease.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Label htmlFor="targetUrl">Target URL</Label>
              <Input id="targetUrl" />
            </div>
            <div className="flex justify-end mt-6">
              <Button>Create Link</Button>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}
