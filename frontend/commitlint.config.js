export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fixbug', 'setup', 'release', 'fix', 'refactor', 'doc']],
    'type-case': [2, 'always', 'lower-case'],
  },
}
