class Node{
    constructor(data){
        this.data=data
        this.left=null
        this.right=null 
    }
}

class Tree{
    constructor(array){ 
        this.root=this.createBalancedBST(array)
    } 

    createBalancedBST(array){
        if(this.isSorted(array,0,1)===true){ 
            return this.sortedArrayToBST(array,0,array.length)      
        }
        else{
            let unbalBST=this.createBST(array)
            let newArray=this.sortedArrayFromBST(unbalBST,null, unbalBST) 
            return this.createBalancedBST(newArray)
        }
    }

    isSorted(array,start,next){
        if(array[next]==null){
            return true
        }
        if(array[start]<array[next]){
            return this.isSorted(array,start+1, next+1) 
        }else{return false}
    }

    createBST(array,tree,start,subtree){
        tree=tree||{
            root:null
        }
      if(tree.root==null){
          tree.root=new Node(array[0])
      }
      start=start||1
      subtree=subtree||tree.root
      if(array[start]<subtree.data){
        if(subtree.left==null){
            subtree.left=new Node(array[start])
        }else{
            return this.createBST(array,tree,start,subtree.left)
        }
      }else if(array[start]>subtree.data){
        if(subtree.right==null){
            subtree.right=new Node(array[start])
        }else{
            return this.createBST(array,tree,start,subtree.right)
        }
      }
      while(start !=array.length){
          return this.createBST(array,tree, ++start, tree.root)
      }
    //   console.log(sortedArrayFromBST(tree.root))
      return tree.root
    }

    sortedArrayFromBST(tree,outputArray, root){
        outputArray=outputArray||[]
        root=root||tree.root
        let left=root.left
        let right=root.right    
        if(root==null) return;
        if(left!==null){
            this.sortedArrayFromBST(tree,outputArray, left)
        }
        outputArray.push(root.data)
        if(right!==null){
            this.sortedArrayFromBST(tree,outputArray, right)  
        }
        return outputArray 
    }  


    sortedArrayToBST(array, start, end){
        if(start> end){
            return null
        }
        let mid=parseInt((start+end)/2)  
        let newNode= new Node(array[mid])  
        newNode.left=this.sortedArrayToBST(array, start, mid-1)
        newNode.right=this.sortedArrayToBST(array, mid+1, end)
        if(newNode.data==undefined){
            newNode=null
        }
        return newNode    
    }

    addNode(value, node,parentNode){
        parentNode=parentNode||null
        if(value<node.data){
            let left=node.left
            if(left==null){
                node.left=new Node(value)
            }else{
                return(this.addNode(value,node.left))
            }
        }else if(value>node.data){ 
            let right=node.right
            if(right==null){
                node.right=new Node(value)
            }else{
                return(this.addNode(value,node.right))
            }
        }
        
    }

    deleteNode(valueToDelete,node,parentNode){
        parentNode=parentNode||null
        if(!node){
            return null
        }
        else{
            if(valueToDelete<node.data){
                return this.deleteNode(valueToDelete,node.left, node)
            }else if(valueToDelete>node.data){
                return this.deleteNode(valueToDelete, node.right, node)
            }else if(node.data==valueToDelete){
                let isLessThanParent=valueToDelete<parentNode.data
                console.log(isLessThanParent)
                if(node.left==null && node.right==null){
                    if(isLessThanParent==true){
                        return parentNode.left=null
                    }else if(isLessThanParent==false){
                        return parentNode.right=null
                    }
                }
                else if((node.left==null && node.right !=null) || (node.left!=null && node.right==null)){
                    console.log(isLessThanParent)
                    console.log("1 child") 
                    console.log(node)
                    if(isLessThanParent==true){
                        return parentNode.left=node.left||node.right
                    }else{
                        return parentNode.right=node.left||node.right
                    }
                }else if(node.left != null && node.right != null){
                    console.log("2 children")
                    if(isLessThanParent){
                        let nextBiggestNode=node.right
                        let smallest=nextBiggestNode.left
                        console.log(nextBiggestNode)
                        console.log(smallest) 
                        if(smallest==null){
                            let newNodeValue=nextBiggestNode.data
                            this.deleteNode(newNodeValue,tree.root)
                            return node.data=newNodeValue
                        }
                        else{
                            let smallestLeft=smallest.left
                            while(smallestLeft.left!=null){
                                smallestLeft=smallestLeft.left
                            } 
                            console.log(smallestLeft)
                            let hasChild=smallestLeft.right!=null
                            console.log(hasChild)
                            if(hasChild==false){
                                let newNodeData=smallestLeft.data
                                console.log(newNodeData)
                                this.deleteNode(newNodeData,tree.root)
                                node.data=newNodeData
                            }else{
                                let newNodeData=smallestLeft.data
                                node.data=newNodeData
                                node.right=smallestLeft.right||nextBiggestNode.right
                            } 
                        } 
                        
                    }
                    else{
                        let nextBiggestNode=node.right
                        let smallest=nextBiggestNode.left
                        console.log(nextBiggestNode)
                        console.log(smallest) 
                        if(smallest==null){ 
                            return parentNode.right=node.right
                        }
                        else{
                            let smallestLeft=smallest
                            while(smallestLeft.left!=null){
                                smallestLeft=smallestLeft.left
                            } 
                            console.log(smallestLeft)
                            let hasChild=smallestLeft.right!=null
                            console.log(hasChild)
                            if(hasChild==false){
                                let newNodeData=smallestLeft.data
                                this.deleteNode(newNodeData,tree.root)
                                node.data=newNodeData
                            }else{
                                let newNodeData=smallestLeft.data
                                node.data=newNodeData
                                node.right=smallestLeft.right||nextBiggestNode.right

                            }
                        }  
                    }
                }
            }
        } 
    }

    find(value, tree){
        let isLeftNull=tree.left==null
        let isRightNull=tree.right==null
      if(tree.data==value){
          return tree
      }
      else if(tree.data>value){
          if(isLeftNull==true){
              return false
          }else{
            return this.find(value, tree.left)
          }
      }
      else if(tree.data<value){
          if(isRightNull==true){
              return false
          }else{
            return this.find(value, tree.right)
          }
      }
    }

    levelOrder(tree){
        let returnArray=[]
        if(tree==null){
            return
        }
        let queue=[]
        queue.push(tree)
        while(queue[0]!=null){
            let node=queue[0]
            returnArray.push(node.data)
            let isLeftNull=node.left==null
            let isRightNull=node.right==null

            if(isLeftNull==false){
                queue.push(node.left)
            }
            if(isRightNull==false){
                queue.push(node.right)
            } 
            queue.shift()
        }
        return returnArray
    }

    inOrderTraversal(tree,outputArray,root){
        outputArray=outputArray||[]
        root=root||tree
        let left=root.left
        let right=root.right
        if(root==null) return
        if(left!==null){
             this.inOrderTraversal(tree,outputArray, left)
        }
        outputArray.push(root.data)
        if(right!==null){ 
             this.inOrderTraversal(tree,outputArray, right)
        }
        return outputArray 
    }

    preOrderTraversal(tree, returnArray, root){
        returnArray=returnArray||[]
        root=root||tree
        let left=root.left
        let right=root.right
        returnArray.push(root.data)
        if(root==null) return
        if(left !== null){
             this.preOrderTraversal(tree, returnArray, left)
        }
        if(right!==null){
             this.preOrderTraversal(tree, returnArray, right)
        }
        return  returnArray 
    }

    postOrderTraversal(tree, outputArray, root){
        outputArray=outputArray || []
        root=root || tree
        let left =root.left
        let right= root.right
        if(root == null)return
        if(left !== null){   
             this.postOrderTraversal(tree, outputArray, left)
        }
        if(right !== null){
            this.postOrderTraversal(tree, outputArray, right)
        }
        outputArray.push(root.data)
        return outputArray 
    }

    height(tree){
       if(tree==null){
           return -1
       }
       let left=tree.left
       let right=tree.right
       let leftHeight=this.height(left)
       let rightHeight=this.height(right)
       if(leftHeight<rightHeight){
           return rightHeight +1
       }else{
           return leftHeight+1
       }
    }

    depth(nodeToFindDepthOf,node, depth){
        let tree=this.root
        node=node||tree
        depth=depth||0
        nodeToFindDepthOf=this.find( nodeToFindDepthOf, tree)
        if(nodeToFindDepthOf==false) return null
        if(node==nodeToFindDepthOf){
            return depth
        }if(nodeToFindDepthOf.data<node.data){
            let left=node.left
            if(left==nodeToFindDepthOf){
                return ++depth
            }else return this.depth(nodeToFindDepthOf.data, left, depth+1) 
        }
        else{
            if(nodeToFindDepthOf.data>node.data){
                let right= node.right
                if(right==nodeToFindDepthOf)
                return ++depth
                else{
                    return this.depth(nodeToFindDepthOf.data, right, depth+1)
                }
            }
        }
    }

    isBalanced(node, tree){
        tree=this.root
        node=node||tree
        let left=node.left
        let right=node.right
        if(left !==null){
             this.isBalanced(left)
        }    
        if(right !==null){
            this.isBalanced(right) 
        }
        let leftHeight=this.height(left)
        let rightHeight=this.height(right)
        if(leftHeight==-1){
            leftHeight=0
        }
        if(rightHeight==-1){
            rightHeight=0
        }
        if(leftHeight-rightHeight >1 || leftHeight-rightHeight< -1){ 
            return false
        }else{
            return true   
        }
    }

    rebalance(node){
        let isTreeBalanced=this.isBalanced(node)
        if(isTreeBalanced==true){
            return ("Tree Is Balanced")
        }
        let sortedArray=this.inOrderTraversal(this.root)
        this.root= this.sortedArrayToBST(sortedArray, 0, sortedArray.length-1)
        return



    }

     prettyPrint(node, prefix = '', isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    } 
}

function testScript(){
    let testTree=new Tree([3,66,44,33,65,22,13,2,36,28,31,21,1,4,69,6])
    testTree.prettyPrint(testTree.root)
    let balanced= testTree.isBalanced(testTree.root)
    console.log(balanced)
    let depth=testTree.levelOrder(testTree.root)
    console.log(depth)
    let preOrder=testTree.preOrderTraversal(testTree.root)
    console.log(preOrder)
    let postOrder=testTree.postOrderTraversal(testTree.root)
    console.log(postOrder)
    let inOrder=testTree.inOrderTraversal(testTree.root)
    console.log(inOrder)
    testTree.addNode(70,testTree.root)
    testTree.addNode(71,testTree.root)
    testTree.addNode(72,testTree.root)
    testTree.addNode(73,testTree.root)
    testTree.addNode(74,testTree.root)
    testTree.prettyPrint(testTree.root)
    let stillBalanced= testTree.isBalanced(testTree.root)
    console.log(stillBalanced)
    testTree.rebalance(testTree.root)
    let nowBalanced= testTree.isBalanced(testTree.root)
    console.log(nowBalanced)
    testTree.prettyPrint(testTree.root) 
    let levelOrder=testTree.levelOrder(testTree.root)
    console.log(levelOrder)
    let newPreOrder=testTree.preOrderTraversal(testTree.root)
    console.log(newPreOrder)
    let newPostOrder=testTree.postOrderTraversal(testTree.root)
    console.log(newPostOrder)
    let newInOrder=testTree.inOrderTraversal(testTree.root)
    console.log(newInOrder) 
}

testScript()





























