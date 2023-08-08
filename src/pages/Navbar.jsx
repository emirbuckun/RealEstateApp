import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavbarB from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { validateToken } from "/src/services/AuthService";

const Navbar = () => {
  const list = [
    { name: "Currencies", url: "/currencies" },
    { name: "Estates", url: "/estates" },
    { name: "Statuses", url: "/statuses" },
    { name: "Types", url: "/types" },
    { name: "Photos", url: "/photos" },
    { name: "Prices", url: "/prices" },
  ];
  return (
    <NavbarB fixed="top" collapseOnSelect expand="md">
      <Container>
        <NavbarB.Brand href="/">Real Estate App</NavbarB.Brand>
        <NavbarB.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarB.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Pages" id="collasible-nav-dropdown">
              {list.map((item, index) => {
                const { name, url } = item;
                return (
                  <NavDropdown.Item key={index} href={url}>
                    {name}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
          <Nav>
            {!validateToken() ? (
              <Nav.Link href="/auth">Login/Register</Nav.Link>
            ) : (
              <Nav.Link
                href="/auth"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("tokenExpiration");
                }}
              >
                Log Out
              </Nav.Link>
            )}
          </Nav>
        </NavbarB.Collapse>
      </Container>
    </NavbarB>
  );
};

export default Navbar;
