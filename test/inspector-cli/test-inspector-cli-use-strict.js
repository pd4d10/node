'use strict';
const common = require('../common');

common.skipIfInspectorDisabled();

const fixtures = require('../common/fixtures');
const startCLI = require('../common/inspector-cli');

const assert = require('assert');

// Test for files that start with strict directive.
{
  const script = fixtures.path('inspector-cli', 'use-strict.js');
  const cli = startCLI([script]);

  function onFatal(error) {
    cli.quit();
    throw error;
  }

  return cli.waitForInitialBreak()
    .then(() => cli.waitForPrompt())
    .then(() => {
      const brk = cli.breakInfo;
      assert.match(
        `${brk.line}`,
        /^(1|2)$/,
        'pauses either on strict directive or first "real" line');
    })
    .then(() => cli.quit())
    .then(null, onFatal);
}
