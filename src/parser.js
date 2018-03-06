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
            isSyntaxOk: false,  // is this command valid syntax for it's type
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
                commandObj.isSyntaxOk = true;
            }
        }
        if ( XRegExp('^open\\s+', 'i').test(line) ) {
            commandObj.cmdType = 'open';
            let openLineMatch = RegExp('^open\\s+(.*)$', 'i').exec(line);
            if (openLineMatch) {
                commandObj.openValue = openLineMatch[1];
                commandObj.cmdVarsUsed = module.exports.parseForVariables(commandObj.openValue, lineCounter);
                commandObj.isSyntaxOk = true;
                //console.log('commandObj.cmdVarsUsed', commandObj.cmdVarsUsed);
            }
        }
        if ( XRegExp('^set\\s+', 'i').test(line) ) {
            commandObj.cmdType = 'set';
            //console.log('w', Unicode.w);
            // vars must start with a $ then be followed
            let setLineMatch = XRegExp('^set\\s+\\$([\\pL0-9.]+)\\s+(.+)$', 'i').exec(line);
            //console.log('trial', XRegExp('\\$([\\pL0-9.]+)', 'i').exec(line));
            if (setLineMatch) {
                commandObj.varName = '$' + setLineMatch[1];
                commandObj.varValue = setLineMatch[2];
                commandObj.cmdVarsUsed.push({
                    usageType: 'varset', usageVarName: commandObj.varName, usageLineNum: commandObj.srcLineNum
                });
                let varsUsedInValue = module.exports.parseForVariables(commandObj.varValue, lineCounter);
                commandObj.cmdVarsUsed = commandObj.cmdVarsUsed.concat(varsUsedInValue);
                commandObj.isSyntaxOk = true;
            }
        }
        if (commandObj.cmdType) {
            testmdObj.commands.push(commandObj);
            testmdObj.allVarsUsed = testmdObj.allVarsUsed.concat(commandObj.cmdVarsUsed);
        }
    },

    parseForVariables: function(varValue, lineCounter) {
        let varsUsed = [];
        //let match = null;
        let re = XRegExp('\\$([\\pL0-9.]+)', 'i');
        XRegExp.forEach(varValue, re, function(match) {
            //console.log('got', match);
            varsUsed.push({
                usageType: 'varget', usageVarName: '$' + match[1], usageLineNum: lineCounter
            });
        });
        return varsUsed;
    }

};