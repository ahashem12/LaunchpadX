"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { BasicInfoTab } from "./BasicInfoTab"
import { CompensationTab } from "./CompensationTab"
import { FormErrorAlert } from "./FormErrorAlert"
import { AlertCircle } from "lucide-react"

interface CreateRoleModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateRoleModal({ isOpen, onClose }: CreateRoleModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-0 bg-card border-border text-foreground">
        <div className="sticky top-0 bg-card z-10 px-6 py-4 border-b border-border">
          <DialogHeader>
            <DialogTitle className="text-xl text-foreground">Create Role</DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-6 py-4">
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-300 text-sm">
                If you want to hire freelancers, make sure you have a co-founder agreement and enough tokens in the
                project Treasury.
              </p>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full bg-muted p-1 rounded-lg mb-6">
              <TabsTrigger
                value="basic"
                className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground"
              >
                Basic Info
              </TabsTrigger>
              <TabsTrigger
                value="compensation"
                className="flex-1 rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-muted-foreground"
              >
                Compensation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <BasicInfoTab />
            </TabsContent>

            <TabsContent value="compensation">
              <CompensationTab />
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-xs text-muted-foreground">Fields marked with an asterisk (*) are required.</div>

          <FormErrorAlert />
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border text-foreground hover:bg-muted hover:text-foreground"
          >
            Cancel
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Role</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
