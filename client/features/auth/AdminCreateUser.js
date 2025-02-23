import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../app/users';
import { me } from '../../app/store';
import { motion } from 'framer-motion';
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUserPlus, FaLock } from 'react-icons/fa';

const AdminCreateUser = () => {
   const [username, setUsername] = useState( '' );
   const [password, setPassword] = useState( '' );
   const dispatch = useDispatch();

   const handleSubmit = async ( event ) => {
      event.preventDefault();
      await dispatch( createUser( { username, password } ) );
      setUsername( '' );
      setPassword( '' );
      dispatch( me() ); // Fetch logged-in user data
   };

   return (
      <Container className="d-flex justify-content-center align-items-center vh-100"
         style={{ background: "url('/images/training-bg.jpg') center/cover no-repeat" }}
      >
         <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
         >
            <Card style={{
               width: '400px', padding: '60px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)', marginLeft: '400px',
               backgroundColor: 'light-grey'
            }}>
               <Card.Body>
                  <h2 className="text-center mb-3">Create New User</h2>
                  <Form onSubmit={handleSubmit}>
                     <Form.Group className="mb-3">
                        <Form.Label><FaUserPlus className="me-2" />Username</Form.Label>
                        <Form.Control
                           type="text"
                           value={username}
                           onChange={( e ) => setUsername( e.target.value )}
                           required
                           placeholder="Enter username"
                        />
                     </Form.Group>
                     <Form.Group className="mb-3">
                        <Form.Label><FaLock className="me-2" />Password</Form.Label>
                        <Form.Control
                           type="password"
                           value={password}
                           onChange={( e ) => setPassword( e.target.value )}
                           required
                           placeholder="Enter password"
                        />
                     </Form.Group>
                     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="primary" type="submit" className="w-100">
                           Create User
                        </Button>
                     </motion.div>
                  </Form>
               </Card.Body>
            </Card>
         </motion.div>
      </Container>
   );
};

export default AdminCreateUser;

