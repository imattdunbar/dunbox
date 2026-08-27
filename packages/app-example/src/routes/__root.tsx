import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
import { RouterContext } from '@/router'
import appCss from '@/styles.css?url'

export const Route = createRootRouteWithContext<RouterContext>()({
  shellComponent: RootDocument
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link rel="stylesheet" href={appCss} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
