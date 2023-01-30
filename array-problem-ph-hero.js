function rotateLeft(a,b){
    
    let d = a.length-b
    let c=[];
    if(b>a.length){
        return "Error"
    }
    else if(d){
        for (let i = b;i<a.length;i++){
            c.push(a[i])
        }
        for (let i =0; i<b;i++){
            c.push(a[i])
        }
    }else{
        c=a;
    }
    return c
}

const result =rotateLeft([1,2,3,4,5,6],4)
console.log(result)

