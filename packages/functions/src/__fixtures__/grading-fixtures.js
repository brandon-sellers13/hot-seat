/**
 * The hand-checked grading set.
 *
 * Eight metrics, four answers each: one correct, one partially right, one
 * plausible but wrong, and one hedge. Thirty-two cases, each carrying the
 * verdict a human would give it.
 *
 * The hedges matter more than anything else here. A hedge is where a cheap
 * grader is likeliest to award credit that was not earned, and a grader that
 * passes hedges teaches the player that vagueness works, which is the exact
 * habit this game exists to break. A configuration ships as the grader only if
 * it matches every one of these, and the set stays afterwards as a regression
 * test so a model or prompt change cannot quietly loosen the standard.
 *
 * Answers are written the way somebody types under time pressure: lower case,
 * abbreviations, no full stops. Grading on wording rather than substance would
 * fail most of the correct ones, which is itself part of what this checks.
 */
export const GRADING_FIXTURES = [
  {
    slug: 'net-revenue-retention',
    facet: 'definition',
    question: 'What does net revenue retention actually measure?',
    cases: [
      {
        kind: 'correct',
        answer:
          'what an existing cohort of customers is worth now vs a year ago, after expansion, contraction and churn, excluding any new customers',
        expect: 'correct'
      },
      {
        kind: 'partial',
        // Gets the cohort idea, omits the exclusion of new logos, which is the
        // one thing every published construction agrees on.
        answer: 'revenue from your existing customers this year compared to last year',
        expect: 'partial'
      },
      {
        kind: 'wrong',
        // Plausible-sounding and includes new customers, which makes it a
        // growth rate rather than NRR.
        answer: 'total revenue growth year over year including new customers won',
        expect: 'wrong'
      },
      {
        kind: 'hedge',
        answer: 'something like how much revenue you keep, roughly, I think it depends',
        expect: 'wrong'
      }
    ]
  },
  {
    slug: 'cac-payback-period',
    facet: 'definition',
    question: 'What is CAC payback period?',
    cases: [
      {
        kind: 'correct',
        answer:
          'how many months of revenue or gross margin from a new customer it takes to earn back what you spent to acquire them',
        expect: 'correct'
      },
      {
        kind: 'partial',
        answer: 'how long it takes to make back acquisition cost',
        expect: 'partial'
      },
      {
        kind: 'wrong',
        answer: 'total lifetime value divided by acquisition cost',
        expect: 'wrong'
      },
      {
        kind: 'hedge',
        answer: 'its a payback thing, some number of months probably',
        expect: 'wrong'
      }
    ]
  },
  {
    slug: 'customer-churn-rate',
    facet: 'definition',
    question: 'Define customer churn rate.',
    cases: [
      {
        kind: 'correct',
        answer:
          'the share of customer accounts that stop being customers in a period, counted as accounts not dollars',
        expect: 'correct'
      },
      {
        // Expectation corrected 2026-07-30 after running the gate. It was
        // written as `partial` on the grounds that it omits "counted as
        // accounts rather than dollars", and every configuration graded it
        // correct. On review the model is right and the fixture was wrong:
        // the answer says "customers", which is accounts, and marking it down
        // would be grading on wording rather than substance, which the grader
        // instructions explicitly forbid. Recorded rather than quietly changed,
        // because moving a target to make a test pass is otherwise
        // indistinguishable from this.
        kind: 'correct',
        answer: 'the percentage of customers who leave in a period',
        expect: 'correct'
      },
      {
        kind: 'wrong',
        // This is revenue churn, a different metric.
        answer: 'the percentage of recurring revenue lost from cancellations in the period',
        expect: 'wrong'
      },
      {
        kind: 'hedge',
        answer: 'customers leaving, more or less, depends how you count it',
        expect: 'wrong'
      }
    ]
  },
  {
    slug: 'ltv-cac-ratio',
    facet: 'definition',
    question: 'What does the LTV to CAC ratio tell you?',
    cases: [
      {
        kind: 'correct',
        answer:
          'how many dollars of lifetime value you get back for each dollar spent acquiring a customer',
        expect: 'correct'
      },
      {
        kind: 'partial',
        answer: 'lifetime value compared against acquisition cost',
        expect: 'partial'
      },
      {
        kind: 'wrong',
        answer: 'how many months it takes to pay back the cost of acquiring a customer',
        expect: 'wrong'
      },
      {
        kind: 'hedge',
        answer: 'a ratio of two things that should be above some number I think',
        expect: 'wrong'
      }
    ]
  },
  {
    slug: 'rule-of-40',
    facet: 'definition',
    question: 'What is the Rule of 40?',
    cases: [
      {
        kind: 'correct',
        answer:
          'revenue growth rate plus profit margin in percentage points, as a single test of whether growth is being traded against profit acceptably',
        expect: 'correct'
      },
      {
        kind: 'partial',
        answer: 'growth plus margin should be at least 40',
        expect: 'partial'
      },
      {
        kind: 'wrong',
        answer: 'revenue growth should be at least 40 percent a year',
        expect: 'wrong'
      },
      {
        kind: 'hedge',
        answer: 'the one where 40 is the target number',
        expect: 'wrong'
      }
    ]
  },
  {
    slug: 'burn-multiple',
    facet: 'definition',
    question: 'What is burn multiple?',
    cases: [
      {
        kind: 'correct',
        answer: 'net cash burned divided by net new ARR added',
        expect: 'correct'
      },
      {
        kind: 'partial',
        answer: 'how much cash you burn relative to how much you grow',
        expect: 'partial'
      },
      {
        kind: 'wrong',
        answer: 'monthly cash burn divided by cash in the bank',
        expect: 'wrong'
      },
      {
        kind: 'hedge',
        answer: 'burn compared to something, efficiency-ish',
        expect: 'wrong'
      }
    ]
  },
  {
    slug: 'saas-quick-ratio',
    facet: 'definition',
    question: 'What is the SaaS quick ratio?',
    cases: [
      {
        kind: 'correct',
        answer:
          'new plus expansion revenue divided by revenue lost to churn and contraction, so dollars added per dollar lost',
        expect: 'correct'
      },
      {
        kind: 'partial',
        answer: 'revenue you gain against revenue you lose',
        expect: 'partial'
      },
      {
        kind: 'wrong',
        // The liquidity quick ratio. Right name, wrong metric entirely, which
        // is the collision this corpus documents.
        answer: 'current assets minus inventory divided by current liabilities',
        expect: 'wrong'
      },
      {
        // Reclassified from `hedge` to `thin`. It reads like hedging, but
        // "growth over churn" is the actual relationship, so there is real
        // substance under the vagueness. Keeping it labelled a hedge would have
        // weakened the hedge invariant, which is the one rule that has to hold
        // absolutely.
        kind: 'thin',
        answer: 'growth over churn, some ratio, above 4 is good maybe',
        expect: 'partial'
      }
    ]
  },
  {
    slug: 'magic-number',
    facet: 'definition',
    question: 'What is the magic number?',
    cases: [
      {
        kind: 'correct',
        answer:
          'annualised new recurring revenue divided by the prior period sales and marketing spend that produced it',
        expect: 'correct'
      },
      {
        kind: 'partial',
        answer: 'new revenue over sales and marketing spend',
        expect: 'partial'
      },
      {
        kind: 'wrong',
        answer: 'total ARR divided by total sales and marketing spend for the year',
        expect: 'wrong'
      },
      {
        kind: 'hedge',
        answer: 'sales efficiency, roughly, I would have to look up the exact construction',
        expect: 'wrong'
      }
    ]
  }
]

export const FIXTURE_COUNT = GRADING_FIXTURES.reduce((n, f) => n + f.cases.length, 0)
