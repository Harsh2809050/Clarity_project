export interface WorkSection {
  heading?: string
  paragraphs: string[]
}

export interface WorkIssue {
  id: string
  issueNumber: number
  date: string
  topic: string
  guest: { name: string; title: string }
  headline: string
  subheadline?: string
  episodeUrl: string
  thumbnail?: string
  readTime?: string
  pullQuotes: Array<{ quote: string; attribution: string }>
  sections: WorkSection[]
}

export const workIssues: WorkIssue[] = [
  // ─────────────────────────────────────────────────────────────
  // ISSUE #01
  // ─────────────────────────────────────────────────────────────
  {
    id: 'issue-01',
    issueNumber: 1,
    date: 'May 19, 2026',
    topic: 'Education & Leadership',
    guest: {
      name: 'Mahesh Balakrishnan',
      title: 'IB Strategist & Education Architect',
    },
    headline: 'Your school has a ₹8 crore lobby and a ₹8 lakh teacher.',
    subheadline: 'Guess which one is leaving.',
    episodeUrl: 'https://clarityproject.beehiiv.com/p/why-indian-schools-are-failing-their-best-teachers',
    thumbnail: '/thumbnails/issue-01-mahesh-balakrishnan.png',
    readTime: '8 min read',
    pullQuotes: [
      {
        quote: 'The building doesn\'t teach children. People do. Every rupee you put into marble flooring is a rupee you took away from the person standing in the classroom.',
        attribution: 'Mahesh Balakrishnan',
      },
      {
        quote: 'The salary offer doesn\'t create the decision to leave. It just makes it possible to act on a decision the teacher made six months ago.',
        attribution: 'Mahesh Balakrishnan',
      },
    ],
    sections: [
      {
        heading: 'The crisis nobody is measuring',
        paragraphs: [
          'Every year, hundreds of schools across India post job listings for teachers they should never have lost. The positions opened because a competitor called with a better offer, because a new principal arrived and made a long-serving teacher feel like a new hire, because a policy got implemented overnight without so much as a conversation with the people who would have to execute it. The school posts the listing, runs the interviews, hires someone, spends months training them, and then does the whole thing again in eighteen months when that person leaves too.',
          'Mahesh Balakrishnan has spent fifteen years inside some of India\'s most ambitious school systems — IB schools, CBSE chains, hybrid institutions trying to do both. He has seen this cycle from every angle. His diagnosis is blunt: teacher attrition is the most expensive, most ignored, and most fixable problem in Indian education today. And most school leaders, he says, have no idea what it is actually costing them.',
          'The number is not just the recruitment fee, though that is substantial. It is the three to six months of onboarding before a new teacher is fully functional. It is the IB authorisation or CBSE training, which in some programmes runs to six figures. It is the productivity gap in year one, when a teacher is still learning the school\'s systems, culture, and student cohort. And then there is the category almost no school accounts for at all: parent withdrawals. When a teacher who has built relationships with twenty families over seven years leaves, some of those families leave too. Mahesh puts the total cost of a single mid-senior departure at somewhere between ₹8 and ₹20 lakh, depending on the role and the institution. Nobody budgets for this. Nobody even tracks it. That is precisely why it keeps happening.',
        ],
      },
      {
        heading: 'The timeline of a departure nobody notices',
        paragraphs: [
          'The departure does not start when the resignation letter arrives. Mahesh describes the typical timeline with a precision that suggests he has traced it many times. February: the teacher updates their resume, quietly, without telling anyone. March: a competitor school — or a recruiter for an international school in Dubai — gets in touch. The offer is forty-five percent higher. April: the teacher accepts, gives notice, and the school is blindsided. May: the listing goes up, the interview process begins, and the institution starts over from zero.',
          'The school\'s reaction at this point is almost always the same. They try to counter-offer. Sometimes they succeed in keeping the person for another year, which usually means they lose them anyway when the underlying grievances are not addressed. More often the counter-offer fails, because by the time a teacher is actively interviewing, they have moved on psychologically.',
          'It was not. The salary offer from the competitor was, in Mahesh\'s framing, a permission slip. It made the decision financially executable. But the decision itself was made much earlier — in the meeting where the new principal restructured the department without asking the teachers who had built it. In the performance review cycle that introduced KPIs with no explanation of what they were measuring or why. In the year the school enrolled a new IB cohort and promoted a less experienced teacher to the coordination role that the departing teacher had been preparing for for three years.',
        ],
      },
      {
        heading: 'What the salary difference actually represents',
        paragraphs: [
          'This is the insight that Mahesh returns to most insistently: the schools that reduce their attrition problem to a compensation problem are solving the wrong equation. Compensation matters, and Indian private schools routinely underpay relative to international competitors. But when you ask a teacher who left a 40,000-rupee-a-month school for a 58,000-rupee-a-month school what was really going on, the salary is rarely the first thing they mention.',
          'What they mention is invisibility. Years of institutional memory that got discarded when leadership changed. A curriculum overhaul they were not consulted on despite being the person who would teach it. Parents who called them directly for everything, which the school treated as a sign of success rather than as a reason to give the teacher more formal authority. A career track that went exactly nowhere — the same designation, the same responsibilities, the same annual increment, indefinitely.',
          'The 45% raise, when it came, was not attractive primarily because of the money. It was attractive because it represented a clean break from an institution that had communicated, in a hundred small ways, that the teacher\'s growth was not its problem. Mahesh is precise about the implication: addressing this does not require matching international salaries. It requires making teachers feel that the institution is invested in their trajectory. That is cheaper. Most schools are not doing it.',
        ],
      },
      {
        heading: 'The seven-year teacher and why she exists only at certain schools',
        paragraphs: [
          'Mahesh points to a specific pattern he has observed across the schools that retain good teachers for seven years or more. They are not necessarily the highest-paying schools. They are not always the schools with the best facilities. What they share is a deliberate architecture of internal career progression.',
          'The model looks something like this: a new teacher joins as a class teacher. Within two to three years, with demonstrated performance, they become a section head. That carries real responsibility — the management of a grade cohort, involvement in hiring decisions, a role in parent communication at the institutional level. From there, the path goes to department head, then to a coordination or academic director role. The progression is not automatic and it is not guaranteed, but it exists. Teachers in these schools can see where they are going.',
          'In the schools that bleed people, there is no such ladder. A teacher joins and the ceiling is immediately visible: you are a teacher until you decide to become something else entirely, at another institution. The most ambitious people see this very quickly. They stay for two or three years, build their skills and their resume, and leave for something that will give them a title and a trajectory.',
        ],
      },
      {
        heading: 'India\'s best teachers are now a global export',
        paragraphs: [
          'The competitive landscape has changed in a way that most Indian school administrators have not fully internalised. English-speaking, well-trained Indian educators are in active demand across international school systems in the Gulf, Southeast Asia, and sub-Saharan Africa. Institutions in Dubai, Doha, Singapore, and Nairobi are running structured recruitment campaigns. The packages they offer are categorically different: tax-free salaries, accommodation allowances, international experience, and the status of teaching in a genuinely global environment.',
          'A teacher earning ₹55,000 a month at a respected school in Chennai is one LinkedIn message away from a conversation with a Dubai recruiter offering the equivalent of ₹1.5 lakh a month, housing included, in a school serving students from forty countries. This is not a hypothetical. It is happening at scale, and it has been accelerating since 2022.',
          'The schools that are losing people to this pipeline are not the mediocre ones. They are the good ones. Mahesh\'s point is not that Indian schools should or can match Gulf salaries. It is that they need to understand that they are in a global competition whether they choose to be or not, and that "passion for the mission" is not a retention strategy.',
        ],
      },
      {
        heading: 'What the data does not capture — and why that is the real problem',
        paragraphs: [
          'One of the most frustrating aspects of teacher attrition in Indian schools is that almost no one is measuring it seriously. Hospitals measure staff turnover. IT companies measure it obsessively and build entire HR functions around reducing it. Schools, including expensive private ones, often have no formal system for tracking how long teachers stay, why they leave, or what the aggregate departure pattern looks like across departments and year groups.',
          'Mahesh describes schools where the finance team can tell you the exact cost of the new gymnasium but cannot tell you what teacher turnover cost the institution last year. This reflects a deeper assumption embedded in how schools are managed: that teachers are an operating expense to be optimised, not an asset to be developed and retained.',
          'The schools that have genuinely solved this problem have made one fundamental shift. They have decided that a great teacher who stays for a decade is worth more than almost any other institutional investment — more than the new building, more than the external ranking, more than the admissions consultant. They track tenure and attrition the way a serious business tracks its best customers. India has a curriculum debate, a technology debate, a policy debate. What it largely does not have is a serious public conversation about the people who actually execute on all of it.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ISSUE #02
  // ─────────────────────────────────────────────────────────────
  {
    id: 'issue-02',
    issueNumber: 2,
    date: 'May 22, 2026',
    topic: 'People & Culture',
    guest: {
      name: 'Mahesh Balakrishnan',
      title: 'IB Strategist & Education Architect',
    },
    headline: 'You built a beautiful school. Now who\'s going to teach in it?',
    subheadline: 'The uncomfortable truth nobody prints in the brochure.',
    episodeUrl: 'https://clarityproject.beehiiv.com',
    thumbnail: '/thumbnails/issue-01-mahesh-balakrishnan.png',
    readTime: '9 min read',
    pullQuotes: [
      {
        quote: 'If you\'re spending ₹50–100 crore on infrastructure, at least 10% should go toward the people who actually do the teaching. The building doesn\'t shape children. People do.',
        attribution: 'Mahesh Balakrishnan',
      },
      {
        quote: 'One good teacher who stays ten years is worth more than three good teachers who each leave after three.',
        attribution: 'Mahesh Balakrishnan',
      },
    ],
    sections: [
      {
        paragraphs: [
          'Indian schools spend ₹50–100 crore on land and buildings. Shining atriums. Smart boards in every classroom. Olympic pools that four students use for competitive swimming. Meanwhile, the teacher who built your school\'s culture over seven years? She\'s leaving in April — and a job listing is your only plan.',
        ],
      },
      {
        heading: 'The slow, invisible problem',
        paragraphs: [
          'Walk into most Indian schools and you can see exactly where the money went — gleaming corridors, air-conditioned labs, state-of-the-art everything. What you can\'t see is what\'s quietly walking out the back door: seven years of knowing which child struggles with fractions, which parent needs a phone call before a problem becomes a complaint, which student just needs someone to believe in them this term.',
          'Teacher exits rarely happen because someone stopped caring. They happen because a school two kilometres away offered 40–60% more, and your school\'s response was to hire from a competitor — not grow someone from within. The cycle repeats. The culture resets. The parent who chose your school for its "warm, experienced staff" gets a classroom of newcomers in September.',
          'Nobody puts that cost in the annual report. It\'s not malicious. It just happens gradually, invisibly — and this is the part worth sitting with — it\'s entirely fixable.',
        ],
      },
      {
        heading: 'The maths nobody does',
        paragraphs: [
          '3–7+ years: average teacher stay when 8–10% of the building budget goes toward growing people. 25–60%: the salary jump that triggers most exits — a spending problem, not a loyalty problem. 12–14 years: potential parent relationship per child, built almost entirely by teachers.',
          'One good teacher who stays ten years is worth more than three good teachers who each leave after three. The relationships, the memory, the trust parents place in someone who has known their child since Class 1 — none of that moves with the job listing.',
          'Yet most school budgets treat people as a running cost and buildings as an investment. That thinking is upside down. The real cost of losing a teacher goes beyond the recruitment fee. A new teacher takes 12–18 months to really find her feet in your school. Lose five teachers in a year and you have quietly spent crores in lost ground, with nothing on the balance sheet to show for it.',
        ],
      },
      {
        heading: 'What keeps teachers — and what we\'ve seen work',
        paragraphs: [
          'Legacy institutions have teachers who have stayed 20 years or more. That is not luck. That is not loyalty. That is a system someone built on purpose.',
          'A visible path forward. A teacher who joins at 26 needs to see where she is going by 36. Department head. Academic lead. Curriculum owner. Without that picture, she draws her own — at the school down the road. Training that actually grows people. Schools that put 8–10% of their building budget into teacher development see teachers stay roughly twice as long — not a one-day workshop in October that everyone forgets by November.',
          'Trust, not just titles. Good teachers don\'t only leave for money. They leave when they feel watched rather than trusted. Pay that doesn\'t surprise anyone. The schools that keep the best teachers tell teachers what they will earn next year, and why. Grow your own leaders. Spot promising teachers early, invest in them specifically, build leaders from within. Being seen, not just managed. Culture is built in small moments, long before a resignation letter arrives.',
        ],
      },
      {
        heading: 'Six moves, in the right order',
        paragraphs: [
          '1. Talk to the people who left. Interview every teacher who left in the past two years. The real reasons are almost never what the exit form says.',
          '2. Know who your best teachers are. Identify the top 30% — the ones whose absence would genuinely hurt. Are they being invested in, or just relied upon? 3. Find out what you\'re paying vs. what\'s out there. Compare salaries with five schools within 15 km. The gaps are usually smaller than you fear and larger than you admit.',
          '4. Write down the career ladder. Define at least three clear roles above classroom teacher with real criteria. 5. Protect the people\'s budget before the builders do. Set aside a fixed amount for teacher growth before infrastructure projects claim whatever\'s left. 6. Track how long teachers stay — and tell your board. Average teacher tenure should sit on the dashboard next to student results. The two are more connected than most trustees realise.',
        ],
      },
      {
        heading: 'The 10–15 year brand question',
        paragraphs: [
          'A school\'s reputation is built on outcomes — exam results, university placements, what alumni go on to do. Those outcomes come almost entirely from teachers. The schools that look after their teachers today will have a quiet, compounding advantage in a decade: deeper expertise, steadier culture, parents who trust you because Mrs. Sharma has known their child since Class 3.',
          'The schools that don\'t will still look fine from the outside — new buildings, active social media, full admission cycles. But something quieter will be eroding: the small, hard-to-name things that make a school genuinely great rather than just well-marketed.',
          'One question worth raising in your next leadership meeting: Does your school have a clear, written career path for a teacher who joins at 26 and wants to be a leader by 36? If the honest answer is "not really" — who is building it, and by when? That single conversation is often where everything else begins.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ISSUE #03
  // ─────────────────────────────────────────────────────────────
  {
    id: 'issue-03',
    issueNumber: 3,
    date: 'May 23, 2026',
    topic: 'Education & Culture',
    guest: {
      name: 'Mahesh Balakrishnan',
      title: 'IB Strategist & Education Architect',
    },
    headline: 'Stop upgrading the campus. Start upgrading the culture.',
    subheadline: 'The school that wins in 2031 won\'t win on marble floors. It will win on trust, teachers, and twenty-year memories.',
    episodeUrl: 'https://clarityproject.beehiiv.com',
    thumbnail: '/thumbnails/issue-01-mahesh-balakrishnan.png',
    readTime: '7 min read',
    pullQuotes: [
      {
        quote: 'The moat isn\'t marble. The moat is the teacher who has been here since your oldest student was in nursery and the ten families who re-enrolled because of her.',
        attribution: 'Mahesh Balakrishnan',
      },
      {
        quote: 'The school that wins in 2031 isn\'t the one with the best building in 2026. It\'s the one where a student — twenty years later — says: that place taught me who I am.',
        attribution: 'Mahesh Balakrishnan',
      },
    ],
    sections: [
      {
        heading: 'The core insight',
        paragraphs: [
          'Your competitor can replicate your building in three years. They cannot replicate your people in ten. In school leadership, we are trained to think in tangibles — square footage, smart boards, swimming pools. These things are photographable. They go on the brochure. They close the admission conversation. But here is the framing every school owner needs to sit with: capital assets depreciate; cultural assets compound.',
          'A new building loses novelty in 36 months. A teacher who has been with you for 12 years — knows every child\'s name and every parent\'s anxiety — becomes more valuable every single year she stays.',
          'By the numbers: 3× higher parent re-enrollment when teachers stay 5+ years. 68% of parents cite "teachers and relationships" as the #1 reason to stay. ₹0 cost of a referral from a parent who genuinely trusts you.',
        ],
      },
      {
        heading: 'The four investments that compound',
        paragraphs: [
          'Across schools that consistently outperform on retention, parent NPS, and fee growth, four culture investments appear again and again — none of them on a construction invoice.',
          '1. Teacher Career Architecture: Design a three-tier growth path — class teacher → lead teacher → academic mentor — before you design a new wing. Teachers who see a future stay. 2. Second-Rung Leadership: Every school that collapsed after a principal left had one thing in common: no ready deputy. Build your bench while your first rung can still coach them.',
          '3. Post-Admission Parent Trust: Most schools invest in parents only through April. Flip it — make parents feel heard every term, not just when re-enrollment fees are due. 4. Institutional Memory: Culture lives in people, not policies. Structured knowledge transfer — shadowing, mentoring, documented rituals — ensures your culture survives turnover.',
        ],
      },
      {
        heading: 'Action checklist — this quarter',
        paragraphs: [
          'Map your top 10 teachers\' career aspirations. Do you know what each wants to be doing in five years? If not, schedule a 30-minute conversation this month.',
          'Name your second rung today. Who could run the school if your principal left in six months? If you cannot name two people, you have a succession gap. Run a 90-day post-admission parent check-in. Ask: "Is the school you joined the school we described?" The gap between those two answers is your retention risk.',
          'Review your capex-to-culture spend ratio. For every rupee spent on infrastructure last cycle, how much went to teacher development? If below 10:1, rebalance. Document one cultural ritual this month — the assembly format, the way you handle a child\'s first failure — write it down so it outlives any one person.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ISSUE #04
  // ─────────────────────────────────────────────────────────────
  {
    id: 'issue-04',
    issueNumber: 4,
    date: 'May 25, 2026',
    topic: 'School Leadership',
    guest: {
      name: 'Mahesh Balakrishnan',
      title: 'IB Strategist & Education Architect',
    },
    headline: 'You built a great school. You forgot to build what comes after you.',
    subheadline: 'India\'s school succession crisis isn\'t coming. For hundreds of founders, it\'s already here — and most won\'t see it until it\'s too late.',
    episodeUrl: 'https://clarityproject.beehiiv.com',
    thumbnail: '/thumbnails/issue-01-mahesh-balakrishnan.png',
    readTime: '8 min read',
    pullQuotes: [
      {
        quote: 'The founder\'s child returns with an MBA. They meet a 30-year veteran principal. Within 18 months, half the senior staff have quietly moved on. Not because either person was wrong — because nobody built the bridge between them.',
        attribution: 'Mahesh Balakrishnan',
      },
      {
        quote: 'Culture that isn\'t written down is culture that walks out the door.',
        attribution: 'Mahesh Balakrishnan',
      },
    ],
    sections: [
      {
        paragraphs: [
          'The single biggest crisis in Indian school education right now isn\'t curriculum or fees. It isn\'t even teacher shortage — though that\'s real. It\'s succession. Brilliant principals who built institutions from the ground up are retiring. And in most schools, there is no second layer of leadership ready to take over. Not because it wasn\'t possible. Because building that layer felt, gradually, like giving away control.',
          'The schools that come out the other side aren\'t lucky. They made one decision differently: they started building their second layer before they needed it. Section heads. Department leads. A Director of Academics with a clear path to principal. A future, not just a raise, for their best people.',
          'That institutional memory — the values, the culture, the reasons behind every decision — is the one thing no competitor can buy, copy, or build overnight. It lives in your people. Which means it leaves with them too, if you\'re not careful.',
        ],
      },
      {
        heading: 'Same city. Same fees. Five years from now.',
        paragraphs: [
          'School A — got it right: Curriculum with a point of view — national board + IB thinking, not either/or. CP waitlisted — sold as the smart choice, not the safe backup. 7-year average teacher tenure — hiring costs down by half. Two leaders, one vision — founder\'s child and 25-year principal running it as partners. Students talk about school at dinner — parents don\'t need to ask.',
          'School B — didn\'t: ₹120 crore sports complex — 5% of students use it competitively. CP: three takers in Year 1 — launched as "the practical option." Three principals in two years — the founder left without a plan. Grade 8 attrition rising — JEE panic is winning the argument. Parent WhatsApp group very active — at 11pm.',
        ],
      },
      {
        heading: 'The fix',
        paragraphs: [
          'Every school on the right side of that table did four things. None of them are expensive. All of them take time you don\'t think you have.',
          '01. Name someone. Today. Not "we\'ll think about succession planning." A real name, a real role, a real two-year timeline. If it\'s not written down, it doesn\'t exist. 02. Sell your best teachers a future, not just a raise. What does their career look like in Year 5? Year 10? If you can\'t answer that clearly, someone else will — and they\'ll answer it with a job offer.',
          '03. Introduce the next generation before the handover. The transition fails when both sides meet the problem for the first time at the moment of handover. Overlap is everything. Start it three years early, not three months. 04. Write down what you stand for. Not a vision statement. The real stuff — why you hire who you hire, what you never compromise on, the stories new staff should know. Culture that isn\'t written down is culture that walks out the door.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ISSUE #05
  // ─────────────────────────────────────────────────────────────
  {
    id: 'issue-05',
    issueNumber: 5,
    date: 'May 26, 2026',
    topic: 'Admissions Strategy',
    guest: {
      name: 'Mahesh Balakrishnan',
      title: 'IB Strategist & Education Architect',
    },
    headline: 'You\'re probably mis-selling CP. Here\'s the fix.',
    subheadline: 'The IB Career-related Programme isn\'t the consolation prize. Positioning it that way is the single most expensive mistake your admissions team makes.',
    episodeUrl: 'https://clarityproject.beehiiv.com',
    thumbnail: '/thumbnails/issue-01-mahesh-balakrishnan.png',
    readTime: '7 min read',
    pullQuotes: [
      {
        quote: 'The CP isn\'t a lower ceiling. It\'s a different wall. And some students are built to climb that wall much faster.',
        attribution: 'Mahesh Balakrishnan',
      },
      {
        quote: 'If CP can only be defined in relation to the DP, you don\'t have a positioning — you have a footnote.',
        attribution: 'Mahesh Balakrishnan',
      },
    ],
    sections: [
      {
        heading: 'The diagnosis',
        paragraphs: [
          'Walk into almost any IB school\'s admissions conversation and ask how CP gets introduced to a family. Nine times out of ten, you\'ll hear something like: "It\'s similar to the DP, but more practical — a good fit if the full DP feels too intense." Translation for the parent: your child isn\'t DP material.',
          'That single framing — delivered with the best intentions — collapses the programme\'s positioning before the family has had a chance to lean in. No ambitious parent chooses a programme introduced as a fallback. The conversation ends before it begins.',
          '3 core IB components unique to CP that DP students never experience. CP is priced at par with or above DP in most IB schools in India. 0 chances of switching from DP to CP once Year 1 has ended.',
        ],
      },
      {
        heading: 'Two segments, one flawed pitch',
        paragraphs: [
          'Think of your student body as two distinct segments — not by academic ability, but by learning architecture. Segment A learns through abstraction: essays, extended arguments, theorem proofs. Segment B learns through construction: projects, client briefs, real-world problems. The DP was built for Segment A. The CP was built for Segment B. Both segments contain brilliant students. Both produce university-ready graduates. The error is treating one as the premium offering and one as the discount rack.',
          '"Good option if DP feels too heavy" → should be: "Built for students who learn by building and doing." "More practical, less theory-focused" → should be: "Leads to the same universities via a different route." "Similar to DP, but more manageable" → should be: "Includes industry projects no other IB track offers." "Not everyone is suited for 3 HL + 3 SL" → should be: "Reflects how the professional world actually works."',
        ],
      },
      {
        heading: 'The irreversible moment you can\'t afford to miss',
        paragraphs: [
          'There is a structural constraint most school owners underestimate: once a student enters Year 1 of the DP, a switch to CP is not possible. The pedagogies are too different. The internal assessments don\'t transfer. By the time a parent realises their child is struggling in DP — usually after first internals — the window has closed. This makes the admissions conversation a high-stakes, one-time event.',
          'Universities including OP Jindal Global University, Master\'s Union, and the University of Mumbai accept CP graduates. The route is different; the destination is the same.',
        ],
      },
      {
        heading: 'Three things to fix this week',
        paragraphs: [
          '1. Audit your admissions script. Pull up whatever your counsellors say about CP. Read it aloud. Does it sound like an invitation or an apology? Rewrite every sentence that uses the word "but."',
          '2. Train on learning style, not academic tier. The question to ask a prospective family is not "how is your child doing in school?" It\'s "does your child light up when solving a real problem or writing a research paper?" That answer tells you which programme fits.',
          '3. Make the Year 1 lock-in visible, early. Tell every family — before the application — that DP and CP cannot be switched after Year 1 starts. This isn\'t a warning; it\'s a service. Pull up the last three CP conversations your admissions team had with families. Count how many times the word DP was used to explain what CP is. If CP can only be defined in relation to the DP, you don\'t have a positioning — you have a footnote.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────
  // ISSUE #06
  // ─────────────────────────────────────────────────────────────
  {
    id: 'issue-06',
    issueNumber: 6,
    date: 'May 28, 2026',
    topic: 'Student Wellbeing',
    guest: {
      name: 'Mahesh Balakrishnan',
      title: 'IB Strategist & Education Architect',
    },
    headline: 'Does your child want to come to school tomorrow?',
    subheadline: 'Most school founders track board results, JEE numbers, trophies, and fee collection. Those things matter. But they are the result of something deeper.',
    episodeUrl: 'https://clarityproject.beehiiv.com',
    thumbnail: '/thumbnails/issue-01-mahesh-balakrishnan.png',
    readTime: '6 min read',
    pullQuotes: [
      {
        quote: 'One question predicts everything: does your child want to come to school tomorrow? Their answer — or their silence — is your most honest performance metric.',
        attribution: 'Mahesh Balakrishnan',
      },
      {
        quote: 'Fear kills learning faster than any bad teacher. A child who is afraid to raise their hand stops trying. A child who stops trying stops learning.',
        attribution: 'Mahesh Balakrishnan',
      },
    ],
    sections: [
      {
        paragraphs: [
          'The thing that drives all of them? A child who wakes up and actually wants to go to school. A child who feels safe, curious, and like themselves when they\'re there. That one feeling — hard to measure, easy to sense — predicts almost everything else.',
        ],
      },
      {
        heading: 'Schools are measuring the wrong things',
        paragraphs: [
          'Ask parents why they pulled their child out in Grade 8. Rarely is it fees. More often it\'s: "He just didn\'t want to go anymore." Or: "She was scared of being wrong." Fear kills learning faster than any bad teacher. A child who is afraid to raise their hand stops trying. A child who stops trying stops learning. A child who stops learning becomes a number on your dropout sheet.',
          'What most schools track: board toppers per batch, JEE selections count, fee collection rate, enquiry-to-admission %, trophy cabinet volume. What actually predicts results: Does my child talk about school? Did they ask real questions today? Are they afraid of being wrong? Do they feel like themselves here? Would they bring a friend? The left column is what you see in the rearview mirror. The right column is the road ahead.',
        ],
      },
      {
        heading: 'The business case',
        paragraphs: [
          'Parents who enrolled in 2020 are deciding right now whether to stay for Grade 9. They are not looking at your new building. They are watching their child at dinner. If the child talks about school — a teacher who said something funny, a project that got them thinking — the family stays. If the child is quiet and tired, they start looking at other schools.',
          '3× more likely to re-enrol when child enjoys school. ₹0 cost of a sibling referral from a happy family. 40% drop in student anxiety at mindfulness-integrated schools. Happy students bring their siblings. Happy students become alumni who say things about your school that no ad budget can buy. The values case and the business case are the same case.',
        ],
      },
      {
        heading: 'Who\'s doing it right',
        paragraphs: [
          'A school in Dubai gives students real city problems to solve — not as a side project, but as the actual point of coming to school. Students stop asking "why do I need to learn this?" because the answer is right in front of them. Engagement isn\'t a programme. It\'s the whole model.',
          'Mindfulness-integrated schools — that add yoga, play-based learning, and reflection to the regular timetable, not as a once-a-term wellness day — are seeing students who are calmer, more focused, and more willing to try things. Teachers notice it first, before any test result does.',
        ],
      },
      {
        heading: 'Try this this week: the five-student test',
        paragraphs: [
          'Pick five students at random — different grades, different types. Ask them one question: "What\'s something from school this week that you told someone at home about?"',
          'If they answer easily — you\'re on the right track. If they go quiet, that silence is telling you something a report never will.',
        ],
      },
    ],
  },
]
