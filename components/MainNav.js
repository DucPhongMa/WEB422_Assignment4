import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useRouter} from 'next/router';
import {useState} from 'react';

export default function MainNav() {
   const router = useRouter()

   const [route, setRoute] = useState()

   const handleSubmit = (e) => {
       e.preventDefault()
       router.push(`/artwork?title=true&q=${route}`)
   }
 
    return (
     <>
      <Navbar className="fixed-top navbar-dark bg-dark" bg="light" expand="lg">
         <Container>
            <Navbar.Brand>Duc Phong Ma</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Link href="/" passHref><Nav.Link>Home</Nav.Link></Link>
                  <Link href="/search" passHref><Nav.Link>Advanced Search</Nav.Link></Link>
                  
               </Nav>
               <Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => {setRoute(e.target.value)}}
                    />
                    <Button type="submit" variant="success">Search</Button>
                </Form>
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <br />
      <br />
     </>
    )
  }
  