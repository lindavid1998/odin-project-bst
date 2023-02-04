class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

export class Tree {
	constructor(array) {
		array = this.cleanArray(array);
		this.root = this.buildTree(array);
	}

	cleanArray(array) {
		// remove duplicates and sort array
		let output = [...new Set(array)];
		output.sort((a, b) => a - b);
		return output;
	}

	buildTree(array, start = 0, end = array.length - 1) {
		// base case: if subarray is size 0, return null
		if (start > end) return null;

		// create root node using value at middle of array
		let mid = Math.floor((start + end) / 2);
		let root = new Node(array[mid]);

		// recursively build left and right subtrees
		root.left = this.buildTree(array, start, mid - 1);
		root.right = this.buildTree(array, mid + 1, end);

		return root;
	}

	insert(value) {
		let newNode = new Node(value);
		let temp = this.root;
		while (temp) {
			if (value < temp.data && !temp.left) {
				temp.left = newNode;
				return;
			}

			if (value > temp.data && !temp.right) {
				temp.right = newNode;
				return;
			}

			temp = value < temp.data ? temp.left : temp.right;
		}
	}

	insertRec(value, root = this.root) {
		// recursive implementation of insert
		let node = new Node(value);
		if (root == null) {
			root = node;
		}

		if (value < root.data) {
			root.left = this.insertRec(value, root.left);
		} else if (value > root.data) {
			root.right = this.insertRec(value, root.right);
		}

		return root;
	}

	find(value, root = this.root) {
		// returns node of given value, or null if not found
		if (root == null) return null;
		if (value == root.data) return root;

		if (value < root.data) {
			return this.find(value, root.left);
		} else {
			return this.find(value, root.right);
		}
	}

	delete(value, root = this.root) {
		if (root == null) return null;

		if (value < root.data) {
			root.left = this.delete(value, root.left);
		} else if (value > root.data) {
			root.right = this.delete(value, root.right);
		} else {
			if (!root.left && !root.right) {
				root = null;
			} else if (root.left && root.right) {
				let successor = this.getInorderSuccessor(root);
				root = this.delete(successor.data, root);
				root.data = successor.data;
			} else {
				root = root.left ? root.left : root.right;
			}
		}

		return root;
	}

	getInorderSuccessor(root) {
		if (root == null) return null;

		let temp = root.right;
		while (temp.left != null) {
			temp = temp.left;
		}
		return temp;
	}

	prettyPrint(node = this.root, prefix = '', isLeft = true) {
		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? '│   ' : '    '}`,
				false
			);
		}
		console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
		}
	}

	levelOrder(cb, root = this.root) {
		// traverse tree in breadth-first level order and provide each node as argument to fn
		// The method should return an array of values if no function is given

		// iterative
		if (root == null) return;

		let output = [];
		let queue = [root];
		while (queue.length > 0) {
			queue.push(queue[0].left);
			queue.push(queue[0].right);
			queue = queue.filter((node) => node != null);
			output.push(queue.shift());
		}

		return cb ? output.map(cb) : output.map((node) => node.data);
	}

	levelOrderRec(cb, root = this.root) {
		// recursive implementation of levelOrder
		let output = [];
		let h = this.height(root);
		for (let i = 0; i <= h; i++) {
			output = output.concat(this.visitLevelNodes(root, i));
		}
		output = output.filter((node) => node != null);
		return cb ? output.map(cb) : output.map((node) => node.data);
	}

	height(root = this.root) {
		// returns furthest dist from leaf node
		if (root == null) return -1;
		let leftHeight = 1 + this.height(root.left);
		let rightHeight = 1 + this.height(root.right);
		return leftHeight > rightHeight ? leftHeight : rightHeight;
	}

	visitLevelNodes(root, level) {
		// returns an array of nodes at input level
		if (level == 0 || root == null) return [root];
		let left = this.visitLevelNodes(root.left, level - 1);
		let right = this.visitLevelNodes(root.right, level - 1);
		return left.concat(right);
	}

	inorder(cb, root = this.root) {
		// returns array of nodes using inorder traversal if no function given
		// otherwise, passes node values as arguments to input function
		if (root == null) return [];

		let output = [];
		output = output.concat(this.inorder(cb, root.left));
		output.push(root.data);
		output = output.concat(this.inorder(cb, root.right));

		return cb ? output.map(cb) : output;
	}

	preorder(cb, root = this.root) {
		// returns array of nodes using preorder traversal if no function given
		// otherwise, passes node values as arguments to input function
		if (root == null) return [];

		let output = [];
		output.push(root.data);
		output = output.concat(this.preorder(cb, root.left));
		output = output.concat(this.preorder(cb, root.right));

		return cb ? output.map(cb) : output;
	}

	postorder(cb, root = this.root) {
		// returns array of nodes using postorder traversal if no function given
		// otherwise, passes node values as arguments to input function
		if (root == null) return [];

		let output = [];
		output = output.concat(this.postorder(cb, root.left));
		output = output.concat(this.postorder(cb, root.right));
		output.push(root.data);

		return cb ? output.map(cb) : output;
	}

	depth(node, root = this.root) {
		// returns -1 if node not found, otherwise returns depth of node
		let count = 0;
		let temp = root;
		while (temp) {
			if (temp.data == node.data) return count;

			if (node.data < temp.data) {
				temp = temp.left;
			} else {
				temp = temp.right;
			}
			count += 1;
		}
		return -1;
	}

	isBalanced() {
		// returns true if tree is balanced
		let leftHeight = this.height(this.root.left);
		let rightHeight = this.height(this.root.right);
		return Math.abs(leftHeight - rightHeight) <= 1;
	}

	rebalance() {
		let newArray = this.levelOrder();
		newArray = this.cleanArray(newArray);
		this.root = this.buildTree(newArray);
	}
}
