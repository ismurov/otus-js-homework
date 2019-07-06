describe("Test sum() function", () => {

  describe("Correct calculation", () => {

    it("sum(undefined)() == undefined", () => {
      assert.equal(sum(undefined)(), undefined);
    });

    it("sum(1)() == 1", () => {
      assert.equal(sum(1)(), 1);
    });

    it("sum(1)(2)(3)(4)() == 10", () => {
      assert.equal(sum(1)(2)(3)(4)(), 10);
    });

    it("sum(0)(5)(3)(8)(-2)() == 14", () => {
      assert.equal(sum(0)(5)(3)(8)(-2)(), 14);
    });

    it("sum(1)(1)(1)(1)(1)(1)(1)() == 7", () => {
      assert.equal(sum(1)(1)(1)(1)(1)(1)(1)(), 7);
    });
  });


  describe("Correct work with different types", () => {

    it("sum(1)('2')() == '12'", () => {
      assert.equal(sum(1)('2')(), '12');
    });

    it("sum(5)(10)('5')(NaN)() == '155NaN'", () => {
      assert.equal(sum(5)(10)('5')(NaN)(), '155NaN');
    });

    it("sum({})(1)() == '[object Object]1'", () => {
      assert.equal(sum({})(1)(), '[object Object]1');
    });

    it("sum(100)(Infinity)() == Infinity", () => {
      assert.equal(sum(100)(Infinity)(), Infinity);
    });

    it("sum([1, 2, 4])(3)() == '1,2,43'", () => {
      assert.equal(sum([1, 2, 4])(3)(), '1,2,43');
    });

    it("sum(undefined)(NaN)() returns NaN", () => {
      assert(isNaN(sum(undefined)(NaN)()));
    });
  });


  describe("If run with arguments return function", () => {
    it("sum(1)", () => {
      assert.equal(typeof sum(1), 'function');
    });

    it("sum(7)", () => {
      assert.equal(typeof sum(7), 'function');
    });

    it("sum(2)(5)", () => {
      assert.equal(typeof sum(2)(5), 'function');
    });

    it("sum(3)(2)(1)(0)", () => {
      assert.equal(typeof sum(3)(2)(1)(0), 'function');
    });
  });

  describe("If run without arguments, returns accumulated sum (not for first run)", () => {
    it("typeof sum(1)() == 'number'", () => {
      assert.equal(typeof sum(1)(), 'number');
    });

    it("typeof sum(9)(15)(36)(1)() == 'number'", () => {
      assert.equal(typeof sum(9)(15)(36)(1)(), 'number');
    });
  });

});
