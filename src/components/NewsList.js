import { useEffect, useState } from "react";
import { Row } from "antd";
import * as api from "../services/news.service";
import News from "./News";

function NewsList() {
  const [news, setNews] = useState([]);
  const [Copienews, setCopieNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loadingCat, setLoadingCat] = useState(false);
  const [FilterField, setFilterField] = useState("");
 
  const [formData, setFormData]= useState({title :"", category :""});
 
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
        const res = await api.fetchNews();
        setNews(res);
        setCopieNews(res)
        setLoading(false);
      };

    fetchData();
  }, []);
  useEffect(() => {
    setLoadingCat(true);
    const fetchDataCat = async () => {
      const res = await api.fetchCategories();
      setCategories(res);
      setLoadingCat(false);
    };

    fetchDataCat();
  }, []);

  const handleSearch = () => {
    if (FilterField.length !== 0 && selectedValue.length === 0) {
     
      const selectedNews = news.filter((n) => n.title.includes(FilterField));
     
      setCopieNews(selectedNews);
      console.log('copie: ', Copienews);
      
    } else  if (selectedValue.length !== 0 && FilterField.length === 0) {
      const selectedNews = news.filter((n) => n.category.includes(selectedValue));
     
      setCopieNews(selectedNews);
      console.log('copie: ', Copienews);
    } else  if(selectedValue.length !== 0 && FilterField.length !== 0 ){
      const selectedNews = news.filter(
        (n) => n.category.includes(selectedValue) && n.title.includes(FilterField) );
        setCopieNews(selectedNews);
        console.log('copie: ', Copienews);
      }
      else {
           setCopieNews(news);
      }
      
      
    
  };
  const handleAdd = async ()=> {
    console.log(formData);
   
     
     const newNews = await api.addNews(formData)
     setNews([...news,newNews])
     setCopieNews([...news,newNews])
    
   
   
}
const deleteNews = async (id)=> {
    try {
      console.log(id);
      await api.deleteNews(id)
      const newNews = Copienews.filter((n) => n.id !== id)
      console.log('Copienews: ', Copienews);
      console.log('newNews: ', newNews);
      setCopieNews(newNews);
       
     } catch (e){
          console.log("error")
     }
 
}
  return (
    <>
      <h1>News List</h1>
      <button onClick={()=>setShowForm(!showForm)}>Add News </button>
      {showForm ? <>
      
       <h1>Add a new News </h1>
       title : <input type="text" name="title" value={formData.title} onChange={(e)=> setFormData({...formData , title : e.target.value} ) }/>
       category : <input type="text" name="title" value={formData.category} onChange={(e)=> setFormData({...formData , category : e.target.value} ) }/>
       <button onClick={handleAdd}>Validate </button>
      
      </> : <></>}
      {loading && <p> loading data , please wait ....</p>}
      {!loadingCat && (
        <>
          {" "}
          <p> Filter by Title : </p>
          <input
            type="text"
            name="title"
            value={FilterField}
            onChange={(e) => setFilterField(e.target.value)}
          />
          <p> Filter by Category : </p>
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
          >
            <option value="">-------</option>
            {categories.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={handleSearch}>Valider </button>
        </>
      )}
      <div className="site-card-wrapper">
        <Row gutter={16}>
          {!loading && (
            <>
              {Copienews.map((n) => {
                return (
                  <News news={n} deleteNews={deleteNews}/>
                );
                
              })}
            </>
          )}
        </Row>
      </div>
    </>
  );
}

export default NewsList;
