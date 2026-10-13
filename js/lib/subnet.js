// IPv4 subnetting maths used by the Concept Laboratory subnet calculator.
// Pure functions with no DOM access, so they can be unit-tested with `node --test`.

export const MIN_PREFIX = 1;
export const MAX_PREFIX = 30;

export function isValidIPv4(ip) {
  if (typeof ip !== 'string') return false;
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  return parts.every(p => {
    const n = parseInt(p, 10);
    return !isNaN(n) && n >= 0 && n <= 255 && p === n.toString();
  });
}

export function ipToNumber(ip) {
  return ip.split('.').reduce((acc, oct) => ((acc << 8) + parseInt(oct, 10)) >>> 0, 0);
}

export function numberToIp(num) {
  return [
    (num >>> 24) & 0xFF,
    (num >>> 16) & 0xFF,
    (num >>> 8) & 0xFF,
    num & 0xFF
  ].join('.');
}

export function prefixToMask(prefix) {
  if (prefix <= 0) return 0;
  if (prefix >= 32) return 0xFFFFFFFF;
  return (0xFFFFFFFF << (32 - prefix)) >>> 0;
}

/**
 * Classful address class from the first octet.
 * A: 0-127 (/8), B: 128-191 (/16), C: 192-223 (/24),
 * D: 224-239 (multicast, no default mask), E: 240-255 (reserved, no default mask).
 */
export function classfulInfo(ip) {
  const first = parseInt(ip.split('.')[0], 10);
  if (first <= 127) return { addressClass: 'A', classfulPrefix: 8 };
  if (first <= 191) return { addressClass: 'B', classfulPrefix: 16 };
  if (first <= 223) return { addressClass: 'C', classfulPrefix: 24 };
  if (first <= 239) return { addressClass: 'D', classfulPrefix: null };
  return { addressClass: 'E', classfulPrefix: null };
}

/**
 * Subnet values for an address and CIDR prefix (1 to 30).
 *
 * borrowedBits is measured against the address's classful default mask, which is
 * how KTU subnetting numericals are framed (e.g. 181.56.0.0 needing 1000 subnets:
 * Class B, borrow 10 bits, /26). A prefix shorter than the classful mask is a
 * supernet: borrowedBits is 0 and supernetBits says how many classful networks
 * it aggregates (2^supernetBits). Class D and E have no default mask, so both are null.
 */
export function calculateSubnet(ip, prefix) {
  if (!isValidIPv4(ip)) {
    throw new TypeError(`Invalid IPv4 address: ${ip}`);
  }
  if (!Number.isInteger(prefix) || prefix < MIN_PREFIX || prefix > MAX_PREFIX) {
    throw new RangeError(`CIDR prefix must be an integer from ${MIN_PREFIX} to ${MAX_PREFIX}`);
  }

  const ipNum = ipToNumber(ip);
  const maskNum = prefixToMask(prefix);
  const netNum = (ipNum & maskNum) >>> 0;
  const bcastNum = (netNum | (~maskNum >>> 0)) >>> 0;
  const hostBits = 32 - prefix;
  const totalAddresses = 2 ** hostBits;

  const { addressClass, classfulPrefix } = classfulInfo(ip);
  let borrowedBits = null;
  let subnetCount = null;
  let supernetBits = null;
  if (classfulPrefix !== null) {
    if (prefix >= classfulPrefix) {
      borrowedBits = prefix - classfulPrefix;
      subnetCount = 2 ** borrowedBits;
      supernetBits = 0;
    } else {
      borrowedBits = 0;
      subnetCount = 1;
      supernetBits = classfulPrefix - prefix;
    }
  }

  return {
    mask: numberToIp(maskNum),
    network: numberToIp(netNum),
    broadcast: numberToIp(bcastNum),
    firstHost: numberToIp(netNum + 1),
    lastHost: numberToIp(bcastNum - 1),
    hostBits,
    totalAddresses,
    usableHosts: totalAddresses - 2,
    addressClass,
    classfulPrefix,
    borrowedBits,
    subnetCount,
    supernetBits
  };
}
