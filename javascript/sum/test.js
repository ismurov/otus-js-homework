describe("Test sum() function", function() {

  it("Correct calculation", function() {
    assert.equal(sum(undefined)(), undefined);
    assert.equal(sum(1)(), 1);
    assert.equal(sum(1)(2)(3)(4)(), 10);
    assert.equal(sum(0)(5)(3)(8)(-2)(), 14);
    assert.equal(sum(1)(1)(1)(1)(1)(1)(1)(), 7);
  });

  it("Correct work with different types", function(){
    assert.equal(sum(1)('2')(), '12');
    assert.equal(sum(5)(10)('5')(NaN)(), '155NaN');
    assert.equal(sum({})(1)(), '[object Object]1');
    assert.equal(sum(100)(Infinity)(), Infinity);
    assert.equal(sum([1, 2, 4])(3)(), '1,2,43');
    assert(isNaN(sum(undefined)(NaN)()));
  });

  it("If run with arguments return function ", function(){
    assert.equal(typeof sum(1), 'function');
    assert.equal(typeof sum(7), 'function');
    assert.equal(typeof sum(2)(5), 'function');
    assert.equal(typeof sum(3)(2)(1)(0), 'function');
  });

  it("If run without arguments, returns accumulated sum (not for first run)", function(){
    assert.equal(typeof sum(1)(), 'number');
    assert.equal(typeof sum(9)(15)(36)(1)(), 'number');
  });

});
