import { DocumentData, QuerySnapshot } from "firebase/firestore";

const getMemo = (messages:QuerySnapshot<DocumentData> | undefined)=>{
    var memory = []
  var i = messages?.docs.length
  if (typeof(i) !== "undefined"){
    for(let k=0;k<i;k++ ){
      var doc = messages!.docs[k]
      if(doc.data().user.name === 'ChatGPT'){
        memory.push(doc.data().text);
      } 
    }
  }  
   return memory
  }

export default getMemo  