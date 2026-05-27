export interface WorkInsight {
  heading: string
  body: string
}

export interface WorkIssue {
  id: string
  issueNumber: number
  date: string
  topic: string
  guest: { name: string; title: string }
  headline: string
  subheadline: string
  hook: string
  storyBlock?: Array<{ month: string; text: string }>
  callout?: { label: string; value: string; description: string }
  insights: WorkInsight[]
  pullQuote: string
  quoteAttribution: string
  takeaway: string
  episodeUrl: string
  image: string
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
    hook: `Teacher attrition is the single most expensive, most ignored, and most fixable problem in Indian schools today. Every other problem — leadership gaps, curriculum quality, student happiness, parent trust — traces back to this one. In this conversation, Mahesh Balakrishnan breaks down why the best schools in India are haemorrhaging their best people, and what the schools that actually get this right are doing differently.`,
    storyBlock: [
      { month: 'February', text: 'A teacher quietly updates their resume.' },
      { month: 'March', text: 'A competitor calls with a 45% salary offer.' },
      { month: 'April', text: 'They hand in their resignation.' },
      { month: 'May', text: 'The school posts a job listing and starts over.' },
    ],
    callout: {
      label: 'The real cost of one departure',
      value: '₹8 – ₹20 lakh',
      description:
        "Recruitment fees + onboarding + IB training + year-one productivity gap + parent withdrawals. Nobody budgets for this. That’s why it keeps happening.",
    },
    insights: [
      {
        heading: 'It\'s not always the salary — it\'s everything the salary represents',
        body: `When a teacher accepts a 45% raise from a competitor, the salary offer was the permission slip for a decision they'd already made. No career path. No recognition. New management that made them prove themselves all over again. KPIs rolled out without explanation. The money just made it easy to leave. Mahesh's point is sharp: if you're losing people to better pay, ask what the pay symbolised. Almost every time, it symbolises respect — and that's far cheaper to fix than the cost of the departure.`,
      },
      {
        heading: 'Schools that keep teachers for 7+ years do one thing differently',
        body: `They build internal career ladders. Class teacher → section head → department lead → director of academics. They run cross-training programmes instead of poaching pre-certified talent. They involve teachers in decisions before announcing them. The loyalty of a teacher you grew is worth more than the credentials of one you hired away from someone else. Mahesh calls this "institutional compounding" — every year a great teacher stays, the returns on your initial investment multiply. Every time they leave, you pay the full onboarding cost again from zero.`,
      },
      {
        heading: 'Indian teachers are now a global export — whether you like it or not',
        body: `English-speaking, well-trained Indian educators are being actively recruited by international schools in Dubai, Singapore, and across Southeast Asia and Africa. A school that doesn't invest in its people is no longer competing with the school down the road. It's competing with a tax-free salary package in Abu Dhabi. Mahesh's advice: if your school relies on goodwill and passion to keep people, you are one Emirates Airlines email away from losing your best teacher.`,
      },
    ],
    pullQuote: 'The building doesn\'t teach children. People do.',
    quoteAttribution: 'Mahesh Balakrishnan, IB Strategist & Education Architect',
    takeaway: `India doesn't have a curriculum crisis. It has a people crisis. The schools that solve it first — by treating teachers like the asset they are, not the cost they appear to be — will own the next decade.`,
    episodeUrl: 'https://clarityproject.in/archive',
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&h=675&q=80',
  },
]
