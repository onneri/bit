// @flow
import fs from 'fs-extra';
import AbstractVinyl from './abstract-vinyl';

export default class JSONFile extends AbstractVinyl {
  override: boolean = false;

  async write(): Promise<string> {
    if (!this.override && fs.existsSync(this.path)) {
      return Promise.resolve(this.path);
    }
    await fs.outputFile(this.path, this.contents);
    return Promise.resolve(this.path);
  }

  static load({
    base,
    path,
    content,
    indent,
    override = false
  }: {
    base: string,
    path: string,
    content: Object,
    indent?: number, // for package.json file this property is preserved or default to 2
    override?: boolean
  }): JSONFile {
    const jsonStr = JSON.stringify(content, null, indent || 4);
    const jsonFile = new JSONFile({ base, path, contents: Buffer.from(jsonStr) });
    jsonFile.override = override;
    return jsonFile;
  }
}
