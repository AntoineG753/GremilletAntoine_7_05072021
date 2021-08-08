import React from 'react';



export default function Publications(props) {
   const publicationList = props.publications[0];
   const data = publicationList.map((publication_id, index) => {
       return (
           <div className="test col-lg-7" key={index}>
               <p>{publication_id.comment}</p>
           </div>
       )
   })
  
   
    
        return (
            <div>
                <div className="d-flex justify-content-center">
                    <div className="col-lg-10 div_publications">
                    {data}
                    </div>
                </div>
            </div>
        )
    

}
