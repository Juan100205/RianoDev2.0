export type QueryResult<T = unknown> = { data: T | null; error: { message: string } | null };

/**
 * Creates a chainable Supabase query builder mock.
 * Every method returns `this`, and the object is thenable — so it resolves
 * correctly whether the chain ends at .order(), .limit(), .eq(), etc.
 */
export function makeChain<T = unknown>(result: QueryResult<T>) {
  const p = Promise.resolve(result);
  const self: Record<string, unknown> = {
    select:  jest.fn(() => self),
    eq:      jest.fn(() => self),
    neq:     jest.fn(() => self),
    order:   jest.fn(() => self),
    limit:   jest.fn(() => self),
    insert:  jest.fn(() => self),
    update:  jest.fn(() => self),
    delete:  jest.fn(() => self),
    upsert:  jest.fn(() => self),
    single:  jest.fn(() => self),
    then:    p.then.bind(p),
    catch:   p.catch.bind(p),
    finally: p.finally.bind(p),
  };
  return self;
}

/** Returns a mock `supabase.from` that routes by table name. */
export function mockFromByTable(tableMap: Record<string, QueryResult>) {
  return jest.fn((table: string) =>
    makeChain(tableMap[table] ?? { data: [], error: null }),
  );
}
