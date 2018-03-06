"use strict";


/**
 *
 *
 *
 */
module.exports = {


// load the .testmd file


/// output a jsvscrtipt test using the template called for

    parse: function(testmdBlock) {
        let commands = [];
        if (!testmdBlock) testmdBlock = '';
        let lines = testmdBlock.split(/\n/);
        let lineCounter = 0;
        lines.forEach(function(line) {
            lineCounter++;
            if (!line) line = '';
            line = line.trim();
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
                checkStr: null,

            };
            if ( /^note\s+/i.test(line) ) {
                commandObj.cmdType = 'note';
                let noteLineMatch = /^note\s+(.*)/i.exec(line);
                if (noteLineMatch) {
                    commandObj.noteValue = noteLineMatch[1];
                }
            }
            if (commandObj.cmdType) {
                commands.push(commandObj);
            }
        });

        return commands;
    }

};