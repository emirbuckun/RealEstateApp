import { useContext } from "react";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Badge,
  Button,
} from "react-bootstrap";
import { PAGE_LIST } from "/src/constants";
import { useTranslation } from "react-i18next";
import SelectLanguage from "./SelectLanguage";
import {
  validateToken,
  validateAdmin,
  getUsername,
  logout,
} from "/src/services/AuthService";
import { LogContext } from "/src/contexts/LogContext";

const NavbarComponent = () => {
  const { logNotification } = useContext(LogContext);
  const { t } = useTranslation();

  return (
    <Navbar fixed="top" bg="dark" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {PAGE_LIST.main.map((item, index) => {
              const { name, url } = item;
              return (
                <Nav.Link key={index} href={url}>
                  {t(name)}
                </Nav.Link>
              );
            })}
            {validateAdmin() && (
              <>
                <NavDropdown title="Admin" id="collasible-nav-dropdown">
                  {PAGE_LIST.admin.map((item, index) => {
                    const { name, url } = item;
                    return (
                      <NavDropdown.Item key={index} href={url}>
                        {t(name)}{" "}
                        {name == "logs" && logNotification && (
                          <Badge bg="primary">1</Badge>
                        )}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
                <NavDropdown title={t("lookup")} id="collasible-nav-dropdown">
                  {PAGE_LIST.lookup.map((item, index) => {
                    const { name, url } = item;
                    return (
                      <NavDropdown.Item key={index} href={url}>
                        {t(name)}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              </>
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
                  <Button variant="outline-light" readOnly>
                    {t("user")}: {getUsername()}
                  </Button>
                </Navbar.Text>
                <Nav.Link href="/auth" onClick={logout}>
                  <Button variant="outline-light">{t("logout")}</Button>
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
