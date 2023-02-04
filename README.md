# odin-project-bst

This repo is a JavaScript implementation of a binary search tree data structure. It is the solution to the [binary search tree assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees) for the Odin Project

Descriptions of the project files are found below

## tree.js 
Contains the classes for `Node` and `Tree`

The `Tree` class contains the following methods:
- `buildTree(array)` - constructs BST from input array, returning level-0 root node
- `insert(value)` - inserts a new node into tree with given value
- `delete(value)` - removes node with given value from tree, does nothing if node not found
- `find(value)` - returns node of given value if found in tree, or `null` if not found
- `levelOrder` - maps array of values in level order traversal to input function. If no input function given, returns array of values in level order traversal (iterative implementation)
- `levelOrderRec` - recursive implementation of `levelOrder`
- `inorder` - same as `levelOrder`, but using inorder traversal
- `preorder` - same as `levelOrder`, but using preorder traversal
- `postorder` - same as `levelOrder`, but using postorder traversal
- `height` - returns height of node
- `depth(node)` - returns depth of input node
- `isBalanced`- returns true if tree is balanced (difference between heights of left and right subtree is not more than 1)
- `rebalance` - rebalances tree
- `prettyPrint(root)` - prints BST to console in structured format

## testBST.js

Contains the test script for the BST implementation, which performs the following steps
- Create BST from array of random numbers
- Check if tree balanced
- Print elements in level, pre, post, and inorder 
- Unbalance tree by adding several numbers > 100
- Check if tree balanced
- Rebalance tree and verify it is balanced
- Print elements in level, pre, post, and inorder
- Unbalance tree by deleting several numbers
- Check if tree balanced
- Rebalance tree and verify it is balanced
- Print elements in level, pre, post, and inorder
