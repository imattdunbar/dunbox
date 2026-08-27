import { Dialog, Combobox } from '@base-ui/react'
import { useHotkey } from '@tanstack/react-hotkeys'
import { cn } from '@/lib/utils'
import { type ReactNode, useEffect, useRef, useState } from 'react'

type Hotkey = Parameters<typeof useHotkey>[0]

export type CMDProps<T> = {
  open?: boolean
  onOpenChange?: (open: boolean) => void

  /** Things to pick from */
  items: T[]
  /** Stable unique string per item. Drives keyboard nav bookkeeping. */
  getItemId: (item: T) => string
  /** Full control over each row. Fires with fresh highlight state every keystroke/nav move. */
  renderItem: (ctx: { item: T; highlighted: boolean }) => ReactNode

  /** Text feeding default behavior + aria labels. Optional if you supply your own filter. */
  getItemLabel?: (item: T) => string
  /**
   * You own search. Called raw: give me sorted/filtered rows back.
   * Omit it and every item renders no matter what is typed
   * (pair with onQueryChange for server-side search).
   */
  filter?: (items: T[], query: string) => T[]
  /** Every keystroke, regardless of who filters */
  onQueryChange?: (query: string) => void

  /** Click AND Enter-on-highlighted. Always the real item, never an id or lowercased string. */
  onItemSelect: (item: T) => void

  /** Post-filter render cap. Defaults to 8. */
  limit?: number
  placeholder?: string
  emptyMessage?: string

  /** Opt-in global toggle e.g. 'Mod+K'. Works while focused inside the palette too. */
  hotkey?: Hotkey

  className?: string
}

function HotkeyBinding({ combo, onToggle }: { combo: NonNullable<CMDProps<never>['hotkey']>; onToggle: () => void }) {
  useHotkey(combo, () => onToggle(), {
    preventDefault: true,
    stopPropagation: true,
    ignoreInputs: false
  })
  return null
}

const CMD = <T,>(props: CMDProps<T>) => {
  const {
    open: propsOpen,
    onOpenChange: propsOnOpenChange,
    items,
    getItemId,
    renderItem,
    getItemLabel,
    filter,
    onQueryChange,
    onItemSelect,
    limit = 8,
    placeholder = 'Search...',
    emptyMessage = 'No results found.',
    hotkey,
    className
  } = props

  const [open, setOpen] = useState(false)

  const isOpen = propsOpen ?? open

  const setIsOpen = (val: boolean) => {
    if (propsOpen === undefined) {
      setOpen(val)
      return
    }

    propsOnOpenChange?.(val)
  }

  const [query, setQuery] = useState('')
  const [highlightedId, setHighlightedId] = useState<string>()

  // Reset transient state each time the palette opens.
  useEffect(() => {
    if (!isOpen) return
    setQuery('')
    onQueryChange?.('')
    setHighlightedId(undefined)
  }, [isOpen])

  const openRef = useRef(isOpen)
  openRef.current = isOpen

  const shownItems = (
    filter
      ? filter(items, query)
      : getItemLabel && query
        ? items.filter((item) => getItemLabel(item).toLowerCase().includes(query.toLowerCase()))
        : items
  ).slice(0, limit)

  const handleQuery = (nextQuery: string) => {
    setQuery(nextQuery)
    onQueryChange?.(nextQuery)
  }

  const toggleFromHotkey = () => setIsOpen(!openRef.current)

  return (
    <>
      {hotkey && <HotkeyBinding combo={hotkey} onToggle={toggleFromHotkey} />}

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40" />
          <Dialog.Popup
            className={cn(
              'bg-zinc-800 text-white fixed top-[25dvh] left-1/2 z-50 w-full max-w-[min(calc(100%-2rem),560px)] -translate-x-1/2 overflow-hidden rounded-xl shadow-xl ring-1 ring-white/10 outline-none',
              className
            )}
          >
            <Combobox.Root
              open={isOpen}
              onOpenChange={setIsOpen}
              inputValue={query}
              onInputValueChange={handleQuery}
              filter={null}
              loopFocus
              onItemHighlighted={(highlightedValue) => {
                setHighlightedId(highlightedValue == null ? undefined : String(highlightedValue))
              }}
            >
              <Combobox.Input
                autoFocus
                placeholder={placeholder}
                aria-label={placeholder}
                className="w-full bg-zinc-800 px-4 py-4 text-lg text-white outline-none placeholder:text-zinc-400"
              />

              <Combobox.List className="no-scrollbar max-h-[min(50vh,420px)] overflow-y-auto overscroll-contain p-1">
                {shownItems.map((item) => {
                  const id = getItemId(item)

                  return (
                    <Combobox.Item
                      key={id}
                      value={id}
                      onClick={() => {
                        onItemSelect(item)
                        setIsOpen(false)
                      }}
                      className="flex cursor-default items-center rounded-lg outline-none"
                    >
                      {renderItem({ item, highlighted: highlightedId === id })}
                    </Combobox.Item>
                  )
                })}

                {shownItems.length === 0 && (
                  <div className="py-10 text-center text-sm text-zinc-400">{emptyMessage}</div>
                )}
              </Combobox.List>
            </Combobox.Root>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export { CMD }
