/**
 * Mocking function for replace original console.log
 *
 * Save in buffer values as string
 */
function mockLog() {
  let buff = [];
  const log = value => buff.push('' + value);
  log.get = () => buff.shift();
  log.len = () => buff.length;
  return log;
}


describe('Test mockLog() function', () => {
  it("If buffer is empty 'get' method returns undefined", () =>{
    const log = mockLog();
    assert.equal(log.get(), undefined);
  });

  it ("'len' method returns buffer size", () => {
    const log = mockLog();
    for (let i = 0; i < 55; i++) {
      log(i);
    }
    assert.equal(log.len(), 55);
  });

  it("'get' method returns value of string type", () => {
    const log = mockLog();
    log({a:1});
    assert.equal(typeof log.get(), 'string');
  });

  it("'get' method returns values in right order", () =>{
    const log = mockLog();
    log(1);
    log('str');
    log([1, 2, 3]);

    assert.equal(log.get(), '1', 'first value from buffer');
    assert.equal(log.get(), 'str', 'second value from buffer');
    assert.equal(log.get(), '1,2,3', 'third value from buffer');
    assert.equal(log.get(), undefined, 'value from empty buffer');
  });
});


describe('Test promiseReduce() function', () => {
  const originalLog = console.log;
  let log;

  beforeEach(() => {
    log = mockLog();
    console.log = log;
  });

  afterEach(() => {
    console.log = originalLog;
  });

  it('Original test from homework', async () => {
    var fn1 = () => {
      console.log('fn1');
      return Promise.resolve(1);
    };
    var fn2 = () => new Promise(resolve => {
      console.log('fn2');
      setTimeout(() => resolve(2), 1000);
    });

    await promiseReduce(
      [fn1, fn2], function (memo, value) {
        console.log('reduce');
        return memo * value;
      },
      1
    ).then(console.log);

    /**
     * Console output should be:
     *   fn1
     *   reduce
     *   fn2
     *   reduce
     *   2
     */
    assert.equal(log.len(), 5);
    assert.equal(log.get(), 'fn1');
    assert.equal(log.get(), 'reduce');
    assert.equal(log.get(), 'fn2');
    assert.equal(log.get(), 'reduce');
    assert.equal(log.get(), '2');
  });

  it("promiseReduce returns Promise", () => {
    const returned = promiseReduce([], () => 1, 0);
    assert.equal(returned.toString(), "[object Promise]");
  });

  it("Fast functions from the array are returned in the correct order", async () => {
    const arr = [() => Promise.resolve(1),
                 () => Promise.resolve(2),
                 () => Promise.resolve(3)];
    const result = await promiseReduce(arr, (m, v) => m + v, '0');
    assert.equal(result, '0123');
  });

  it("Slow functions from the array are returned in the correct order", async () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(() => new Promise(resolve => {
        setTimeout(() => resolve(i), 250 - i*50);
      }));
    }
    const result = await promiseReduce(arr, (m, v) => m + v, '');
    assert.equal(result, '01234');
  });

  it("Async functions run without race condition", async () => {
    const arr = [];
    for (let i = 0; i < 5; i++) {
      arr.push(() => new Promise(resolve => {
        console.log(`func ${i}`)
        setTimeout(() => resolve(i), 250 - i*50);
      }));
    }
    await promiseReduce(arr, (m, v) => m + v, '');
    assert.equal(log.get(), 'func 0');
    assert.equal(log.get(), 'func 1');
    assert.equal(log.get(), 'func 2');
    assert.equal(log.get(), 'func 3');
    assert.equal(log.get(), 'func 4');
  });
});

