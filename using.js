//  managing multiple resources

const a = getResource(1);
const b = getResource(2);
try {
  // Do something with a and b
} finally {
  a.close(); // Oops, issue if `b.close()` depends on `a`.
  b.close(); // Oops, `b` never reached if `a.close()` throws.
}

// sync disposal

{
  // block avoids leaking `a` or `b` to outer scope
  const a = getResource(1);
  try {
    const b = getResource(2);
    try {
      // Do something with a and b
    } finally {
      b.close(); // ensure `b` is closed before `a` in case `b`
      // depends on `a`
    }
  } finally {
    a.close(); // ensure `a` is closed even if `b.close()` throws
  }
}
// both `a` and `b` are out of scope

/** With `using` */

// avoids leaking `a` or `b` to outer scope
// ensures `b` is disposed before `a` in case `b` depends on `a`
// ensures `a` is disposed even if disposing `b` throws
using a = getResource(1), b = getResource(2);

// 5.2 beta https://devblogs.microsoft.com/typescript/announcing-typescript-5-2-beta/