# i18n Missing Keys Visualize

## ❔Why does this project exist?

When I worked on supporting internationalization for
[Woztell](https://platform.woztell.com/), the developers and translators were working on separate teams.
We didn't want to invest in a continuous localization management
platform at the time and so we (the developers) would pass
JSON files to the translators. Unfortunately, this
process was quite error prone as it was easy for translators
easy to miss translation keys. This resulted in a lot of
back-and-forth between the developers and translators. So I
set out to build a simple user interface that let's small teams
work on i18n JSON files who don't yet want to pay for continuous
localization management. Users can easily drag and drop folders
or individual files and easily see if they are missing translations.

## 🚀 Features

- 📁 Drag and drop individual JSON files to find missing keys
- 🗄️ Drag and drop folders containing JSON files to find missing keys
- ✔️  Locate missing keys for flat or deeply nested JSON objects
- 🍱 Group missing keys by their 18n language code

## 🛠️ Main Technologies

- `Next JS (full-stack framework)`
- `Tailwind CSS (styling)`
- Testing Library (front-end integration tests)

## 📚 What I Learned

This project was an opportunity for me to further develop my ability
to learn more about testing on the front-end.

I learned about writing reliable front-end integration tests using
testing library and avoiding common pitfalls.

For example, I did my best to ensure that elements that were queried
in tests were "stable" across refactors. This meant preferring the use of the
accessibility tree attributes such as "role" attributes or test IDs over
selectors such as classes (prone to change). Additionally, when asserting
particular text was present on the screen to use regex expressions that were
"loose" with their matching.

Secondly, I learned how to setup a simple
CI/CD pipeline using Github workflows to ensure that the artifacts of deployment meet a
quality standard. I've added linting, type-checking, and running of
integration tests as part of the deployment process.

## 🛠️ Running the app locally

1. `git clone https://github.com/abdulqshabbir/i18n-missing-keys-visualizer.git` (clone repo)
2. `cd i18n-missing-keys-visualizer` (move into project directory)
3. `bun` (install dependencies -- note: can use npm or yarn as a package manager instead)
4. `bun run dev` (start development server)

## 🗨 Social Media/Contact Info

- Twitter: https://twitter.com/abdulshabbirdev
- Linked In: https://www.linkedin.com/in/abdul-shabbir-702881145/
