/**
 * Arbor Systems, Q3 2026. The demo company pack.
 *
 * Source-organised: sections are named after the systems a company keeps
 * records in, never after the metrics derived from them. There is no
 * "Retention" tab, because knowing that retention inputs live in subscription
 * movements and cohort records is the knowledge under test.
 *
 * Headline metrics ARE printed. The board holds the packet and already knows
 * NRR; what gets worked out in the room is the adjustment, the decomposition,
 * or the cut nobody put on a slide.
 */
export const COMPANY = {
  "name": "Arbor Systems",
  "period": "Q3 2026 (1 July - 30 September)",
  "model": "B2B SaaS, annual contracts"
}

export const SECTIONS = [
  {
    "id": "billing",
    "label": "Billing & subscriptions",
    "blurb": "Subscription movement, plan mix and invoicing, from the billing system.",
    "tables": [
      {
        "title": "Board summary, Q3",
        "note": "The figures the board reads before the meeting.",
        "head": [
          "Metric",
          "Q3",
          "Prior quarter"
        ],
        "rows": [
          [
            "Net revenue retention",
            "102%",
            "105%"
          ],
          [
            "Gross revenue retention",
            "94%",
            "95%"
          ],
          [
            "Ending ARR",
            "$12,888,000",
            "$11,400,000"
          ],
          [
            "Gross margin",
            "75%",
            "76%"
          ],
          [
            "CAC payback, paid media",
            "16.0 months",
            "13.2 months"
          ]
        ]
      },
      {
        "title": "Board-approved targets, FY26",
        "note": "The thresholds this board has agreed. A director quoting a bar is quoting one of these.",
        "head": ["Measure","Target"],
        "rows": [
          ["Net revenue retention","110%"],
          ["Gross revenue retention","92%"],
          ["CAC payback, any channel","18 months or better"],
          ["Gross margin","75% or better"],
          ["Quarterly net new ARR","$1,400,000"]
        ]
      },
      {
        "title": "ARR movement, Q3, existing customers as at 1 July",
        "note": "Movements against customers already on contract at the start of the quarter. New business is recorded separately.",
        "head": [
          "Movement",
          "ARR"
        ],
        "rows": [
          [
            "Expansion (upgrades, seat growth)",
            "$912,000"
          ],
          [
            "Contraction (downgrades, seat reduction)",
            "$228,000"
          ],
          [
            "Churn (full cancellation)",
            "$456,000"
          ]
        ]
      },
      {
        "title": "MRR movement by month, all customers",
        "note": "Monthly basis. Includes new business.",
        "head": [
          "Month",
          "New",
          "Expansion",
          "Contraction",
          "Churn",
          "Ending MRR"
        ],
        "rows": [
          [
            "July",
            "$34,000",
            "$26,000",
            "$6,500",
            "$13,000",
            "$990,500"
          ],
          [
            "August",
            "$35,000",
            "$25,000",
            "$7,000",
            "$14,000",
            "$1,029,500"
          ],
          [
            "September",
            "$36,000",
            "$25,000",
            "$5,500",
            "$11,000",
            "$1,074,000"
          ]
        ]
      },
      {
        "title": "Plan mix at 30 September",
        "head": [
          "Plan",
          "Accounts",
          "List price / yr"
        ],
        "rows": [
          [
            "Enterprise",
            "44",
            "$150,000"
          ],
          [
            "Growth",
            "121",
            "$30,000"
          ],
          [
            "Starter",
            "297",
            "$6,000"
          ]
        ]
      },
      {
        "title": "Accounts receivable ageing at 30 September",
        "note": "Collections status. Not a measure of retention.",
        "head": [
          "Bucket",
          "Balance"
        ],
        "rows": [
          [
            "Current",
            "$742,000"
          ],
          [
            "1-30 days",
            "$186,000"
          ],
          [
            "31-60 days",
            "$54,000"
          ],
          [
            "60+ days",
            "$21,000"
          ]
        ]
      }
    ]
  },
  {
    "id": "cohorts",
    "label": "Customer cohorts",
    "blurb": "Account populations by segment and tenure, from the customer master.",
    "tables": [
      {
        "title": "Customer base at 1 July 2026 (opening cohort)",
        "note": "Paying accounts on contract at the start of the quarter.",
        "head": [
          "Segment",
          "Accounts",
          "ARR"
        ],
        "rows": [
          [
            "Enterprise",
            "42",
            "$6,300,000"
          ],
          [
            "Mid-market",
            "118",
            "$3,540,000"
          ],
          [
            "SMB",
            "260",
            "$1,560,000"
          ],
          [
            "Total",
            "420",
            "$11,400,000"
          ]
        ]
      },
      {
        "title": "Opening cohort outcomes during Q3",
        "head": [
          "Segment",
          "Fully cancelled",
          "Downgraded but retained",
          "Still active at 30 Sep"
        ],
        "rows": [
          [
            "Enterprise",
            "1",
            "3",
            "41"
          ],
          [
            "Mid-market",
            "6",
            "9",
            "112"
          ],
          [
            "SMB",
            "14",
            "11",
            "246"
          ],
          [
            "Total",
            "21",
            "23",
            "399"
          ]
        ]
      },
      {
        "title": "Account population at 30 September",
        "note": "Includes accounts acquired during the quarter.",
        "head": [
          "Population",
          "Count"
        ],
        "rows": [
          [
            "Paying accounts",
            "462"
          ],
          [
            "Free trials in flight",
            "38"
          ],
          [
            "Sandbox and internal",
            "7"
          ],
          [
            "All accounts on platform",
            "507"
          ]
        ]
      },
      {
        "title": "Tenure distribution of paying accounts at 30 September",
        "head": [
          "Tenure",
          "Accounts"
        ],
        "rows": [
          [
            "Under 3 months",
            "63"
          ],
          [
            "3-12 months",
            "104"
          ],
          [
            "1-2 years",
            "158"
          ],
          [
            "Over 2 years",
            "137"
          ]
        ]
      }
    ]
  },
  {
    "id": "revenue",
    "label": "Revenue & margin",
    "blurb": "Recognised revenue, cost of revenue and deferred balances, from the ledger.",
    "tables": [
      {
        "title": "Recognised revenue and cost of revenue",
        "head": [
          "Month",
          "Recognised revenue",
          "Cost of revenue"
        ],
        "rows": [
          [
            "July",
            "$985,000",
            "$246,250"
          ],
          [
            "August",
            "$1,002,000",
            "$250,500"
          ],
          [
            "September",
            "$1,021,000",
            "$255,250"
          ]
        ]
      },
      {
        "title": "Billings and deferred revenue",
        "note": "Billed is cash invoiced, not revenue. Annual contracts bill up front.",
        "head": [
          "Month",
          "Billed",
          "Deferred revenue balance"
        ],
        "rows": [
          [
            "July",
            "$1,410,000",
            "$4,120,000"
          ],
          [
            "August",
            "$1,168,000",
            "$4,286,000"
          ],
          [
            "September",
            "$1,502,000",
            "$4,767,000"
          ]
        ]
      },
      {
        "title": "Operating expense, Q3",
        "head": [
          "Line",
          "Amount"
        ],
        "rows": [
          [
            "Research and development",
            "$742,000"
          ],
          [
            "Sales and marketing",
            "$1,584,000"
          ],
          [
            "General and administrative",
            "$486,000"
          ]
        ]
      }
    ]
  },
  {
    "id": "acquisition",
    "label": "Acquisition & funnel",
    "blurb": "Spend, pipeline and new business by channel, from the CRM and ad platforms.",
    "tables": [
      {
        "title": "Sales and marketing spend, Q3",
        "note": "Total ties to the sales and marketing line in operating expense.",
        "head": [
          "Line",
          "Q3 spend"
        ],
        "rows": [
          [
            "Paid media",
            "$432,000"
          ],
          [
            "Partner and channel fees",
            "$216,000"
          ],
          [
            "Content and organic",
            "$144,000"
          ],
          [
            "Sales salaries and commission",
            "$576,000"
          ],
          [
            "Tools and data",
            "$216,000"
          ],
          [
            "Total",
            "$1,584,000"
          ]
        ]
      },
      {
        "title": "New business won in Q3, by channel",
        "note": "Accounts that were not customers at 1 July.",
        "head": [
          "Channel",
          "New accounts",
          "New ARR"
        ],
        "rows": [
          [
            "Paid media",
            "24",
            "$432,000"
          ],
          [
            "Partner referral",
            "18",
            "$540,000"
          ],
          [
            "Organic and inbound",
            "21",
            "$288,000"
          ],
          [
            "Total",
            "63",
            "$1,260,000"
          ]
        ]
      },
      {
        "title": "Funnel volumes, Q3",
        "head": [
          "Channel",
          "Leads",
          "Qualified",
          "Opportunities",
          "Closed won"
        ],
        "rows": [
          [
            "Paid media",
            "4,820",
            "712",
            "188",
            "24"
          ],
          [
            "Partner referral",
            "340",
            "204",
            "96",
            "18"
          ],
          [
            "Organic and inbound",
            "2,150",
            "486",
            "134",
            "21"
          ]
        ]
      }
    ]
  },
  {
    "id": "product",
    "label": "Product activity",
    "blurb": "Usage and onboarding events, from the product analytics warehouse.",
    "tables": [
      {
        "title": "Active accounts",
        "head": [
          "Month",
          "Weekly active",
          "Monthly active"
        ],
        "rows": [
          [
            "July",
            "298",
            "389"
          ],
          [
            "August",
            "312",
            "404"
          ],
          [
            "September",
            "321",
            "418"
          ]
        ]
      },
      {
        "title": "Onboarding, by month of account start",
        "note": "Activated means one production workflow completed within 14 days of start.",
        "head": [
          "Start month",
          "New accounts",
          "Activated within 14 days"
        ],
        "rows": [
          [
            "July",
            "19",
            "13"
          ],
          [
            "August",
            "28",
            "21"
          ],
          [
            "September",
            "16",
            "10"
          ]
        ]
      },
      {
        "title": "Feature adoption at 30 September",
        "head": [
          "Feature",
          "Accounts using"
        ],
        "rows": [
          [
            "Scheduled reports",
            "284"
          ],
          [
            "API access",
            "141"
          ],
          [
            "Single sign-on",
            "96"
          ]
        ]
      }
    ]
  },
  {
    "id": "support",
    "label": "Support & service",
    "blurb": "Ticket volume and service levels, from the helpdesk.",
    "tables": [
      {
        "title": "Support volume, Q3",
        "head": [
          "Month",
          "Tickets",
          "Median first response",
          "CSAT"
        ],
        "rows": [
          [
            "July",
            "412",
            "2.4 h",
            "4.5"
          ],
          [
            "August",
            "447",
            "2.9 h",
            "4.4"
          ],
          [
            "September",
            "469",
            "3.3 h",
            "4.2"
          ]
        ]
      },
      {
        "title": "Escalations, Q3",
        "head": [
          "Severity",
          "Count",
          "Median time to resolve"
        ],
        "rows": [
          [
            "Critical",
            "7",
            "5.1 h"
          ],
          [
            "High",
            "31",
            "19 h"
          ],
          [
            "Normal",
            "188",
            "3.2 d"
          ]
        ]
      }
    ]
  }
]

/**
 * Metrics this pack can genuinely answer.
 *
 * A question about a metric whose inputs are absent is what makes a generator
 * invent them. Measured on 2026-07-31: with LTV:CAC in the pool the model
 * fabricated a 24-month LTV horizon, because there is no LTV data here to reach
 * for. Restricting the pool removed it. Any metric added here needs its inputs
 * added to the pack in the same change.
 */
export const ANSWERABLE = new Set([
  'net-revenue-retention',
  'gross-revenue-retention',
  'customer-churn-rate',
  'saas-quick-ratio',
  'cac-payback-period',
  'customer-acquisition-cost',
  'gross-margin',
  'activation-rate',
  'arpa'
])
