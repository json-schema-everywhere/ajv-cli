'use strict';

module.exports = {
    execute: execute,
    usage: usage,
    schema: {
        type: 'object',
        properties: {
            _: { maxItems: 2 }
        },
        _ajvOptions: false
    }
};


var commands = {
    validate: helpValidate,
    test: helpTest
};


function execute(argv) {
    var command = argv._[1];
    if (!command || command == 'help') {
        mainHelp();
        return true;
    }

    var cmdHelp = commands[command];

    if (cmdHelp) {
        cmdHelp();
        return true;
    }

    console.error('Unknown command', command);
    usage();
}


function usage() {
    console.error('\
usage:\n\
    validate:  pajv [validate] -s schema_file -d data_file\n\
    test:      pajv test -s schema_file -d data_file --[in]valid\n\
\n\
    help:      pajv help\n\
               pajv help <command>');
}


function mainHelp() {
    _helpValidate();
    _helpTest();
    console.log('\
More information:\n\
        pajv help validate\n\
        pajv help test');
}


function helpValidate() {
    _helpValidate();
    console.log('\
parameters\n\
    -s JSON schema to validate against (required, only one schema allowed)\n\
    -d data file(s) to be validated (required)\n\
    -r referenced schema(s)\n\
    -m meta schema(s)\n\
    -c custom keywords/formats definitions\n\
\n\
    -d, -r, -m, -c can be globs and can be used multiple times\n\
    glob should be enclosed in double quotes\n\
    -c module(s) should export a function that accepts Ajv instance as parameter\n\
    (file path should start with ".", otherwise used as require package)\n\
\n\
options:\n\
    --errors=          error reporting format ("js" by default)\n\
    --changes=         log changes in data after validation ("no" by default)\n\
             js        JavaScript object\n\
             json      JSON format\n\
             line      JSON single line\n\
             text      text message (only for --errors option)\n\
             no        don\'t log errors');
    helpAjvOptions();
}


function _helpValidate() {
    console.log('\
Validate data file(s) against schema\n\
    pajv [validate] -s schema_file -d data_file\n\
    pajv [validate] -s schema_file -d "data*.ext"\n');
}

function helpTest() {
    _helpTest();
    console.log('\
parameters\n\
    -s JSON schema to validate against (required, only one schema allowed)\n\
    -d data file(s) to be validated (required)\n\
    -r referenced schema(s)\n\
    -m meta schema(s)\n\
    -c custom keywords/formats definitions\n\
    --valid/--invalid data file(s) must be valid/invalid for this command to succeed\n\
\n\
    -d, -r, -m, -c can be globs and can be used multiple times\n\
    glob should be enclosed in double quotes\n\
    -c module(s) should export a function that accepts Ajv instance as parameter\n\
    (file path should start with ".", otherwise used as require package)\n\
    --valid=false can be used instead of --invalid\n\
\n\
options:\n\
    --errors=          error reporting\n\
             js        JavaScript object (default)\n\
             json      JSON format\n\
             line      JSON single line\n\
             text      text message\n');
    helpAjvOptions();
}


function _helpTest() {
    console.log('\
Test data validation result\n\
    pajv test -s schema_file -d data_file --valid\n\
    pajv test -s schema_file -d data_file --invalid\n\
    pajv test -s schema_file -d "data*.ext" --valid \n');
}


function helpAjvOptions() {
    console.log('\
Ajv options (see https://github.com/epoberezkin/ajv#options):\n\
    --data             use $data references\n\
\n\
    --all-errors       collect all errors\n\
\n\
    --unknown-formats= handling of unknown formats\n\
             true      throw exception during schema compilation (default)\n\
             <string>  allowed unknown format name, multiple names can be used\n\
\n\
    --json-pointers    report data paths as JSON pointers\n\
\n\
    --unique-items=false  do not validate uniqueItems keyword\n\
\n\
    --unicode=false    count unicode pairs as 2 characters\n\
\n\
    --format=          format validation mode\n\
             fast      using regex (default)\n\
             full      using functions\n\
\n\
    --schema-id=       (by default both IDs will be used)\n\
             $id       use $id\n\
             id        use id\n\
\n\
    --extend-refs=     validation of other keywords when $ref is present in the schema\n\
             ignore    ignore other keywords (default)\n\
             fail      throw exception (recommended)\n\
             true      validate all keywords\n\
\n\
    --missing-refs=    handling missing referenced schemas\n\
             true      fail schema compilation (default)\n\
             ignore    log error and pass validation\n\
             fail      log error and fail validation if ref is used\n\
\n\
    --remove-additional=  remove additional properties\n\
             all       remove all additional properties\n\
             true      remove if additionalProperties is false\n\
             failing   also remove if fails validation of schema in additionalProperties\n\
\n\
    --use-defaults     replace missing properties/items with the values from default keyword\n\
\n\
    --coerce-types     change type of data to match type keyword\n\
\n\
    --multiple-of-precision=N  pass integer number\n\
\n\
    --error-data-path= data path in errors of required, additionalProperties and dependencies\n\
             object    point to object (default)\n\
             property  point to property\n\
\n\
    --messages=false   do not include text messages in errors');
}
