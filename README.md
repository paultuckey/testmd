# testmd

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

A more complex example:

```testmd

  note Check we get 10 results per page
  note Search for something then count results

  open google.com
  note this relates to requirement #R123 from #sherwood-project
  find field Search
  type Robin Hood
  click button search
  find text cached result
  verify count 10

```


## Language Specification

## Commands

```    
# select stuff    
in [device/platform]  # selects a thing to run the test on
open [url/app]  # opens a thing that the test will be run against
find [type of thing] [text]  # finds a thing on the current page/screen

# meta
set [$varname] [value]  
name [name]  # (optional) a name for the test that won't change so it can be used by rerun 
# [note/comment]
note

# actions with obj
click [type of thing] [fuzzy text]
  tap - alias for click
right click  [type of thing] [fuzzy text]
long click  [type of thing] [fuzzy text]
  long tap - alias for long click
hover [type of thing] [fuzzy text]
double click [type of thing] [fuzzy text]
drop on [type of thing] [fuzzy text]
type [text to type]
swipe [up|down|left|right] by [int]

# page actions
reload (reload browser)
back (browser back button)
forward
inject [language] [script-url/ref/block]

# test actions
end ??? needed???
run [test name]  # run another test (note, no circular refs, auto-dupe detect)

# assertion/verification/checking
good [expression]
bad [expression]

# waiting (commands by default will wait until there are no ajax calls pending and there have been no dom changes for 0.5s)
wait for page reload
wait for ajax
wait until [type of thing] [fuzzy text]  # wait until a thing exists
wait for [int][ms|s|m]  # try to avoid using this is make tests pretty hard to automate

```

### Open

Open a url (or app in the future).

    open google.com
    open https://example.com/?abc234=sdf&as=23#123

### Note

Make a note about anything.

  note A simple note on a line
  note Part of project #sherwood
  note see @robinhood for secure keys


## type of thing

button
link (alias for button)
field
input (alias for field)
text
image
video


## Variables

Always start with a $

Why?  they should look the same everywhere (bash is annoying) and be rerally obvious

a-z, A-Z, 0-9, underscore, dash,

best practice?  
Think it's better readability than kebab case or camel case?  

Good `word_word` underscore for word separator and all lower case
Bad `word-word` In most text editors double clicking a word will only select one word not both
Bad `wordWord` seems less readable

eg, `set $base_url https://preprod.example.com/`

non-english ok, ideally, is it harder to parse?   `$多变的`?

Root level objects:

  - cookie eg, `set $cookie.auth_token 24c2bc5b-e684-404e-acdb-67077cb78b42`
  - header eg, `set $header.Authorization Basic 3Wx1d3VhfmlkOnlqYWNwYX9l`
  - test eg, `set $test.key_delay 22ms`
    - `type_key_delay`
    -


## Contribute

Feel free to report an issue and make a request.
