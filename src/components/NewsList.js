import { useEffect, useState } from "react";
import { Row } from "antd";
import * as api from "../services/news.service";
import News from "./News";

function NewsList() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

 
  
  const [loadingCat, setLoadingCat] = useState(false);
  const [FilterField, setFilterField] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await api.fetchNews();
      setNews(res);
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
     
      const selectedNews = news.filter((n) => n.title === FilterField);
     
      setNews(selectedNews);
    } else if (selectedValue.length !== 0 && FilterField.length === 0) {
      const selectedNews = news.filter((n) => n.category === selectedValue);
     
      setNews(selectedNews);
    } else {
      const selectedNews = news.filter(
        (n) => n.category === selectedValue && n.title === FilterField
      );
      
      setNews(selectedNews);
    }
  };
 
  return (
    <>
      <h1>News List</h1>

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
              {news.map((n) => {
                return (
                  <News news={n}/>
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
