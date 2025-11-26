'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SigninDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">Sign In</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-sm w-full p-6 bg-white -translate-x-1/2 -translate-y-1/2 rounded-md">
          <Dialog.Title>Login</Dialog.Title>
          <Dialog.Description>Sign in to your account</Dialog.Description>

          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="Password" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">Sign In</Button>
              <Dialog.Close asChild>
                <Button variant="outline" className="w-full">Cancel</Button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
