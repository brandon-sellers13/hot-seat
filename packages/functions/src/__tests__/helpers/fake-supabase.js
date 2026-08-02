/**
 * A small in-memory stand-in for the Supabase client.
 *
 * Written because the test that matters for M4 is not "did /grade call update"
 * but "after credibility runs out, does /exchange actually refuse". That is a
 * question about state moving between two handlers, and a mock that returns a
 * canned row for every read cannot answer it: it would pass just as happily if
 * the write never happened.
 *
 * This has been the failure twice in this codebase. A control read as enforced,
 * the helper was correct, and nothing was gated on it. So the guard tests write
 * through this and then read back through the other endpoint.
 *
 * It implements only the query shapes the handlers actually use. Anything else
 * should fail loudly rather than quietly return nothing.
 */

/** Column defaults that live in the schema rather than in the insert. */
const DEFAULTS = {
  sessions: { turn_count: 0, credibility: 5, cards: [], outcome: null, ended_at: null },
  attempts: { session_id: null, stance: null },
  leitner: { box: 1 }
}

export const fakeDb = () => ({ sessions: [], attempts: [], leitner: [], _seq: 0 })

const builder = (db, table) => {
  const filters = []
  let action = null
  let payload = null

  const matching = () => db[table].filter((row) => filters.every(([k, v]) => row[k] === v))

  const run = async () => {
    if (action === 'insert' || action === 'upsert') {
      db._seq += 1
      const row = { id: `${table}-${db._seq}`, ...DEFAULTS[table], ...payload }
      db[table].push(row)
      return { data: [{ ...row }], error: null }
    }
    if (action === 'update') {
      const rows = matching()
      rows.forEach((row) => Object.assign(row, payload))
      return { data: rows.map((r) => ({ ...r })), error: null }
    }
    return { data: matching().map((r) => ({ ...r })), error: null }
  }

  const self = {
    select() {
      action ??= 'select'
      return self
    },
    insert(body) {
      action = 'insert'
      payload = body
      return self
    },
    update(body) {
      action = 'update'
      payload = body
      return self
    },
    upsert(body) {
      action = 'upsert'
      payload = body
      return self
    },
    eq(column, value) {
      filters.push([column, value])
      return self
    },
    gte() {
      return self
    },
    async maybeSingle() {
      const { data } = await run()
      return { data: data[0] ?? null, error: null }
    },
    async single() {
      const { data } = await run()
      return { data: data[0] ?? null, error: data.length ? null : new Error('no rows') }
    },
    then(resolve, reject) {
      return run().then(resolve, reject)
    }
  }
  return self
}

export const fakeClient = (db, userId = 'user-1') => ({
  auth: { getUser: async () => ({ data: { user: { id: userId } }, error: null }) },
  from: (table) => {
    if (!(table in DEFAULTS)) throw new Error(`fake-supabase does not model "${table}"`)
    return builder(db, table)
  }
})
