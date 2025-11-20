const { validateBugPayload } = require('../../src/utils/validators');

describe('validateBugPayload', () => {
  test('valid payload', () => {
    const result = validateBugPayload({title: 'Fix crash', severity: 'high', status: 'open'});
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('short title returns error', () => {
    const result = validateBugPayload({title: 'ab'});
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('title must be at least 3 characters');
  });

  test('invalid severity', () => {
    const result = validateBugPayload({title: 'hello', severity: 'extreme'});
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('invalid severity');
  });

  test('invalid status', () => {
    const result = validateBugPayload({title: 'hello', status: 'closed'});
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('invalid status');
  });
});
