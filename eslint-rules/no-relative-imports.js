export default {
  meta: {
    type: 'problem',
    messages: {
      noRelativeImport: 'Use @/ alias instead of relative imports. Exception: CSS imports (./*.css) are allowed.',
    },
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        
        // Allow CSS imports
        if (importPath.endsWith('.css')) {
          return;
        }
        
        // Block relative imports that aren't CSS
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
          context.report({
            node: node.source,
            messageId: 'noRelativeImport',
          });
        }
      },
    };
  },
};
