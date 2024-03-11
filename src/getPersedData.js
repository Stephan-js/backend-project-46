import yaml from 'js-yaml';
import { parse } from 'ini';

const getParsedData = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      return yaml.load(data);
      // In dev...
    case 'err':
      return parse(data);
    default:
      return undefined;
  }
};

export default getParsedData;
