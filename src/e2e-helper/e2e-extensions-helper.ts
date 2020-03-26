import CommandHelper from './e2e-command-helper';
import BitJsoncHelper from './e2e-bit-jsonc-helper';
import ScopesData from './e2e-scopes';
import FixtureHelper from './e2e-fixtures-helper';
import ScopeHelper from './e2e-scope-helper';
import FsHelper from './e2e-fs-helper';

export default class ExtensionsHelper {
  scopes: ScopesData;
  command: CommandHelper;
  bitJsonc: BitJsoncHelper;
  scopeHelper: ScopeHelper;
  fixtures: FixtureHelper;
  fs: FsHelper;
  constructor(
    scopes: ScopesData,
    command: CommandHelper,
    bitJsonc: BitJsoncHelper,
    scopeHelper: ScopeHelper,
    fixtures: FixtureHelper,
    fsHelper: FsHelper
  ) {
    this.scopes = scopes;
    this.command = command;
    this.bitJsonc = bitJsonc;
    this.scopeHelper = scopeHelper;
    this.fixtures = fixtures;
    this.fs = fsHelper;
  }

  addExtensionToWorkspace(extName: string, extConfig = {}) {
    this.bitJsonc.addKeyVal(this.scopes.localPath, extName, extConfig);
  }

  // TODO: gilad - refactor
  addExtensionToVariant(variant: string, extName: string, extConfig = {}) {
    this.bitJsonc.addToVariant(this.scopes.localPath, variant, extName, extConfig);
  }

  /**
   * This will set the extension as the only extension of the variant
   * If you want to add new one, use addExtensionToVariant
   *
   * @param {string} variant
   * @param {string} extName
   * @param {*} [extConfig={}]
   * @memberof ExtensionsHelper
   */
  setExtensionToVariant(variant: string, extName: string, extConfig = {}) {
    const extensionEntry = { [extName]: extConfig };
    this.bitJsonc.addToVariant(this.scopes.localPath, variant, 'extensions', extensionEntry);
  }

  createNewComponentExtension(name = 'foo-ext', content?: string, config?: any) {
    if (!content) {
      content = `
      module.exports = {
        name: 'eslint',
        dependencies: [],
        provider: async () => {
          console.log(\`hi there from an extension\`)
        }
      };
      `;
    }
    this.fs.outputFile('foo-ext.js', content);
    this.command.addComponent('foo-ext.js', { i: name });
    this.addExtensionToWorkspace(name, config);
  }
}
