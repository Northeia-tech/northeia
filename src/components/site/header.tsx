import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#inicio" className="rounded-sm">
          <Logo />
        </a>
        <nav aria-label="Seções" className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-mist transition-colors duration-200 hover:text-paper">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href="#contato">Falar com a Orbe</a>
          </Button>
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger
              className="inline-flex size-11 items-center justify-center rounded-md border border-line text-paper lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/80" />
              <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-line bg-ink px-5 py-5">
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-display text-2xl text-paper">Navegação</Dialog.Title>
                  <Dialog.Close className="inline-flex size-11 items-center justify-center rounded-md border border-line" aria-label="Fechar menu">
                    <X className="size-5" aria-hidden="true" />
                  </Dialog.Close>
                </div>
                <Dialog.Description className="sr-only">Seções da página</Dialog.Description>
                <nav className="mt-8 flex flex-col" aria-label="Seções">
                  {nav.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="border-t border-line py-4 text-lg text-paper"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <Button asChild className="mt-6">
                  <a href="#contato" onClick={() => setOpen(false)}>
                    Falar com a Orbe
                  </a>
                </Button>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
