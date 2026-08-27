import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@dunbox/ui/core/button'
import CMD from '@dunbox/ui/components/CMD'

export const Route = createFileRoute('/')({
  component: App
})

function App() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-black text-3xl font-bold text-white">
      Base Template
      <Button variant="default" className="text-red">
        whaddup
      </Button>
      <CMD />
    </div>
  )
}
