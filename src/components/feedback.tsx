import { Arrow, ExtLink } from "./ui";

export type FeedbackQuote = {
  label: string;
  excerpt: string;
  author: string;
  context: string;
  href: string;
  date?: string;
  fullText?: string[];
};

export function Feedback({ quote }: { quote: FeedbackQuote }) {
  return (
    <figure className="feedback-quote">
      <p className="eyebrow">{quote.label}</p>
      <blockquote cite={quote.href}><p>“{quote.excerpt}”</p></blockquote>
      <figcaption>
        <ExtLink href={quote.href}>{quote.author}<Arrow /></ExtLink>
        <span>{quote.context}</span>
        {quote.date && <time dateTime={quote.date}>{new Date(`${quote.date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>}
      </figcaption>
      {quote.fullText && (
        <details className="feedback-full pr-details">
          <summary><span>Read the full recommendation</span><span className="details-plus" aria-hidden="true">+</span></summary>
          <blockquote cite={quote.href}>{quote.fullText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote>
        </details>
      )}
    </figure>
  );
}
