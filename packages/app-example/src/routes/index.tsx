import { createFileRoute } from '@tanstack/react-router'
import { CMD } from '@dunbox/ui/components/CMD'
import { useState } from 'react'

type Team = {
  id: number
  longName: string
}

const teams: Team[] = [
  { id: 1, longName: 'Kentucky Wildcats' },
  { id: 2, longName: 'Duke Blue Devils' },
  { id: 3, longName: 'Michigan Wolverines' },
  { id: 4, longName: 'Green Bay Packers' },
  { id: 5, longName: 'Los Angeles Lakers' },
  { id: 6, longName: 'Boston Red Sox' },
  { id: 7, longName: 'Chicago Blackhawks' },
  { id: 8, longName: 'Dallas Cowboys' },
  { id: 9, longName: 'Toronto Maple Leafs' },
  { id: 10, longName: 'San Antonio Spurs' }
]

export const Route = createFileRoute('/')({
  component: App
})

function App() {
  const [selectedTeam, setSelectedTeam] = useState<Team>()

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-3 bg-black text-white">
      <h1 className="text-3xl font-bold">CMD Demo</h1>
      <p className="text-sm text-white/60">Press Cmd+K or Ctrl+K to search teams.</p>
      {selectedTeam && <p className="text-sm">Selected: {selectedTeam.longName}</p>}

      <CMD
        items={teams}
        getItemId={(team) => String(team.id)}
        getItemLabel={(team) => team.longName}
        hotkey="Mod+K"
        placeholder="Search teams..."
        emptyMessage="No teams found."
        filter={(items, query) =>
          items.filter((team) => team.longName.toLowerCase().includes(query.trim().toLowerCase()))
        }
        onItemSelect={setSelectedTeam}
        renderItem={({ item, highlighted }) => (
          <div className={`w-full rounded-lg px-3 py-3 ${highlighted ? 'bg-indigo-500/30' : ''}`}>
            <div className="font-medium">{item.longName}</div>
            <div className="text-xs text-white/50">Team #{item.id}</div>
          </div>
        )}
      />
    </div>
  )
}
