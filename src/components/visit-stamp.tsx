"use client";

import { useState } from "react";

export function VisitStamp() {
  const [impressions, setImpressions] = useState(0);
  const stamped = impressions > 0;

  return (
    <div className="visit-stamp">
      <button
        type="button"
        className="stamp-card"
        aria-label={stamped ? "Stamp your visit again" : "Stamp your visit"}
        onClick={() => setImpressions(previous => previous + 1)}
      >
        <span className="stamp-card-meta"><span>A small souvenir</span><span aria-hidden="true">prxmy.</span></span>
        <span className="stamp-canvas" data-stamped={stamped}>
          <span className="stamp-invitation" aria-hidden="true">
            <svg viewBox="0 0 80 80" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M30 42V29a10 10 0 0 1 20 0v13l8 7v7H22v-7l8-7Z"/>
              <path d="M18 56h44v7H18zM26 68h28M35 29v10"/>
              <path className="stamp-icon-spark" d="M13 26h8m-4-4v8M60 15h8m-4-4v8"/>
            </svg>
            <span>Leave a little ink.</span>
          </span>
          {stamped && (
            <span key={impressions} className="stamp-impression" aria-hidden="true">
              <span className="stamp-ink"><span>prxmy.in</span><strong>I was here</strong><span>Thanks for stopping by</span></span>
              <svg className="stamp-flecks" viewBox="0 0 300 180" fill="currentColor"><circle cx="23" cy="48" r="2"/><circle cx="273" cy="31" r="1.5"/><circle cx="282" cy="138" r="2.5"/><circle cx="37" cy="151" r="1.5"/><circle cx="58" cy="19" r="1"/><circle cx="257" cy="164" r="1"/></svg>
            </span>
          )}
        </span>
        <span className="stamp-card-action"><span>{stamped ? "Stamped. You were here." : "Stamp your visit"}</span><span className="stamp-action-icon" aria-hidden="true">{stamped ? "↻" : "↘"}</span></span>
      </button>
      <p className="stamp-caption">{stamped ? "One more? The ink’s still wet." : "A little proof you were here."}</p>
      <p role="status" className="sr-only">{stamped ? `Your visit is stamped${impressions > 1 ? `, impression ${impressions}` : ""}. Thanks for stopping by.` : ""}</p>
    </div>
  );
}
