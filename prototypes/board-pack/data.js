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
          ['July', '$34,000', '$26,000', '$6,500', '$13,000', '$975,500'],
          ['August', '$36,000', '$25,000', '$7,000', '$14,000', '$1,015,500'],
          ['September', '$35,000', '$25,000', '$6,500', '$11,000', '$1,058,000']
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
 * `sources` lists the sections a correct answer actually requires. It is never
 * shown to the player; it exists so the log can tell us whether they went
 * straight there or hunted, which is the entire measurement.
 */
export const QUESTIONS = [
  // --- Retrieval: the figure is present, but several plausible ones are too ---
  { id: 'R1', kind: 'retrieval', targetSec: 20, unit: 'count', answer: 420, tol: 0,
    q: 'How many paying customers did we have at the start of the quarter?',
    sources: ['cohorts'],
    trap: 'Ending count (462), all accounts including trials (507), and new accounts (63) are all present.' },

  { id: 'R2', kind: 'retrieval', targetSec: 20, unit: 'usd', answer: 6300000, tol: 0,
    q: 'What was Enterprise ARR at the start of the quarter?',
    sources: ['cohorts'],
    trap: 'Requires picking the segment and the opening date, not the plan-mix list price.' },

  { id: 'R3', kind: 'retrieval', targetSec: 20, unit: 'usd', answer: 432000, tol: 0,
    q: 'What did we spend on paid media in Q3?',
    sources: ['acquisition'],
    trap: 'Total S&M is $1,584,000. Sales salaries are the largest single line.' },

  { id: 'R4', kind: 'retrieval', targetSec: 20, unit: 'usd', answer: 1260000, tol: 0,
    q: 'How much new ARR did we add from new customers in Q3?',
    sources: ['acquisition'],
    trap: 'Expansion ARR of $912,000 is not new business.' },

  { id: 'R5', kind: 'retrieval', targetSec: 20, unit: 'count', answer: 21, tol: 0,
    q: 'How many accounts from the opening cohort cancelled outright during Q3?',
    sources: ['cohorts'],
    trap: 'Downgraded-but-retained (23) sits in the adjacent column.' },

  { id: 'R6', kind: 'retrieval', targetSec: 20, unit: 'usd', answer: 1021000, tol: 0,
    q: 'What was recognised revenue in September?',
    sources: ['revenue'],
    trap: 'September billings were $1,502,000. Billed is not recognised.' },

  // --- Computation: inputs present, answer absent, formula must be known ---
  { id: 'C1', kind: 'computation', targetSec: 40, unit: 'pct', answer: 102.0, tol: 0.3,
    q: 'What was our net revenue retention for Q3? Answer as a percentage.',
    sources: ['cohorts', 'billing'],
    trap: 'Opening cohort ARR is in one section, the movements against it in another. New business must be excluded.' },

  { id: 'C2', kind: 'computation', targetSec: 40, unit: 'pct', answer: 94.0, tol: 0.3,
    q: 'What was our gross revenue retention for Q3? Answer as a percentage.',
    sources: ['cohorts', 'billing'],
    trap: 'Expansion must be excluded entirely. Anyone who includes it returns the NRR figure.' },

  { id: 'C3', kind: 'computation', targetSec: 40, unit: 'pct', answer: 5.0, tol: 0.2,
    q: 'What was our logo churn rate for Q3? Answer as a percentage.',
    sources: ['cohorts'],
    trap: 'Denominator is the opening cohort, not the ending or all-accounts population.' },

  { id: 'C4', kind: 'computation', targetSec: 40, unit: 'usd', answer: 18000, tol: 200,
    q: 'What was our customer acquisition cost for the paid media channel in Q3?',
    sources: ['acquisition'],
    trap: 'Must use paid media spend against paid media accounts only, not blended.' },

  { id: 'C5', kind: 'computation', targetSec: 40, unit: 'months', answer: 16.0, tol: 0.6,
    q: 'What is CAC payback for the paid media channel, in months, on a gross-margin basis?',
    sources: ['acquisition', 'revenue'],
    trap: 'Gross margin is not printed. It must be derived from revenue and cost of revenue in another section.' },

  { id: 'C6', kind: 'computation', targetSec: 40, unit: 'ratio', answer: 3.18, tol: 0.08,
    q: 'What was our SaaS quick ratio for Q3?',
    sources: ['billing', 'acquisition'],
    trap: 'New ARR sits in acquisition; expansion, contraction and churn sit in billing.' }
]
