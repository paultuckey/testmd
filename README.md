# test-md

Test markdown the language

## WORK IN PROGRESS
## WORK IN PROGRESS
## WORK IN PROGRESS


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
    
```    
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
```





# Language-testmd package for Atom

Adds syntax highlighting and snippets to Testmd (test-markdown) files in Atom.


## Why

Moderns software testing is a cluster f^ck of automated test written in dozens of languages, frameworks and tools
manual testing is poorly documented in general and hard to document.  

Tests should be written as close to a human language (for now, english as that is the only non-computer language I know)
as possible.

Testers are not programmers and should not have to learn a programming language.

Steal programming from the coders and bring it to the testers.

We want manual tests automated.  Existing test automation tools absolutely have a place and testmd does not aim to replace them
just act as another tool for automation.

Test automation should be for testers not programmers.  

If a tester needs to be a programmer to write test automation this is WRONG!


## What about money?

The Language is free and open always.

I gotta eat and feed my kids so I'll stick to selling related cloud services.


## Design goal

Allow people who would normally only do manual testers the ability to specify automated tests.

People with english as a second language should be able to use it.

You should be able to use it to specify for manual testing.

If you can read english you should be able to read testmd and understand roughly what is going on.

Make it as simples as it can be (but no simpler).


## I'm a programmer, get to the point

This is a language similar to [BASIC](https://en.wikipedia.org/wiki/BASIC) for specifying automated and manual test cases.

You can cross-compile it to a variety of test runners and other test languages.  




## Words

Don't use programming terms (variable, class, function) or programming concepts (if statements, while, for, pointers, threading).

Do use testing terms (test suite, test case, unit test)


## So what does it looks like

Each line starts with a command of some sort and normally ends with a thing.

```testmd
open google.com
find field Search
type Robin Hood
click button I'm feling lucky
check page url robinhood.com
```


## Commands

| Command       | Result                                         |
| ------------- |:----------------------------------------------:|
| `open [url]`        | Open a url |
| `note [text]`        | Just a random note specify references to labels start with a # |


# Complex example



```testmd
note Now check we went to the right place
open google.com
note this relates to requirement #R123 from #sherwood project
find field Search
type Robin Hood
click button I'm feling lucky
check page url robinhood.com
```



Feel free to report an issue and make a request.


