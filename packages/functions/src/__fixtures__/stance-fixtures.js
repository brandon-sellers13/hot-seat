/**
 * Fixtures for the three stances the board format needs and the original
 * rubric cannot express.
 *
 * The rubric was written for one situation: a director puts a wrong number in
 * front of you and you counter it. That is one of four things a good answer
 * does, and grading everything as though countering is the goal marks the best
 * answer down in two of the other three cases.
 *
 * Written before the grader changed, so they describe the target rather than
 * whatever the code happens to do.
 */

/** A director who is RIGHT. Agreeing and redirecting is the strongest move. */
export const CONCEDE_FIXTURES = [
  {
    slug: 'net-revenue-retention',
    facet: 'benchmark',
    answerable: true,
    reference:
      'Concede the point: 102% is under the 110% board target and arguing that is a losing move. Then redirect on a second sourced figure: gross revenue retention is 94% against a 92% target, so the base is holding and the entire gap to target is expansion. Acquisition budget does not fix an expansion gap, so the money belongs against expansion motion.',
    question:
      'Camille: Net revenue retention is 102% against a board target of 110%. You are asking for more acquisition budget on the back of a retention story that is not there. Why should we fund it?',
    cases: [
      {
        kind: 'conceded and redirected',
        answer:
          "you're right that 102 is under the 110 target and I'm not going to argue that. but gross retention is 94 against a 92 target, so the base is holding. the whole gap is expansion, which means acquisition spend doesn't fix it. the money should go at expansion motion instead",
        // The top tier. Agreeing costs nothing here; what earns it is the
        // redirect built on a second sourced number.
        expect: 'correct'
      },
      {
        kind: 'conceded, no redirect',
        answer: "that's fair, 102 is below where we want to be and we need to do better on it",
        // Honest and useless. Agreement on its own is not an answer.
        expect: 'partial'
      },
      {
        kind: 'fought a correct director',
        answer:
          "I'd push back on that. 102 is a perfectly respectable NRR and the target was always aspirational",
        // The failure the old rubric would have rewarded as "countering".
        expect: 'wrong'
      },
      {
        kind: 'hedge',
        answer: 'there are a few ways to look at retention and I think it depends on the cut',
        expect: 'wrong'
      }
    ]
  }
]

/**
 * Questions the pack cannot settle. Saying so, and naming the cut that would,
 * is the correct answer. Saying so when the answer was available is a dodge,
 * which is why the same stance appears in both lists.
 */
export const REFUSE_FIXTURES = [
  {
    slug: 'activation-rate',
    facet: 'application',
    answerable: false,
    reference:
      'Neither is established. September is 16 accounts, so the fall is two accounts, and July was 68%, which makes 75% the outlier rather than 62% a collapse. Activation is not cut by channel anywhere in the pack, so nobody in the room can attribute it to lead quality. Name the cut that would settle it: activation by channel, matured cohorts only.',
    question:
      'Camille: Activation was 62% in September against 75% in August. That is a lead quality problem and your plan buys more of the same. Is it the leads or the product?',
    cases: [
      {
        kind: 'refused and named the cut',
        answer:
          "neither is established from this. September is 16 accounts so the drop is two accounts, and July was 68 so 75 is the outlier not 62. and activation isn't cut by channel anywhere in the pack, so nobody here can attribute it to lead quality. get me activation by channel on matured cohorts and I'll answer it properly",
        expect: 'correct'
      },
      {
        kind: 'refused without naming the cut',
        answer: "I don't think we can tell from what's in the pack",
        // Correct instinct, no substance. Refusing is only strong when it says
        // what would settle it.
        expect: 'partial'
      },
      {
        kind: 'invented a diagnosis',
        answer:
          "it's lead quality. the paid cohorts we bought in September were weaker and that's what dragged activation down",
        // Confident, plausible, unsupported. The exact habit the game exists to
        // break, and the most dangerous answer in the set.
        expect: 'wrong'
      }
    ]
  },
  {
    slug: 'gross-margin',
    facet: 'definition',
    answerable: true,
    reference:
      'Gross margin is 75%: revenue less cost of revenue over revenue, $3,008,000 against $752,000 for Q3. That is the basis the CAC payback figure should use, and it matches the board target of 75% or better.',
    question:
      'Elena: Before we go further, what is our gross margin, and is the acquisition plan using the right one?',
    cases: [
      {
        // Known disagreement, recorded rather than quietly retargeted. The
        // grader returns partial because the reference answer cites the
        // underlying $3,008,000 and $752,000 and this answer does not. That is
        // defensible, and so is calling it correct: a board asking for gross
        // margin gets "75%, revenue less cost of revenue" and is satisfied. The
        // reference was over-specified. Left failing so the next person decides
        // it on the merits rather than inheriting my opinion.
        kind: 'answered when it was answerable',
        answer:
          'gross margin is 75 percent, revenue less cost of revenue over revenue, and that is the basis the payback figure should use',
        expect: 'correct'
      },
      {
        kind: 'refused when the answer was right there',
        answer: "I'd want to come back to you on that one rather than give you a number I'm not sure of",
        // Deferral as failure insurance. The pack answers this on one page, so
        // this must score badly or "defer whenever uncertain" becomes optimal.
        expect: 'wrong'
      }
    ]
  }
]

export const STANCE_FIXTURE_COUNT =
  CONCEDE_FIXTURES.reduce((n, f) => n + f.cases.length, 0) +
  REFUSE_FIXTURES.reduce((n, f) => n + f.cases.length, 0)
