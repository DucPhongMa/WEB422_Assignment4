import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useRouter} from 'next/router';
import {useState} from 'react';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';

import { addToHistory } from '../lib/userData';


export default function MainNav() {
   const router = useRouter()

   const [route, setRoute] = useState()
   const [isExpanded, setIsExpanded] = useState(false);

   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

   const handleSubmit = async (e) => {
       e.preventDefault()
       setIsExpanded(false)
       router.push(`/artwork?title=true&q=${route}`)
       setSearchHistory(await addToHistory(`title=true&q=${route}`))
       e.target.reset();
       
   }
 
    return (
     <>
      <Navbar className="fixed-top navbar-dark bg-dark" bg="light" expand="lg" expanded={isExpanded}>
         <Container>
            <Navbar.Brand>Duc Phong Ma</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(e) => {setIsExpanded(!isExpanded)}}/>
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="me-auto">
                  <Link href="/" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/"}>Home</Nav.Link></Link>
                  <Link href="/search" passHref><Nav.Link onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/search"}>Advanced Search</Nav.Link></Link>
                  
               </Nav>
               &nbsp;<Form className="d-flex" onSubmit={handleSubmit}>
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => {setRoute(e.target.value)}}
                    />
                    <Button type="submit" variant="success">Search</Button>
                </Form>&nbsp;
               <Nav>
                  <NavDropdown title="User Name" id="basic-nav-dropdown" active={router.pathname === "/favourites" || router.pathname === "/history"} >
                     <Link href="/favourites" passHref>
                        <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                     </Link>
                     <Link href="/history" passHref>
                        <NavDropdown.Item onClick={(e) => {setIsExpanded(false)}} active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                     </Link>
                  </NavDropdown>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
      <br />
      <br />
     </>
    )
  }
  