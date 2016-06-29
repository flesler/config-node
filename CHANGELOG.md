1.3.0
- Absolute paths are now supported on `dir` option (thanks @rumkin) #5 #8
- Added `husky` to devDependencies, tests must pass before pushing 

1.2.2
- Removed support for multi-extension files being partially matched in order to avoid confusion

1.2.1
- No need for statSync anymore, will improve performance

1.2.0
- Filenames must match the environment name exactly (not just start with it)

1.1.0
- Objects are deep merged instead of overriden

1.0.0
- First version