class Node{
    constructor(data){
        this.data=data
        this.left=null
        this.right=null
    }
}
let root= null

function sortedArrayToBST(array,start, end){
    //base case
    if(start> end){
        return null
    }

    //get Middle element and make it root
    let mid=parseInt((start+end)/2)
    let node=new Node(array[mid])

    //recursively construct the left subtree and make it left child of root
    node.left=sortedArrayToBST(arr,start,mid-1)

    //recursively construct right subtree and amke it right child of root 
    node.right=sortedArrayToBST(array, mid+1, end )
    return node
}

//utility function to print preorder traversal BST
function preorder(node){
    if(node==null){
        return;
    }
    console.log(node.data + "")
    preorder(node.left)
    preorder(node.right)

}
let arr=[1,2,3,4,5,6,7,8,9]
let n=arr.length
root =sortedArrayToBST(arr, 0, n-1)
preorder(root)