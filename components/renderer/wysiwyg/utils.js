export const preprocessBlocks = (blocks) => {
  if (!blocks) return [];
  const result = [];

  let currentBlocks = { type: "col", blocks: [] };
  let currentRowBlocks = [];

  blocks.forEach((block) => {
    if (block.type === "columnStart") {
      if (currentBlocks.blocks.length !== 0) {
        result.push(currentBlocks);
      }

      currentBlocks = { type: "row", blocks: [] };
    } else if (block.type === "columnEnd") {
      if (currentRowBlocks.length !== 0) {
        currentBlocks.blocks.push(currentRowBlocks);
        currentRowBlocks = [];
      }
      if (currentBlocks.blocks.length !== 0) {
        result.push(currentBlocks);
      }

      currentBlocks = { type: "col", blocks: [] };
    } else {
      if (currentBlocks.type === "row") {
        if (block.type === "columnSplit") {
          if (currentRowBlocks.length !== 0) {
            currentBlocks.blocks.push(currentRowBlocks);
            currentRowBlocks = [];
          }
        } else {
          currentRowBlocks.push(block);
        }
      } else {
        currentBlocks.blocks.push(block);
      }
    }
  });

  if (currentBlocks.blocks.length !== 0) {
    result.push(currentBlocks);
  }

  return result;
};

export const parseData = (data) => {
  try {
    return JSON.parse(data)?.blocks;
  } catch (err) {
    return [];
  }
};
