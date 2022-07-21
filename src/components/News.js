import { useState } from "react";
import { Card, Col,  } from "antd";
import { Button} from 'antd';
function News(props) {

   
    const [showComment, setShowComment] = useState(false);
  return (
    <Col span={8} key={props.news.id}>
    <Card
      title={props.news.title}
      // extra={<a href="#">More</a>}
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuQalsV5ckafs1YuE7F2_gNKDpQJw3G2aFqSp-Ff3R8XDZuv2VINKYFUe5yMgKkw300s&usqp=CAU"
        />
      }
    >
          <button onClick={()=>props.deleteNews(props.news.id)}>Delete News </button>
         <Button type="primary" onClick={()=>setShowComment(!showComment)}>
      Show Comments 
      </Button> 
      {showComment &&  props.news.comments ? ( props.news.comments.map((comment) => {return <p key={comment.id}>{comment.text}</p>}) ) : <p> no comments</p> }
      
      
       </Card>
    
  </Col>
  );
}

export default News;
