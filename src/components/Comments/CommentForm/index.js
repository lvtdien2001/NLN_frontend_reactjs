import { Button, Row, Col,ListGroup } from "react-bootstrap";
import request from "../../../utils/request";
import { useEffect, useState ,useContext} from "react";
import classNames from "classnames/bind";
import styles from './CommentForm.module.scss'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'
import { AuthContext } from "../../../context/AuthContext";
import EditComment from "../EditComment";
import NewComment from "../NewComment";

//import { connect } from "mongoose";



const cx = classNames.bind(styles)
function Comment({productId}) {
  const [comments, setComments] = useState([]);
  const [commentUser, setCommentUser] = useState(null );
  const {authState} = useContext(AuthContext)
  const authUser = authState.user
  // console.log(user)
  useEffect(() => {
    if (!productId) return;

    const fetchApi = async () => {
      await request
        .get(`/comment/${productId}`)
        .then((res) => {
          if (res.data.success) {
            setComments(res.data.allComments);
          }
        })
        .catch((error) => {
          console.error(error);
        });

        await request 
         .get(`/comment?product=${productId}`)
         .then((res) => {
          setCommentUser(res.data.comment)
         })
    };
    fetchApi();
  }, []);

  const rating = (rate)=>{
    let stars = []
    for (let i = 1; i <= 5;i++) {
      i <= rate ? stars.push(<AiFillStar   key={i} className={cx('star')}/>) : stars.push(<AiOutlineStar  key={i}/>)

    }
    return (
      <>
     {stars.map(star => star)}
      </>
    )

  }
  //const CommentFilter = comments.filter(comment => comment.user._id === authUser._id)
  return (
    
    <div className={`${cx('wrapper')}`}>
    <Row className={cx('title')}>Bình Luận, Đánh Giá</Row> 
    {/* s */}
      <ListGroup>
        {comments.map((comment)=>{
          const content  = comment?.content
          const {  rate ,user,createdAt,_id} = comment;
          const {fullName,image}=user;
        return ( 
           
            <ListGroup.Item key={_id}>
                <Row>
                  <Col>
                    
                    <img alt="avatar" src={image || authUser.image} className={cx('avatar')}/>&nbsp;&nbsp;&nbsp;
                    {fullName}&nbsp;&nbsp;&nbsp;&nbsp; 
                    {createdAt.substring(0,10)}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {
                    
                    rating(rate)
                    }
                  </Col>
                  
                  
                  {/* <Col>{rate}</Col> */}
                </Row>
                <Row>
                  <Col> {content}</Col>
                  <Col>{authUser && authUser._id === user._id&& <EditComment commentId={_id} contents={content} rates={rate} setComments={setComments} userId={user._id}/>}</Col>
                </Row>
                
            </ListGroup.Item>
        
        )
      })}

      </ListGroup>
     <NewComment productId={productId} setComments={setComments}/>
    </div>
 
  );
}

export default Comment;
