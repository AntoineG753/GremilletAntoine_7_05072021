import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Publications(props) {
    const { register, handleSubmit } = useForm();
    const [file, setFile] = useState();


    const publicationList = props.publications[0];
   const data = publicationList.map((publication_id, index) => {
       console.log(publication_id)
       return (
           <div className="div_card_publication d-flex col-lg-10 p-3" key={index}>
               <div className="col-lg-1 d-flex justify-content-center">
                {publication_id.avatar !== null && <img src={`${publication_id.avatar}`} className="col-lg-12 img_porfile"></img>}
                {publication_id.avatar === null && <i className="fas fa-user-circle mt-3"></i>}
               </div>
               <div>
                    <div className="col-lg-11 p-1">
                    <div className="d-flex justify-content-between">
                            <p className="bold">{publication_id.name}</p>
                            <p>{publication_id.publication_date}</p>
                    </div>
                        <div className="col-lg-12">
                            <p className="col-lg-12 text_overflow">{publication_id.comment}</p>
                        </div>
                        {publication_id.picture !== "" && <div>
                            <img src={`${publication_id.picture}`} className="img_publication col-lg-12"></img>
                        </div>}
                    </div>
                    <div>
                        <button className="btn btn-danger" id={`${publication_id.user_id}`}>suprimer</button>
                    </div>
                </div>
           </div>
       )
   })
   

   const onSubmit = data => {
        console.log(data)
        const fileData = new FormData();
        if(!data.comment && data.file.length === 0) {
            console.log("publication vide")
        } else {
            fileData.append("file", file);
            fileData.append("userId", localStorage.getItem('userId'))
            fileData.append("comment", data.comment)
            axios.post("http://localhost:5000/api/publication/createPublication", fileData, {params: {ID: localStorage.getItem('userId')}, headers : { "authorization": "Bearer " + localStorage.getItem('token')}})

            .then(res => {
                document.location.reload();
                
            })
            .catch(err =>  {"erreur handleSubmit"})
        }
        
   }
   
   const handleFile = e => {
      
        setFile(e.target.files[0]);
    
    }
    
        return (
            <div className="d-flex justify-content-center mt-3">
                <div className="d-flex col-lg-11 justify-content-center">
                    <div className=" div_menu col-lg-1">
                        {console.log(props)}
                    </div>
                    <div className="col-lg-6 d-flex justify-content-center row div_publications">
                        <div className="div_form_createPublication col-lg-11 mb-5">
                            <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
                                <textarea type="text" className="form-control border-0 col-lg-10"  placeholder="Quoi de neuf ?" name="comment" {...register('comment')}></textarea>
                                <div className="d-flex justify-content-between m-2">
                                    <label htmlFor="picture"><i className="far fa-images"/></label>
                                    <input type="file" name="file" id="picture" accept="image/*" className="input_createPublication_img" {...register('file')} onChange={(e) => handleFile(e)}/>
                                    <button className="btn_form_publication">Envoyer</button>
                                </div>
                            </form>
                        </div>
                    {data}
                    </div>
                    <div className="col-lg-4 div_aside">

                    </div>
                </div>
            </div>
        )
    

}
