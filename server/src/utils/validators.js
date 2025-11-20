function validateBugPayload(payload = {}) {
    const errors = [];
    if (!payload.title || typeof payload.title !== 'string' || payload.title.trim().length < 3) {
      errors.push('title must be at least 3 characters');
    }
    if (payload.severity && !['low','medium','high'].includes(payload.severity)) {
      errors.push('invalid severity');
    }
    if (payload.status && !['open','in-progress','resolved'].includes(payload.status)) {
      errors.push('invalid status');
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  module.exports = { validateBugPayload };
  