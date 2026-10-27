// Original vector compositions for this portfolio; these are illustrations,
// rather than fabricated screenshots or live product metrics.
export function ProjectVisual({ slug, className = "" }: { slug: string; className?: string }) {
  return (
    <svg viewBox="0 0 640 420" fill="none" className={`project-visual ${className}`} aria-hidden="true">
      <path d="M30 30H610V390H30Z" stroke="currentColor" strokeOpacity=".15"/>
      <path d="M30 60H610M60 30V390M580 30V390M30 360H610" stroke="currentColor" strokeOpacity=".1" strokeDasharray="2 8"/>
      {slug === "ecoaudit" ? <>
        <path d="m132 152-44 58 44 58m376-116 44 58-44 58m-134-98-48 80" stroke="currentColor" strokeWidth="7"/>
        <path d="M179 122H461V300H179Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M179 155H461" stroke="currentColor" strokeWidth="2"/>
        <circle cx="194" cy="138" r="3" fill="currentColor"/><circle cx="207" cy="138" r="3" fill="currentColor"/><circle cx="220" cy="138" r="3" fill="currentColor"/>
        <path d="M204 183H279M204 200H254M204 217H283M204 234H265M204 251H290" stroke="currentColor" strokeOpacity=".45" strokeWidth="4"/>
        <path d="M407 179V269M365 199V269M323 226V269" stroke="var(--signal)" strokeWidth="14"/>
        <path d="m316 183 47-26 45-31" stroke="var(--signal)" strokeWidth="3"/>
        <path d="m394 127 16-4-2 16" stroke="var(--signal)" strokeWidth="3"/>
        <text x="320" y="332" textAnchor="middle">STATIC EVIDENCE / LOWER WASTE</text>
      </> : slug === "jansamadhan" || slug === "leafline" ? <>
        <path d="M92 113H548M92 180H548M92 247H548M92 314H548M143 79V343M231 79V343M319 79V343M407 79V343M495 79V343" stroke="currentColor" strokeOpacity=".2" strokeWidth="2"/>
        <path d="M143 314V247H231V180H407V113H495" stroke="var(--signal)" strokeWidth="5"/>
        <path d="M127 314h32m336-217v32" stroke="var(--signal)" strokeWidth="3"/>
        {[{x:143,y:314},{x:231,y:247},{x:319,y:180},{x:407,y:180}].map(({x,y})=><circle key={x} cx={x} cy={y} r="7" fill="var(--paper)" stroke="var(--signal)" strokeWidth="3"/>)}
        <path d="M495 133s-25-28-25-44a25 25 0 0 1 50 0c0 16-25 44-25 44Z" fill="var(--signal)"/>
        <circle cx="495" cy="88" r="7" fill="var(--paper)"/>
        <rect x="98" y="134" width="83" height="24" fill="var(--ink)"/><text x="140" y="150" textAnchor="middle" fill="var(--paper)">CITIZEN</text>
        <rect x="370" y="267" width="146" height="24" fill="var(--ink)"/><text x="443" y="283" textAnchor="middle" fill="var(--paper)">RIGHT AUTHORITY</text>
      </> : slug === "railmind" ? <>
        <path d="M89 131H549M89 210H549M89 289H549" stroke="currentColor" strokeWidth="3"/>
        <path d="M89 143H549M89 222H549M89 301H549" stroke="currentColor" strokeOpacity=".3" strokeWidth="2"/>
        {Array.from({length:17},(_,i)=><path key={i} d={`M${101+i*26} 124v26m0 53v26m0 53v26`} stroke="currentColor" strokeOpacity=".25" strokeWidth="2"/>)}
        <path d="m225 131 99 79 99-79M225 289l99-79 99 79" stroke="currentColor" strokeWidth="3"/>
        <rect x="115" y="114" width="78" height="34" fill="var(--signal)"/><path d="M130 124h10m8 0h10m8 0h10" stroke="var(--paper)" strokeWidth="4"/>
        <rect x="440" y="272" width="78" height="34" fill="currentColor"/><path d="M455 282h10m8 0h10m8 0h10" stroke="var(--paper)" strokeWidth="4"/>
        <circle cx="324" cy="210" r="32" fill="var(--paper)" stroke="var(--signal)" strokeWidth="2"/>
        <path d="m311 209 9 9 17-19" stroke="var(--signal)" strokeWidth="3"/>
        <text x="320" y="345" textAnchor="middle">LOOK AHEAD. RESOLVE. EXPLAIN.</text>
      </> : <>
        <rect x="112" y="96" width="416" height="236" stroke="currentColor" strokeWidth="2"/>
        <path d="M112 132H528" stroke="currentColor" strokeWidth="2"/>
        <circle cx="132" cy="114" r="4" fill="var(--signal)"/><circle cx="149" cy="114" r="4" fill="currentColor" opacity=".3"/><circle cx="166" cy="114" r="4" fill="currentColor" opacity=".3"/>
        <path d="m142 174 11 9-11 9m0 39 11 9-11 9" stroke="var(--signal)" strokeWidth="3"/>
        <text x="171" y="188">ORACLE ACADEMY</text><text x="171" y="244">SSO / CLASSES / SECTIONS</text>
        <path d="M172 275h14" stroke="var(--signal)" strokeWidth="4"/>
      </>}
      <path d="M28 25v10m-5-5h10m574-5v10m-5-5h10M28 385v10m-5-5h10m574-5v10m-5-5h10" stroke="currentColor" strokeOpacity=".5"/>
    </svg>
  );
}
