const showFiles = (keys, files) => {
  const result = ['{'];

  for (let k = 0; k < keys.length; k += 1) {
    for (const obj of keys[k]) {
      if (!result.includes(`  ${obj}: ${files['file' + k][obj]}`)) {
        result.push(`  ${obj}: ${files['file' + k][obj]}`);
      }
    }
  }

  result.push('}')
  return result.join('\n');
};

export default showFiles;