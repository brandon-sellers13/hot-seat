/**
 * Arbor Systems, Q3 2026. Falsification prototype data.
 *
 * Two rules govern this file.
 *
 * SOURCE-ORGANISED, NOT METRIC-ORGANISED. Sections are named after the systems
 * a company actually keeps records in, never after the metrics derived from
 * them. There is no "Retention" tab. Knowing that retention inputs live in
 * subscription movements and cohort records is the knowledge under test, and
 * labelling a tab "NRR" would hand it over.
 *
 * NO DERIVED METRIC IS EVER PRINTED for anything a question asks to compute.
 * The inputs are present, the answer is not.
 *
 * Distractors are deliberate: wrong period, wrong segment, wrong basis, wrong
 * population. A player who does not know which basis a metric wants will find
 * several plausible numbers and no way to choose between them.
 */

export const COMPANY = {
  name: 'Arbor Systems',
  period: 'Q3 2026 (1 July - 30 September)',
  model: 'B2B SaaS, annual contracts'
}

export const SECTIONS = [
  {
    id: 'billing',
    label: 'Billing & subscriptions',
    blurb: 'Subscription movement, plan mix and invoicing, from the billing system.',
    tables: [
      {
        title: 'ARR movement, Q3, existing customers as at 1 July',
        note: 'Movements against customers already on contract at the start of the quarter. New business is recorded separately.',
        head: ['Movement', 'ARR'],
        rows: [
          ['Expansion (upgrades, seat growth)', '$912,000'],
          ['Contraction (downgrades, seat reduction)', '$228,000'],
          ['Churn (full cancellation)', '$456,000']
        ]
      },
      {
        title: 'MRR movement by month, all customers',
        note: 'Monthly basis. Includes new business.',
        head: ['Month', 'New', 'Expansion', 'Contraction', 'Churn', 'Ending MRR'],
        rows: [
          ['July', '$34,000', '$26,000', '$6,500', '$13,000', '$990,500'],
          ['August', '$35,000', '$25,000', '$7,000', '$14,000', '$1,029,500'],
          ['September', '$36,000', '$25,000', '$5,500', '$11,000', '$1,074,000']
        ]
      },
      {
        title: 'Plan mix at 30 September',
        head: ['Plan', 'Accounts', 'List price / yr'],
        rows: [
          ['Enterprise', '44', '$150,000'],
          ['Growth', '121', '$30,000'],
          ['Starter', '297', '$6,000']
        ]
      },
      {
        title: 'Accounts receivable ageing at 30 September',
        note: 'Collections status. Not a measure of retention.',
        head: ['Bucket', 'Balance'],
        rows: [
          ['Current', '$742,000'],
          ['1-30 days', '$186,000'],
          ['31-60 days', '$54,000'],
          ['60+ days', '$21,000']
        ]
      }
    ]
  },
  {
    id: 'cohorts',
    label: 'Customer cohorts',
    blurb: 'Account populations by segment and tenure, from the customer master.',
    tables: [
      {
        title: 'Customer base at 1 July 2026 (opening cohort)',
        note: 'Paying accounts on contract at the start of the quarter.',
        head: ['Segment', 'Accounts', 'ARR'],
        rows: [
          ['Enterprise', '42', '$6,300,000'],
          ['Mid-market', '118', '$3,540,000'],
          ['SMB', '260', '$1,560,000'],
          ['Total', '420', '$11,400,000']
        ]
      },
      {
        title: 'Opening cohort outcomes during Q3',
        head: ['Segment', 'Fully cancelled', 'Downgraded but retained', 'Still active at 30 Sep'],
        rows: [
          ['Enterprise', '1', '3', '41'],
          ['Mid-market', '6', '9', '112'],
          ['SMB', '14', '11', '246'],
          ['Total', '21', '23', '399']
        ]
      },
      {
        title: 'Account population at 30 September',
        note: 'Includes accounts acquired during the quarter.',
        head: ['Population', 'Count'],
        rows: [
          ['Paying accounts', '462'],
          ['Free trials in flight', '38'],
          ['Sandbox and internal', '7'],
          ['All accounts on platform', '507']
        ]
      },
      {
        title: 'Tenure distribution of paying accounts at 30 September',
        head: ['Tenure', 'Accounts'],
        rows: [
          ['Under 3 months', '63'],
          ['3-12 months', '104'],
          ['1-2 years', '158'],
          ['Over 2 years', '137']
        ]
      }
    ]
  },
  {
    id: 'revenue',
    label: 'Revenue & margin',
    blurb: 'Recognised revenue, cost of revenue and deferred balances, from the ledger.',
    tables: [
      {
        title: 'Recognised revenue and cost of revenue',
        head: ['Month', 'Recognised revenue', 'Cost of revenue'],
        rows: [
          ['July', '$985,000', '$246,250'],
          ['August', '$1,002,000', '$250,500'],
          ['September', '$1,021,000', '$255,250']
        ]
      },
      {
        title: 'Billings and deferred revenue',
        note: 'Billed is cash invoiced, not revenue. Annual contracts bill up front.',
        head: ['Month', 'Billed', 'Deferred revenue balance'],
        rows: [
          ['July', '$1,410,000', '$4,120,000'],
          ['August', '$1,168,000', '$4,286,000'],
          ['September', '$1,502,000', '$4,767,000']
        ]
      },
      {
        title: 'Operating expense, Q3',
        head: ['Line', 'Amount'],
        rows: [
          ['Research and development', '$742,000'],
          ['Sales and marketing', '$1,584,000'],
          ['General and administrative', '$486,000']
        ]
      }
    ]
  },
  {
    id: 'acquisition',
    label: 'Acquisition & funnel',
    blurb: 'Spend, pipeline and new business by channel, from the CRM and ad platforms.',
    tables: [
      {
        title: 'Sales and marketing spend, Q3',
        note: 'Total ties to the sales and marketing line in operating expense.',
        head: ['Line', 'Q3 spend'],
        rows: [
          ['Paid media', '$432,000'],
          ['Partner and channel fees', '$216,000'],
          ['Content and organic', '$144,000'],
          ['Sales salaries and commission', '$576,000'],
          ['Tools and data', '$216,000'],
          ['Total', '$1,584,000']
        ]
      },
      {
        title: 'New business won in Q3, by channel',
        note: 'Accounts that were not customers at 1 July.',
        head: ['Channel', 'New accounts', 'New ARR'],
        rows: [
          ['Paid media', '24', '$432,000'],
          ['Partner referral', '18', '$540,000'],
          ['Organic and inbound', '21', '$288,000'],
          ['Total', '63', '$1,260,000']
        ]
      },
      {
        title: 'Funnel volumes, Q3',
        head: ['Channel', 'Leads', 'Qualified', 'Opportunities', 'Closed won'],
        rows: [
          ['Paid media', '4,820', '712', '188', '24'],
          ['Partner referral', '340', '204', '96', '18'],
          ['Organic and inbound', '2,150', '486', '134', '21']
        ]
      }
    ]
  },
  {
    id: 'product',
    label: 'Product activity',
    blurb: 'Usage and onboarding events, from the product analytics warehouse.',
    tables: [
      {
        title: 'Active accounts',
        head: ['Month', 'Weekly active', 'Monthly active'],
        rows: [
          ['July', '298', '389'],
          ['August', '312', '404'],
          ['September', '321', '418']
        ]
      },
      {
        title: 'Onboarding, by month of account start',
        note: 'Activated means one production workflow completed within 14 days of start.',
        head: ['Start month', 'New accounts', 'Activated within 14 days'],
        rows: [
          ['July', '19', '13'],
          ['August', '28', '21'],
          ['September', '16', '10']
        ]
      },
      {
        title: 'Feature adoption at 30 September',
        head: ['Feature', 'Accounts using'],
        rows: [
          ['Scheduled reports', '284'],
          ['API access', '141'],
          ['Single sign-on', '96']
        ]
      }
    ]
  },
  {
    id: 'support',
    label: 'Support & service',
    blurb: 'Ticket volume and service levels, from the helpdesk.',
    tables: [
      {
        title: 'Support volume, Q3',
        head: ['Month', 'Tickets', 'Median first response', 'CSAT'],
        rows: [
          ['July', '412', '2.4 h', '4.5'],
          ['August', '447', '2.9 h', '4.4'],
          ['September', '469', '3.3 h', '4.2']
        ]
      },
      {
        title: 'Escalations, Q3',
        head: ['Severity', 'Count', 'Median time to resolve'],
        rows: [
          ['Critical', '7', '5.1 h'],
          ['High', '31', '19 h'],
          ['Normal', '188', '3.2 d']
        ]
      }
    ]
  }
]

/**
 * The twelve questions.
 *
 * Every one is a question a director would actually ask. An earlier draft split
 * these into "retrieval" and "computation", which was a design error: nobody in
 * a board meeting asks you to look up a number in isolation. They ask about the
 * business, and looking something up is a step inside the answer. Worse, that
 * split produced questions like "how many customers did we have", which is a
 * lookup exercise wearing a metric's clothes and made the first thing a player
 * saw the least interesting thing in the game.
 *
 * Retrieval skill is still measured. It is measured from the navigation log,
 * which shows which sections were opened and how quickly, and that is a better
 * instrument than asking about it directly.
 *
 * `span` is how many source sections a correct answer requires. It predicts
 * difficulty far better than any label, because crossing sections is exactly
 * what you cannot do without knowing where a metric's inputs live.
 *
 * `sources` is never shown to the player. It exists so the log can say whether
 * they went straight there or hunted.
 */
export const QUESTIONS = [
  { id: 'Q1', span: 2, unit: 'pct', answer: 102.0, tol: 0.3,
    q: 'Start with retention. What was our net revenue retention this quarter?',
    sources: ['cohorts', 'billing'],
    trap: 'The opening cohort is in one section and the movements against it in another. New business must be excluded, or you are reporting a growth rate.' },

  { id: 'Q2', span: 2, unit: 'pct', answer: 94.0, tol: 0.3,
    q: 'And gross retention, before any expansion?',
    sources: ['cohorts', 'billing'],
    trap: 'Expansion comes out entirely. Anyone who leaves it in returns the NRR figure again.' },

  { id: 'Q3', span: 2, unit: 'usd', answer: 1488000, tol: 20000,
    q: 'What was net new ARR for the quarter?',
    sources: ['billing', 'acquisition'],
    trap: 'New business plus expansion, less contraction and churn. New ARR alone is gross, not net.' },

  { id: 'Q4', span: 3, unit: 'usd', answer: 12888000, tol: 150000,
    q: 'Where did we exit the quarter on ARR?',
    sources: ['cohorts', 'billing', 'acquisition'],
    trap: 'Opening, plus every movement, plus new business. The ending cohort figure excludes new customers and is the most common wrong answer.' },

  { id: 'Q5', span: 2, unit: 'ratio', answer: 3.18, tol: 0.08,
    q: 'What is our quick ratio?',
    sources: ['billing', 'acquisition'],
    trap: 'New and expansion over contraction and churn. New ARR sits in acquisition, the rest in billing.' },

  { id: 'Q6', span: 1, unit: 'pct', answer: 5.0, tol: 0.2,
    q: 'How many customers did we actually lose, as a rate?',
    sources: ['cohorts'],
    trap: 'Denominator is the opening cohort. Downgraded-but-retained accounts are not churn.' },

  { id: 'Q7', span: 2, unit: 'pct', answer: 42.0, tol: 1.0,
    q: 'What share of our growth came from existing customers rather than new ones?',
    sources: ['billing', 'acquisition'],
    trap: 'Expansion against expansion plus new ARR. A board asks this to find out whether growth is bought or earned.' },

  { id: 'Q8', span: 1, unit: 'usd', answer: 18000, tol: 300,
    q: 'What are we paying to acquire a customer through paid media?',
    sources: ['acquisition'],
    trap: 'Paid media spend against paid media accounts only. Using total spend gives blended, which is a different number and a different argument.' },

  { id: 'Q9', span: 1, unit: 'usd', answer: 25143, tol: 600,
    q: 'And blended, across everything we spend?',
    sources: ['acquisition'],
    trap: 'All sales and marketing spend, including salaries and tools, against every new customer.' },

  { id: 'Q10', span: 1, unit: 'pct', answer: 75.0, tol: 0.5,
    q: 'What is our gross margin?',
    sources: ['revenue'],
    trap: 'Revenue less cost of revenue, over revenue. Billed is not revenue.' },

  { id: 'Q11', span: 2, unit: 'months', answer: 16.0, tol: 0.7,
    q: 'How long does paid media take to pay back, on a gross margin basis?',
    sources: ['acquisition', 'revenue'],
    trap: 'Gross margin is not printed anywhere. It has to be derived in another section first, which is what makes this the hardest question here.' },

  { id: 'Q12', span: 1, unit: 'pct', answer: 75.0, tol: 1.0,
    q: 'Of the accounts that started in August, what share got to first value?',
    sources: ['product'],
    trap: 'Activated within the stated window, against that month\'s starts. Not against all new accounts for the quarter.' }
]
