import recordStore from "./recordStore";
import tagStore from "./tagStore";


const oldStore = {
 count: 0,
     
 ...recordStore,
 ...tagStore 
      
};
  export default oldStore;