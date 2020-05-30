export const preprocessBlocks = (blocks) => {
  const result = [];

  let currentBlocks = [];

  blocks.forEach((block) => {
    if (block.type === "delimiter") {
      result.push([...currentBlocks]);

      currentBlocks = [];
    } else {
      currentBlocks.push(block);
    }
  });

  result.push([...currentBlocks]);

  return result;
};

export const parseData = (data) => {
  try {
    return JSON.parse(data)?.blocks;
  } catch (err) {
    return [];
  }
};
