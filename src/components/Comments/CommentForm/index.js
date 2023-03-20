import {FloatingLabel, Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import TestRating from '../../../Test/TestRating';

function CommentForm() {
  return (
    <>
   Comment:
      <FloatingLabel controlId="floatingTextarea2" >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: '100px' }}
        />
        <TestRating />
      </FloatingLabel>
      <Button type='submit'>OK</Button>
    </>
  );
}

export default CommentForm;