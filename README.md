# test-md

Test markdown the language



# Goal

Take test automation from the programmers and give it to the testers.

You shouldn't need to be a programmer to do test automation.  You shouldn't need to specify a automated test case in a 
programming language.



simple as it can be but no simpler

needs to be able to be read like words in a novel


## Commands

### Open

Open a url (or app in the future)

examples

    open google.com
    open https://example.com/?abc234=sdf&as=23#123
    
    
# select stuff    
in
open
find [obj type] [fuzzy text]

# meta
set [name] to [value]  
title [title]
note [note]
ignore {????}
cookie ?? maybe: set cookie.xyx to abc

# actions with obj
tap/click  [obj type] [fuzzy text]
right click  [obj type] [fuzzy text]
long tap / long click  [obj type] [fuzzy text]
hover [obj type] [fuzzy text]
double click [obj type] [fuzzy text]
drop on [obj type] [fuzzy text]
type [text to type]
swipe [up|down|left|right] by [int]

# page actions
reload (reload browser)
back (browser back button)
forward
run [language] [script-let]

