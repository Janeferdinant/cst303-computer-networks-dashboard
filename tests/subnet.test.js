// Unit tests for the subnetting maths behind the Concept Laboratory calculator.
// Run with: node --test

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidIPv4,
  ipToNumber,
  numberToIp,
  prefixToMask,
  classfulInfo,
  calculateSubnet
} from '../js/lib/subnet.js';

test('isValidIPv4 accepts dotted quads and rejects malformed input', () => {
  for (const ok of ['0.0.0.0', '10.0.0.1', '181.56.0.0', '192.168.10.77', '255.255.255.255']) {
    assert.equal(isValidIPv4(ok), true, ok);
  }
  for (const bad of ['', '1.2.3', '1.2.3.4.5', '256.1.1.1', '1.2.3.-1', '01.2.3.4', 'a.b.c.d', '1.2.3.4 ', null, undefined]) {
    assert.equal(isValidIPv4(bad), false, String(bad));
  }
});

test('ipToNumber and numberToIp round-trip', () => {
  for (const ip of ['0.0.0.0', '10.1.2.3', '172.16.254.1', '192.168.10.77', '255.255.255.255']) {
    assert.equal(numberToIp(ipToNumber(ip)), ip);
  }
  assert.equal(ipToNumber('255.255.255.255'), 0xFFFFFFFF);
  assert.equal(ipToNumber('1.0.0.0'), 16777216);
});

test('prefixToMask covers the edges', () => {
  assert.equal(numberToIp(prefixToMask(0)), '0.0.0.0');
  assert.equal(numberToIp(prefixToMask(1)), '128.0.0.0');
  assert.equal(numberToIp(prefixToMask(8)), '255.0.0.0');
  assert.equal(numberToIp(prefixToMask(26)), '255.255.255.192');
  assert.equal(numberToIp(prefixToMask(30)), '255.255.255.252');
  assert.equal(numberToIp(prefixToMask(32)), '255.255.255.255');
});

test('classfulInfo derives the class from the first octet', () => {
  assert.deepEqual(classfulInfo('0.0.0.0'), { addressClass: 'A', classfulPrefix: 8 });
  assert.deepEqual(classfulInfo('10.0.0.0'), { addressClass: 'A', classfulPrefix: 8 });
  assert.deepEqual(classfulInfo('127.0.0.1'), { addressClass: 'A', classfulPrefix: 8 });
  assert.deepEqual(classfulInfo('128.0.0.0'), { addressClass: 'B', classfulPrefix: 16 });
  assert.deepEqual(classfulInfo('191.255.0.0'), { addressClass: 'B', classfulPrefix: 16 });
  assert.deepEqual(classfulInfo('192.0.0.0'), { addressClass: 'C', classfulPrefix: 24 });
  assert.deepEqual(classfulInfo('223.255.255.0'), { addressClass: 'C', classfulPrefix: 24 });
  assert.deepEqual(classfulInfo('224.0.0.1'), { addressClass: 'D', classfulPrefix: null });
  assert.deepEqual(classfulInfo('240.0.0.1'), { addressClass: 'E', classfulPrefix: null });
});

test('Class B worked example: 181.56.0.0 needing 1000 subnets borrows 10 bits (/26)', () => {
  const s = calculateSubnet('181.56.0.0', 26);
  assert.equal(s.addressClass, 'B');
  assert.equal(s.classfulPrefix, 16);
  assert.equal(s.borrowedBits, 10);
  assert.equal(s.subnetCount, 1024);
  assert.equal(s.mask, '255.255.255.192');
  assert.equal(s.network, '181.56.0.0');
  assert.equal(s.broadcast, '181.56.0.63');
  assert.equal(s.firstHost, '181.56.0.1');
  assert.equal(s.lastHost, '181.56.0.62');
  assert.equal(s.hostBits, 6);
  assert.equal(s.totalAddresses, 64);
  assert.equal(s.usableHosts, 62);
});

test('Class C address no longer assumes Class B: 192.168.10.77/26 borrows 2 bits', () => {
  const s = calculateSubnet('192.168.10.77', 26);
  assert.equal(s.addressClass, 'C');
  assert.equal(s.classfulPrefix, 24);
  assert.equal(s.borrowedBits, 2);   // previously reported as 10 bits / 1,024 subnets
  assert.equal(s.subnetCount, 4);
  assert.equal(s.network, '192.168.10.64');
  assert.equal(s.broadcast, '192.168.10.127');
  assert.equal(s.firstHost, '192.168.10.65');
  assert.equal(s.lastHost, '192.168.10.126');
  assert.equal(s.usableHosts, 62);
});

test('Class A address: 10.20.30.40/20 borrows 12 bits', () => {
  const s = calculateSubnet('10.20.30.40', 20);
  assert.equal(s.addressClass, 'A');
  assert.equal(s.borrowedBits, 12);
  assert.equal(s.subnetCount, 4096);
  assert.equal(s.mask, '255.255.240.0');
  assert.equal(s.network, '10.20.16.0');
  assert.equal(s.broadcast, '10.20.31.255');
  assert.equal(s.usableHosts, 4094);
});

test('prefix equal to the classful mask borrows 0 bits (1 subnet)', () => {
  const s = calculateSubnet('172.16.5.4', 16);
  assert.equal(s.borrowedBits, 0);
  assert.equal(s.subnetCount, 1);
  assert.equal(s.supernetBits, 0);
  assert.equal(s.network, '172.16.0.0');
  assert.equal(s.broadcast, '172.16.255.255');
  assert.equal(s.usableHosts, 65534);
});

test('prefix shorter than the classful mask is reported as a supernet', () => {
  const s = calculateSubnet('200.10.4.0', 22);
  assert.equal(s.addressClass, 'C');
  assert.equal(s.borrowedBits, 0);
  assert.equal(s.supernetBits, 2); // aggregates 4 Class C networks
  assert.equal(s.network, '200.10.4.0');
  assert.equal(s.broadcast, '200.10.7.255');
  assert.equal(s.usableHosts, 1022);
});

test('Class D and E have no classful default, so borrowed bits are not applicable', () => {
  const d = calculateSubnet('224.0.0.5', 24);
  assert.equal(d.addressClass, 'D');
  assert.equal(d.borrowedBits, null);
  assert.equal(d.subnetCount, null);
  const e = calculateSubnet('250.1.2.3', 8);
  assert.equal(e.addressClass, 'E');
  assert.equal(e.borrowedBits, null);
});

test('/30 point-to-point link has 2 usable hosts; /1 is the widest accepted prefix', () => {
  const p2p = calculateSubnet('192.168.1.5', 30);
  assert.equal(p2p.network, '192.168.1.4');
  assert.equal(p2p.broadcast, '192.168.1.7');
  assert.equal(p2p.usableHosts, 2);
  assert.equal(p2p.borrowedBits, 6);
  assert.equal(p2p.subnetCount, 64);

  const wide = calculateSubnet('130.1.1.1', 1);
  assert.equal(wide.mask, '128.0.0.0');
  assert.equal(wide.network, '128.0.0.0');
  assert.equal(wide.broadcast, '255.255.255.255');
  assert.equal(wide.supernetBits, 15);
});

test('invalid input throws', () => {
  assert.throws(() => calculateSubnet('300.1.1.1', 24), TypeError);
  assert.throws(() => calculateSubnet('10.0.0.1', 0), RangeError);
  assert.throws(() => calculateSubnet('10.0.0.1', 31), RangeError);
  assert.throws(() => calculateSubnet('10.0.0.1', 24.5), RangeError);
  assert.throws(() => calculateSubnet('10.0.0.1', NaN), RangeError);
});
