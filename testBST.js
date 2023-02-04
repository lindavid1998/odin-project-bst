import { Tree } from './tree.js';

testBST();

function createArray(length, min, max) {
	let output = [];
	while (output.length < length) {
		let num = Math.floor(Math.random() * (max - min) + min);
		if (!output.includes(num)) {
			output.push(num);
		}
	}
	return output;
}

function testBST() {
	// create array of random numbers
	let array = createArray(6, 4, 10);
	console.log(`Input array: ${array}`);

	// create BST from array
	let tree = new Tree(array);

	// print BST
	console.log('\nTree: \n');
	tree.prettyPrint();
	console.log('\n');

	// check if BST is balanced
	console.log(`Is tree balanced? ${tree.isBalanced()}\n`);

	// print out all elements in level, pre, post, and inorder
	console.log(`Level: \t${tree.levelOrder()}`);
	console.log(`Pre: \t${tree.preorder()}`);
	console.log(`Post: \t${tree.postorder()}`);
	console.log(`In: \t${tree.inorder()}`);

	// unbalance tree by adding several numbers > 100
	tree.insert(101);
	tree.insert(102);
	tree.insert(103);

	// print BST
	console.log('\nTree: \n');
	tree.prettyPrint();
	console.log('\n');

	// check if BST is balanced
	console.log(`Is tree balanced? ${tree.isBalanced()}\n`);

	// rebalance tree
	tree.rebalance();

	// print BST
	console.log('\nTree: \n');
	tree.prettyPrint();
	console.log('\n');

	// check if new BST is balanced
	console.log(`Is tree balanced? ${tree.isBalanced()}\n`);

	// print out all elements in level, pre, post, and inorder
	console.log(`Level: \t${tree.levelOrder()}`);
	console.log(`Pre: \t${tree.preorder()}`);
	console.log(`Post: \t${tree.postorder()}`);
	console.log(`In: \t${tree.inorder()}`);

	// unbalance tree by deleting several numbers
	tree.delete(5);
	tree.delete(4);
	tree.delete(7);
	tree.delete(8);
	tree.delete(2);

	// print BST
	console.log('\nTree: \n');
	tree.prettyPrint();
	console.log('\n');

	// check if BST is balanced
	console.log(`Is tree balanced? ${tree.isBalanced()}\n`);

	// rebalance tree
	tree.rebalance();

	// print BST
	console.log('\nTree: \n');
	tree.prettyPrint();
	console.log('\n');

	// check if new BST is balanced
	console.log(`Is tree balanced? ${tree.isBalanced()}\n`);

	// print out all elements in level, pre, post, and inorder
	console.log(`Level: \t${tree.levelOrder()}`);
	console.log(`Pre: \t${tree.preorder()}`);
	console.log(`Post: \t${tree.postorder()}`);
	console.log(`In: \t${tree.inorder()}`);
}
