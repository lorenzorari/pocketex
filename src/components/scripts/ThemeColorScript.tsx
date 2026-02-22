import { COLOR_BLACK, COLOR_WHITE } from '@/constants';

interface Props {
  lightColor?: string;
  darkColor?: string;
}

export function ThemeColorScript({ lightColor = COLOR_WHITE, darkColor = COLOR_BLACK }: Props) {
  return (
    <script>
      {`
        (function() {
          const mode = localStorage.getItem('theme') || 'system'

          if (mode === 'system') {
            const colors = { light: ${JSON.stringify(lightColor)}, dark: ${JSON.stringify(darkColor)} }
            document.querySelectorAll('meta[name="theme-color"]').forEach(el => el?.remove())

            ['light', 'dark'].forEach(scheme => {
              const meta = document.createElement('meta')
              meta.name = 'theme-color'
              meta.media = \`(prefers-color-scheme: \${scheme})\`
              meta.content = colors[scheme]
              document.head.appendChild(meta)
            })
              
            return
          }
          
          const colors = { light: ${JSON.stringify(lightColor)}, dark: ${JSON.stringify(darkColor)} }
          document.querySelectorAll('meta[name="theme-color"]').forEach(el => el?.remove())
          const meta = document.createElement('meta')
          meta.name = 'theme-color'
          meta.content = colors[mode]
          document.head.appendChild(meta)
        })()`}
    </script>
  );
}
