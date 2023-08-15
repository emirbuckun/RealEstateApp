import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { PAGE_LIST, LOOKUP_LIST } from "/src/constants";
import { useTranslation } from "react-i18next";
import SelectLanguage from "./SelectLanguage";
import {
  validateToken,
  validateAdmin,
  getUsername,
} from "/src/services/AuthService";

const NavbarComponent = () => {
  const { t } = useTranslation();
  return (
    <Navbar fixed="top" collapseOnSelect expand="md">
      <Container>
        <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {PAGE_LIST.map((item, index) => {
              const { name, url } = item;
              return (
                <Nav.Link key={index} href={url}>
                  {t(name)}
                </Nav.Link>
              );
            })}
            {validateAdmin() && (
              <NavDropdown title={t("lookup")} id="collasible-nav-dropdown">
                {LOOKUP_LIST.map((item, index) => {
                  const { name, url } = item;
                  return (
                    <NavDropdown.Item key={index} href={url}>
                      {t(name)}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            )}
          </Nav>
          <SelectLanguage />
          <Nav>
            {!validateToken() ? (
              <Nav.Link href="/auth">
                {t("login")}/{t("register")}
              </Nav.Link>
            ) : (
              <>
                &nbsp;
                <Navbar.Text>
                  {t("user")}: {getUsername()}
                </Navbar.Text>
                <Nav.Link
                  href="/auth"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("tokenExpiration");
                    localStorage.removeItem("username");
                    localStorage.removeItem("isAdmin");
                  }}
                >
                  {t("logout")}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
