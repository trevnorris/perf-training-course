var SB = require('buffer').SlowBuffer;

var ITER = 2e4;
getMe = false;


function genPrimes(max, soft) {
  var primes = [];
  var len = (max >>> 3) + 1;
  var sieve = new SB(len).fill(0xff, 0, len);
  var cntr, x, j;

  for (cntr = 0, x = 2; x <= max; ++x) {
    if (sieve[x >>> 3] & (1 << (x & 7))) {
      primes[cntr++] = x
      for(j = 2 * x; j <= max; j += x)
        sieve[j >>> 3] &= ~(1 << (j & 7))
    }
  }

  // Here for demonstration of eager DEOPT.
  if (getMe)
    return false;

  return primes;
}


// Normal operation
/*
for (var i = 0; i < ITER; i++) {
  genPrimes(i);
}
/* */


// Uncomment for soft DEOPT
/*
for (var i = 0; i < ITER; i++) {
  if (i === ITER - 1)
    ITER = ITER + '';
  genPrimes(i);
}
/* */


// Uncomment for eager DEOPT
/*
for (var i = 0; i < ITER; i++) {
  if (i === ITER - 1)
    getMe = true;
  genPrimes(i);
}
/* */
