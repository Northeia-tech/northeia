import { Fragment } from 'react'

// Splits a sentence into word spans so scroll can light them up one by one.
// Words are fully visible by default; only the motion layer dims them.
export default function Words({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="word">{word}</span>{' '}
        </Fragment>
      ))}
    </span>
  )
}
