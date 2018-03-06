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
        expect(testmdObj.commands[0].isSyntaxOk).toBe(true);
        expect(testmdObj.commands[0].noteValue).toBe('Kitchen Sink');
        expect(testmdObj.commands[2].noteValue).toBe('.');
        expect(testmdObj.commands[3].noteValue).toBe('나는 유리를 먹을 수 있어요. 그래도 아프지 않아요');
        expect(testmdObj.commands[4].noteValue).toBe('upper ok');
  });

  it("open parsing", function() {
      let testmdObj = TestmdParser.parse(`

open http://example.com
open example.com
open http://example.com/나는?유리를#먹을
open $baseUrl/abc
+open
        
        `);
        expect(testmdObj.commands.length).toBe(4);
        expect(testmdObj.commands[0].cmdType).toBe('open');
        expect(testmdObj.commands[0].isSyntaxOk).toBe(true);
        expect(testmdObj.commands[0].openValue).toBe('http://example.com');

        expect(testmdObj.commands[1].openValue).toBe('example.com');

        expect(testmdObj.commands[2].openValue).toBe('http://example.com/나는?유리를#먹을');

        //console.log(testmdObj.allVarsUsed);
        expect(testmdObj.commands[3].cmdVarsUsed.length).toBe(1);
        expect(testmdObj.allVarsUsed.length).toBe(1);
        expect(testmdObj.commands[3].cmdVarsUsed[0].usageVarName).toBe('$baseUrl');

  });


  it("set parsing", function() {
      let testmdObj = TestmdParser.parse(`

set $a 234
set $나는 유리를
set $joiner hello $a
set $cookie.name my cookies yum
set aaaaaa
        
        `);
        expect(testmdObj.commands.length).toBe(5);
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

        expect(testmdObj.commands[3].varName).toBe('$cookie.name');
        expect(testmdObj.commands[3].varValue).toBe('my cookies yum');

        expect(testmdObj.commands[4].isSyntaxOk).toBe(false);

  });






});

