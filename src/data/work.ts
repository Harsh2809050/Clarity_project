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
  pullQuotes: Array<{ quote: string; attribution: string }>
  sections: WorkSection[]
}

export const workIssues: WorkIssue[] = [
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
    episodeUrl: 'https://clarityproject.in/archive',
    pullQuotes: [
      {
        quote:
          'The building doesn\'t teach children. People do. Every rupee you put into marble flooring is a rupee you took away from the person standing in the classroom.',
        attribution: 'Mahesh Balakrishnan',
      },
      {
        quote:
          'The salary offer doesn\'t create the decision to leave. It just makes it possible to act on a decision the teacher made six months ago.',
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
          'The school\'s reaction at this point is almost always the same. They try to counter-offer. Sometimes they succeed in keeping the person for another year, which usually means they lose them anyway when the underlying grievances are not addressed. More often the counter-offer fails, because by the time a teacher is actively interviewing, they have moved on psychologically. The school then congratulates itself on being competitive with its counter-offer, as though the problem was ever just the salary.',
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
          'In the schools that bleed people, there is no such ladder. A teacher joins and the ceiling is immediately visible: you are a teacher until you decide to become something else entirely, at another institution. The most ambitious people see this very quickly. They stay for two or three years, build their skills and their resume, and leave for something that will give them a title and a trajectory. The school has essentially been subsidising their professional development for the benefit of a competitor.',
          'The schools getting this right have also figured out something about training. Rather than hiring teachers who already have IB certification or international credentials — at a premium, often from a school that trained them — they build their own pipeline. They identify teachers early. They co-fund professional development. They run internal cross-training programmes that move teachers across year groups and subjects, making them more versatile and more invested in the institution. The teacher who has been developed by a school does not carry the same flight risk as the one who arrived fully formed and could just as easily fly somewhere else.',
        ],
      },
      {
        heading: 'India\'s best teachers are now a global export',
        paragraphs: [
          'The competitive landscape has changed in a way that most Indian school administrators have not fully internalised. English-speaking, well-trained Indian educators are in active demand across international school systems in the Gulf, Southeast Asia, and sub-Saharan Africa. Institutions in Dubai, Doha, Singapore, and Nairobi are running structured recruitment campaigns. The packages they offer are not slightly better than what a mid-sized Indian school pays. They are categorically different: tax-free salaries, accommodation allowances, international experience, and the status of teaching in a genuinely global environment.',
          'A teacher earning ₹55,000 a month at a respected school in Chennai is one LinkedIn message away from a conversation with a Dubai recruiter offering the equivalent of ₹1.5 lakh a month, housing included, in a school serving students from forty countries. This is not a hypothetical. It is happening at scale, and it has been accelerating since 2022.',
          'The schools that are losing people to this pipeline are not the mediocre ones. They are the good ones — the schools that invested in training their faculty, that built reputations for academic quality, that attracted the ambitious teacher in the first place. Their investment is being harvested by international institutions with deeper pockets and a clearer value proposition. Mahesh\'s point is not that Indian schools should or can match Gulf salaries. It is that they need to understand that they are in a global competition whether they choose to be or not, and that "passion for the mission" is not a retention strategy.',
        ],
      },
      {
        heading: 'What the data does not capture — and why that is the real problem',
        paragraphs: [
          'One of the most frustrating aspects of teacher attrition in Indian schools is that almost no one is measuring it seriously. Hospitals measure staff turnover. IT companies measure it obsessively and build entire HR functions around reducing it. Schools, including expensive private ones, often have no formal system for tracking how long teachers stay, why they leave, or what the aggregate departure pattern looks like across departments and year groups.',
          'Mahesh describes exit interviews that consist of a single HR form and a brief conversation that no one analyses afterwards. He describes schools where the finance team can tell you the exact cost of the new gymnasium but cannot tell you what teacher turnover cost the institution last year. This is not incidental. It reflects a deeper assumption embedded in how schools are managed: that teachers are an operating expense to be optimised, not an asset to be developed and retained.',
          'The schools that have genuinely solved this problem have made one fundamental shift in how they think. They have decided that a great teacher who stays for a decade is worth more than almost any other institutional investment — more than the new building, more than the external ranking, more than the admissions consultant. They track tenure and attrition the way a serious business tracks its best customers. They do exit interviews properly and they actually change things based on what they hear. And they have leaders who understand that the trust a teacher has built with fifty families over seven years cannot be replicated by a hiring process, no matter how well-designed.',
          'India has a curriculum debate, a technology debate, a policy debate. What it largely does not have is a serious public conversation about the people who actually execute on all of it — the teachers who show up every morning, manage thirty students in a room, and build the relationships that determine whether any of it works. Mahesh\'s argument is simple: fix that problem first. Everything else is secondary.',
        ],
      },
    ],
  },
]
