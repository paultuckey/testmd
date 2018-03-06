"use strict";

const XRegExp = require('xregexp');

/**
 *
 *
 *
 */
module.exports = {


// load the .testmd file


/// output a jsvscrtipt test using the template called for

    parse: function(testmdBlock) {
        let testmdObj = {
            commands: [],
            allVarsUsed: []
        };
        if (!testmdBlock) testmdBlock = '';
        let lines = testmdBlock.split(/\n/);
        let lineCounter = 0;
        lines.forEach(function(rawLine) {
            lineCounter++;
            module.exports.parseLine(rawLine, lineCounter, testmdObj);
        });

        return testmdObj;
    },

    parseLine: function(rawLine, lineCounter, testmdObj) {
        if (!rawLine) rawLine = '';
        let line = rawLine.trim();
        let commandObj = {
            isValid: false,  // is this command valid syntax for it's type
            srcLineNum: lineCounter,  // the line of the file/block this came from

            cmdType: null,

            noteValue: null,
            openValue: null,

            objType: null,  // field/button/video
            objSearch: null,

            keysToPress: null,

            varName: null,
            varValue: null,

            cmdVarsUsed: [],

            checkStr: null,

        };
        //console.log('hoi', RegExp('^note\\s+', 'iu'), RegExp('^note\\s+', 'iu').test(line))
        if ( XRegExp('^note\\s+', 'i').test(line) ) {
            commandObj.cmdType = 'note';
            let noteLineMatch = RegExp('^note\\s+(.*)$', 'i').exec(line);
            if (noteLineMatch) {
                commandObj.noteValue = noteLineMatch[1];
            }
        }
        if ( XRegExp('^set\\s+', 'iu').test(line) ) {
            commandObj.cmdType = 'set';
            //console.log('w', Unicode.w);
            // vars must start with a $ then be followed
            let setLineMatch = XRegExp('^set\\s+\\$([\\pL0-9.]+)\\s+(.+)$', 'i').exec(line);
            //console.log('trial', XRegExp('\\$([\\pL0-9.]+)', 'i').exec(line));
            if (setLineMatch) {
                commandObj.varName = '$' + setLineMatch[1];
                commandObj.varValue = setLineMatch[2];

                commandObj.cmdVarsUsed.push({
                    usageType: 'varset', usageLineNum: commandObj.srcLineNum, usageVarName: commandObj.varName
                });
                let varsUsedInValue = module.exports.parseForVariables(commandObj.varValue);
                varsUsedInValue.forEach(function(varUsedInValue) {
                    commandObj.cmdVarsUsed.push({
                        usageType: 'varget', usageLineNum: commandObj.srcLineNum,
                        usageVarName: varUsedInValue
                    });
                });
                commandObj.cmdVarsUsed.forEach(function(u) {
                    testmdObj.allVarsUsed.push(u);
                });
            }
        }
        if (commandObj.cmdType) {
            testmdObj.commands.push(commandObj);
        }
    },

    parseForVariables: function(varValue) {
        let varsUsed = [];
        //let match = null;
        let re = XRegExp('\\$([\\pL0-9.]+)', 'i');
        XRegExp.forEach(varValue, re, function(match) {
            //console.log('got', match);
            varsUsed.push('$' + match[1]);
        });
        return varsUsed;
    }

};