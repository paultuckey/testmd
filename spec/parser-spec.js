"use strict";

const TestmdParser = require('../src/parser');

describe("Testmd Parser", function() {

  it("notes parsing", function() {
      let testmdObj = TestmdParser.parse(`

note Kitchen Sink
    note this should haver every command at least once
 note .  
        note 나는 유리를 먹을 수 있어요. 그래도 아프지 않아요
  note
  
  NoTe upper ok
  badnote
  note2
        
        `);
        expect(testmdObj.length).toBe(5);
        expect(testmdObj[0].cmdType).toBe('note');
        expect(testmdObj[0].noteValue).toBe('Kitchen Sink');
        expect(testmdObj[2].noteValue).toBe('.');
        expect(testmdObj[3].noteValue).toBe('나는 유리를 먹을 수 있어요. 그래도 아프지 않아요');
        expect(testmdObj[4].noteValue).toBe('upper ok');
  });






});

