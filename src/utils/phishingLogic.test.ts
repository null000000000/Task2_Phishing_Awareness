import test from 'node:test';
import assert from 'node:assert/strict';
import { parseDomainUrl, calculateQuizResult, calculateChecklistProgress } from './phishingLogic';

test('parseDomainUrl flags subdomain spoofing with real brand name in subdomain', () => {
  const result = parseDomainUrl('http://paypal.secure-login.verify-now.ru/account');
  assert.equal(result.isHttps, false);
  assert.equal(result.tld, '.ru');
  assert.equal(result.registeredDomain, 'verify-now.ru');
  assert.equal(result.subdomain, 'paypal.secure-login');
  assert.equal(result.riskLevel, 'danger');
  assert.ok(result.flags.some((f) => f.id.includes('brand-subdomain-paypal')));
});

test('parseDomainUrl flags typosquatting with homoglyphs (paypa1)', () => {
  const result = parseDomainUrl('https://paypa1-security.com');
  assert.equal(result.isHttps, true);
  assert.equal(result.registeredDomain, 'paypa1-security.com');
  assert.equal(result.riskLevel, 'danger');
  assert.ok(result.flags.some((f) => f.id.includes('typosquat')));
});

test('parseDomainUrl validates legitimate clean brand domains', () => {
  const result = parseDomainUrl('https://www.paypal.com/signin');
  assert.equal(result.isHttps, true);
  assert.equal(result.registeredDomain, 'paypal.com');
  assert.equal(result.tld, '.com');
  assert.equal(result.riskLevel, 'safe');
  assert.equal(result.flags.length, 0);
  assert.equal(result.riskScore, 100);
});

test('calculateQuizResult evaluates pass and fail thresholds accurately', () => {
  const pass8 = calculateQuizResult(8, 8);
  assert.equal(pass8.passed, true);
  assert.equal(pass8.percentage, 100);
  assert.equal(pass8.statusLevel, 'expert');

  const pass6 = calculateQuizResult(6, 8);
  assert.equal(pass6.passed, true);
  assert.equal(pass6.percentage, 75);
  assert.equal(pass6.statusLevel, 'proficient');

  const fail5 = calculateQuizResult(5, 8);
  assert.equal(fail5.passed, false);
  assert.equal(fail5.percentage, 63);
  assert.equal(fail5.statusLevel, 'needs_practice');
});

test('calculateChecklistProgress calculates percentage and security tiers', () => {
  const full = calculateChecklistProgress(8, 8);
  assert.equal(full.percentage, 100);
  assert.equal(full.levelEn, 'Fortified & Resilient');

  const half = calculateChecklistProgress(4, 8);
  assert.equal(half.percentage, 50);
  assert.equal(half.levelEn, 'Moderate Defense');

  const zero = calculateChecklistProgress(0, 8);
  assert.equal(zero.percentage, 0);
  assert.equal(zero.levelEn, 'Vulnerable');
});
