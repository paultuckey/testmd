"use strict";

const TestmdParser = require('../src/parser');

describe("Testmd Parser", function() {

  it("notes parsing", function() {
      let testmdObj = TestmdParser.parse(`

note Kitchen Sink
    note this should have every command at least once
 note .  
        note 나는 유리를 먹을 수 있어요. 그래도 아프지 않아요
  note
  
  NoTe upper ok
  badnote
  note2
        
        `);
        expect(testmdObj.commands.length).toBe(5);
        expect(testmdObj.commands[0].cmdType).toBe('note');
        expect(testmdObj.commands[0].noteValue).toBe('Kitchen Sink');
        expect(testmdObj.commands[2].noteValue).toBe('.');
        expect(testmdObj.commands[3].noteValue).toBe('나는 유리를 먹을 수 있어요. 그래도 아프지 않아요');
        expect(testmdObj.commands[4].noteValue).toBe('upper ok');
  });

  it("set parsing", function() {
      let testmdObj = TestmdParser.parse(`

set $a 234
set $나는 유리를
set $joiner hello $a
set $cookie.name my cookies yum
        
        `);
        expect(testmdObj.commands.length).toBe(4);
        expect(testmdObj.allVarsUsed.length).toBe(5);
        expect(testmdObj.commands[0].cmdType).toBe('set');
        expect(testmdObj.commands[0].varName).toBe('$a');
        expect(testmdObj.commands[0].varValue).toBe('234');
        expect(testmdObj.commands[0].cmdVarsUsed.length).toBe(1);
        expect(testmdObj.commands[0].cmdVarsUsed[0].usageVarName).toBe('$a');

        expect(testmdObj.commands[1].varName).toBe('$나는');
        expect(testmdObj.commands[1].varValue).toBe('유리를');
        expect(testmdObj.commands[1].cmdVarsUsed.length).toBe(1);

        expect(testmdObj.commands[2].varName).toBe('$joiner');
        expect(testmdObj.commands[2].varValue).toBe('hello $a');
        expect(testmdObj.commands[2].cmdVarsUsed.length).toBe(2);
        expect(testmdObj.commands[2].cmdVarsUsed[0].usageVarName).toBe('$joiner');
        expect(testmdObj.commands[2].cmdVarsUsed[1].usageVarName).toBe('$a');


  });






});

