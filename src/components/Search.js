import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Search = () => {
   
   const [term, setTerm]= useState('programming');
   const [debouncedTerm, setDebouncedTerm] = useState(term); 
   const [results, setResults] = useState([]);


   //useEffect(() => {
      //3 different methods
   //   const search = async () => {
   //     const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
   //      params: {
   //         action:'query',
   //         list : 'search',
   //          origin: '*',
   //         format: 'json',
   //         srsearch: term,
   //      }
   //   });
   //    setResults(data.query.search);
   // };  //creating a function & calling it without creating any variable
   
   //if (term && !results.length){
   //    search();    
   //}else{
   //  const timeoutId = setTimeout(() => {
   // if(term) {
   //  search(); 
   //  }    
  //}, 1000);
   
   // return () => {
   //   clearTimeout(timeoutId);
   // };
   //}
//}, [term, results.length]); 

   useEffect(() =>{
       const timeid = setTimeout(()=> {
       setDebouncedTerm(term);
    }, 1000);
    return () => {
      clearTimeout(timeid);
    };
   }, [term]);
  
   useEffect(()=>{
     const search = async () => {
        const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
         params: {
            action:'query',
            list : 'search',
             origin: '*',
            format: 'json',
            srsearch: debouncedTerm,
         }
      });
       setResults(data.query.search);
    };  //creating a function & calling it without creating any variable
      search();
   
   },[debouncedTerm]);
   
   const renderedResults  = results.map((result)=>{
       return (
           <div key={result.pageid} className="item">
             <div className="right floated content">
              <a href={`https://en.wikipedia.org?curid=${result.pageid}`}
              className="ui button ">Go</a>
             </div>
             <div className="content">
               <div className="header">
                   {result.title}
               </div>
                <span dangerouslySetInnerHTML={{ __html:result.snippet}}></span>
             </div>
           </div>
      );})

   return (
     <div>
      <div className="ui form">
         <div className="field">
           <label>Enter Search term</label>
           <input value={term} className="input" onChange={(e) => setTerm(e.target.value)}></input>
         </div>
       </div>
      <div className="ui celled list">
          {renderedResults}
        </div>
     </div>  
   );
};

export default Search;