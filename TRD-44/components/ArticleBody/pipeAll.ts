export type TransformerConfig = Map<
  string,
  // Changes the reference array
  (nodes: JSX.Element[], index: number) => void
>;

export const pipeAll = (
  nodes: JSX.Element[],
  transformers: TransformerConfig,
) => {
  nodes.forEach((node, index) => {
    const className = node.props?.className;

    if (transformers.has(className)) {
      transformers.get(className)?.(nodes, index);
      return;
    }

    const children = node?.props?.children;
    if (Array.isArray(children)) {
      pipeAll(children, transformers);
    }
  });
};
