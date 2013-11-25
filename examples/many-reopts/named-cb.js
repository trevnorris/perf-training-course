var SB = require('buffer').SlowBuffer;

(function around() {
  var max = 100;
  process.nextTick(function genPrime() {
    var primes = [];
    var len = (max >>> 3) + 1;
    var sieve = new SB(len);
    sieve.fill(0xff, 0, len);
    var cntr, x, j;
    for (cntr = 0, x = 2; x <= max; ++x) {
      if (sieve[x >>> 3] & (1 << (x & 7))) {
        primes[cntr++] = x
        for(j = 2 * x; j <= max; j += x)
          sieve[j >>> 3] &= ~(1 << (j & 7))
      }
    }
    return primes;
  });
  process.nextTick(function innerfn() {
    setImmediate(around);
  });
}());

setTimeout(function() {
  process.exit();
}, process.argv[2] >>> 0 || 10000);
