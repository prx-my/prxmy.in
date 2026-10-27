from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.utils import simpleSplit
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether

OUT = Path('public/prakhar-resume.pdf')
OUT.parent.mkdir(parents=True, exist_ok=True)

ink = colors.HexColor('#151a22')
blue = colors.HexColor('#185a92')
muted = colors.HexColor('#536173')

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameX', fontName='Helvetica-Bold', fontSize=17.5, leading=19, alignment=TA_CENTER, textColor=ink, spaceAfter=1))
styles.add(ParagraphStyle(name='SubX', fontName='Helvetica', fontSize=9.2, leading=11, alignment=TA_CENTER, textColor=muted, spaceAfter=3))
styles.add(ParagraphStyle(name='ContactX', fontName='Helvetica', fontSize=8.3, leading=10, alignment=TA_CENTER, textColor=blue, spaceAfter=7))
styles.add(ParagraphStyle(name='SectionX', fontName='Helvetica-Bold', fontSize=10.0, leading=12, textColor=blue, spaceBefore=8, spaceAfter=3))
styles.add(ParagraphStyle(name='EntryX', fontName='Helvetica-Bold', fontSize=9.5, leading=11.8, textColor=ink, spaceBefore=4, spaceAfter=1))
styles.add(ParagraphStyle(name='StackX', fontName='Helvetica-Oblique', fontSize=8.5, leading=10.2, textColor=muted, spaceAfter=1))
styles.add(ParagraphStyle(name='BulletX', fontName='Helvetica', fontSize=9.0, leading=11.5, textColor=ink, leftIndent=11, firstLineIndent=-7, spaceAfter=1.5))
styles.add(ParagraphStyle(name='BodyX', fontName='Helvetica', fontSize=9.0, leading=11.5, textColor=ink, spaceAfter=1.5))

story = []
def p(text, style='BodyX'):
    story.append(Paragraph(text, styles[style]))
def section(title):
    p(title.upper(), 'SectionX')
    story.append(HRFlowable(width='100%', thickness=.5, color=colors.HexColor('#aab6c3'), spaceAfter=1))
def entry(title, date, stack=None):
    p(f'{title}<font color="#536173">  |  {date}</font>', 'EntryX')
    if stack: p(stack, 'StackX')
def bullet(text): p('&#8226; '+text, 'BulletX')

p('Prakhar Gupta', 'NameX')
p('Software Engineer | Full-Stack Development and Security Tooling', 'SubX')
p('<link href="mailto:Prakhar06.work@gmail.com">Prakhar06.work@gmail.com</link>  |  +91 81758 46122  |  <link href="https://github.com/prx-my">GitHub</link>  |  <link href="https://www.linkedin.com/in/prxmy/">LinkedIn</link>  |  <link href="https://prxmy.in">Portfolio</link>', 'ContactX')

section('Open Source')
entry('<link href="https://github.com/OWASP/cve-lite-cli">OWASP cve-lite-cli</link> — Contributor', 'Sep 2026–Present', 'TypeScript, Node.js, security tooling')
bullet('Contributed <b>13 merged PRs</b> to a vulnerability scanner, including a fix for false clean results when usage scans exceed 5,000 files and improvements to dependency version handling.')
bullet('Added CI coverage for the declared Node.js minimum, running the full test suite on the supported floor for every push.')
entry('<link href="https://github.com/sugarlabs/musicblocks-v4">Sugar Labs, Music Blocks</link> — Contributor', 'Jun–Oct 2026', 'TypeScript, React, SVG')
bullet('Contributed <b>five merged PRs</b> improving block selection, dragging, duplication, and SVG geometry.')

section('Experience')
entry('<link href="https://schrader.co">Schrader Web Solutions</link> — Web Developer', 'Jul 2026–Present  |  Remote, Michigan', 'Next.js, TypeScript, Resend, Turso')
bullet('Joined as a freelancer and became part of the agency team; contributed <b>57 merged PRs</b> across client and in-house websites.')
bullet('Rebuilt the agency website in Next.js and developed a PageSpeed/Lighthouse audit tool used in sales pitches.')
bullet('Built and maintained websites for local businesses, including contact forms backed by Resend and Turso.')
entry('Home Tutor Platform — Freelance Full-Stack Developer', 'May–Jun 2026', 'Next.js, Supabase, NextAuth, Tailwind CSS')
bullet('Delivered a nine-page site and 12-section admin dashboard with role-based content management, database-driven SEO, and WhatsApp/email lead capture.')
entry('Bits &amp; Bytes — Back-End Developer Intern', 'Apr–May 2026', 'Node.js, discord.js, SQLite, Docker, FFmpeg')
bullet('Built meeting scheduling, role-based access, and audio transcription for a Discord utility bot serving a 1,000-member community.')

section('Selected Projects')
entry('<link href="https://github.com/AWS-env/sarthi">Bhumi Vikas Sahayak (Sarthi)</link>', 'Oct 2026', 'Next.js, FastAPI, Qdrant, Cerebras, Sarvam AI')
bullet('Four-person team project answering questions about Madhya Pradesh building rules with exact rule and PDF-page citations. Hybrid retrieval and reranking found the correct rule in the top five for <b>15/15</b> in-scope sample questions.')
entry('<link href="https://github.com/prx-my/clarity-sms">Clarity SMS</link>', '2026', 'Next.js, TypeScript, Twilio, Neon PostgreSQL')
bullet('Built a two-way SMS inbox and browser dialer, then added consent-controlled AI voice agents, transcripts, usage monitoring, and budget controls.')
entry('<link href="https://github.com/AWS-env/environmental-hacks">Ecoaudit</link>', 'Oct 2026', 'Python, TypeScript, AWS Lambda, API Gateway, S3')
bullet('Contributed compute-waste detectors and an AWS scanning API that checks public repositories without running their code and reports source-level evidence.')
entry('RailMind', 'Jun 2026', 'Python, FastAPI, NetworkX, React, WebSockets')
bullet('Built a beam-search train dispatch planner that cut simulated passenger-delay cost by <b>10.07%</b> against FCFS at <b>23 ms</b> planner latency across a 437 km corridor.')

section('Skills')
p('<b>Languages:</b> Python, TypeScript, JavaScript, Swift, SQL, C++', 'BodyX')
p('<b>Frameworks &amp; data:</b> React, Next.js, Node.js, FastAPI, PostgreSQL/PostGIS, Redis, SQLite, Qdrant', 'BodyX')
p('<b>Tools &amp; cloud:</b> Docker, GitHub Actions, AWS, GCP, Supabase, Twilio, Git', 'BodyX')

section('Achievements and Education')
p('<b>India Innovates &#39;26:</b> National Grand Finale Winner (JanSamadhan)  |  <b>InnovateNSUT &#39;26:</b> 1st Place (Leafline)', 'BodyX')
p('<b>Manipal University Jaipur</b> — B.Tech., Computer Science &amp; Engineering  |  Expected May 2029', 'BodyX')

doc = SimpleDocTemplate(str(OUT), pagesize=letter, rightMargin=38, leftMargin=38, topMargin=30, bottomMargin=30, title='Prakhar Gupta - Resume Draft', author='Prakhar Gupta')
doc.build(story)
print(OUT)
