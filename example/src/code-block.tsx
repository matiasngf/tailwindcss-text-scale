import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface CodeBlockProps {
  summary?: string
  children: string
  language?: string
  className?: string
}

export const CodeBlock = ({ className, children, summary, language = 'html' }: CodeBlockProps) => {
  if (!summary) {
    return (
      <div className={`${className} w-full max-w-screen-lg mx-auto`}>
        <SyntaxHighlighter showInlineLineNumbers wrapLongLines language={language} style={atomDark}>
          {children}
        </SyntaxHighlighter>
      </div>
    )
  }

  return (
    <details className={`${className} w-full max-w-screen-lg mx-auto`}>
      {summary ? (
        <summary className="flex items-center w-full cursor-pointer">
          <div className="pl-4 grow">
            <SyntaxHighlighter language={language} style={atomDark}>
              {summary}
            </SyntaxHighlighter>
          </div>
        </summary>
      ) : (
        <summary className="w-full text-left cursor-pointer">Code</summary>
      )}
      <SyntaxHighlighter showInlineLineNumbers wrapLongLines language={language} style={atomDark}>
        {children}
      </SyntaxHighlighter>
    </details>
  )
}
