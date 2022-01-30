const thumbMap: Record<string, any> = {};
const thumbContext = require.context('./', true, /.(svg|png)$/);
thumbContext.keys().forEach((key) => {
  console.log(key);
  const thumb = thumbContext(key);
  // [^.] 代表非点字符
  const name = key.replace(/(.*\/)*([^.]+).*/, '$2');
  thumbMap[name] = thumb;
});

export default thumbMap;
