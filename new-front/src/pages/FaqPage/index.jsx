import React from 'react';
import { Tab, Row, Nav, Col, Accordion } from 'react-bootstrap';
import { Title } from 'components';
const FaqPage = () => {
  return (
    <>
      <Title text="F.A.Q." />
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">GAME OVERVIEW</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">WHAT MAKES US SPECIAL ?</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">TECHNICAL INFORMATION</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>WHAT IS GALAXY FIGHT CLUB?</Accordion.Header>
                    <Accordion.Body>
                      Galaxy Fight Club is a cross-IP P2E PvP game for the NFT Universe - this would
                      be the best way to describe what we are trying to do. The Galaxy Fight Club
                      (GFC) is not just an avatar project, it is a real-time PvP game to bring
                      together all the other different NFT collections onto one single platform,
                      this means you can log-in with a NFT you have already bought and battle with
                      that character. When you think about Super Smash Bros, what makes it so fun is
                      that you have characters from different IPs coming together like a Pikachu
                      fighting a Mario. Galaxy Fight Club is doing the same
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      CAN I FIGHT WITH AVATARS FROM OTHER COLLECTIONS?
                    </Accordion.Header>
                    <Accordion.Body>
                      Yes, you will be able to fight with any NFT that you already own and battle
                      against holders of other avatars from other collections. In order to
                      participate in the main gaming modes of the game itself, you must be an owner
                      of at least 1 Galaxy Fighter which is our own original 10K collection. Owning
                      at least 1 Galaxy Fighter allows you to fight as the Galaxy Fighter himself or
                      you can also use avatars from other collections in your wallet. The Galaxy
                      Fighter acts as a key into the game. Some collections you can play with
                      include: CyberKongz, BAYC, Animetas, BOTB, Wicked Craniums, Alien Boy and many
                      others.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>WHEN WILL GALAXY FIGHT CLUB RELEASE?</Accordion.Header>
                    <Accordion.Body>
                      Galaxy Fight Club is currently in alpha test stage, we are testing the battle
                      system of the game as well as the balancing between different fighters and
                      weapons. We are planning on opening up our beta test to a wider group of the
                      community in October, with a full game release in November which would make us
                      one of the first movers in the cross-IP PVP game space for the NFT Universe.
                      Sept - Alpha tests - we will select a number of you to play test our game Oct
                      - Beta Access - we will open the game up to a percentage of players (e.g all
                      players in Canada)
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab.Pane>
              <Tab.Pane eventKey="second">adasdas</Tab.Pane>
              <Tab.Pane eventKey="third">
                <Accordion defaultActiveKey={['0']} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>WHAT IS YOUR GAME BUILT WITH?</Accordion.Header>
                    <Accordion.Body>
                      Galaxy Fight Club is built with Unity, Unity is a well crafted very
                      comprehensive game development tool and was chosen for a number of reasons. It
                      offers superior support for de-bugging and tweaking as all the game variables
                      are displayed during gameplay which enables systemic tweeking and debugging
                      processes during run-time. There is also an extensive marketplace which offers
                      wide built components for sound, physics, rendering, controls and it allows us
                      to build what we need at a quicker speed.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>ARE THERE SERVERS IN GALAXY FIGHT CLUB?</Accordion.Header>
                    <Accordion.Body>
                      There will be multiple servers in Galaxy Fight Club located across the globe,
                      for our players in Asia there will be a server hosted in Singapore, for
                      players in the USA we will have one in San Jose for those on the west coast
                      and Washington for those on the east coast, we will also have one in Amsterdam
                      for our European players with other servers in different parts of the world.
                      <br />
                      There will also be the option to manually enter into different rooms and
                      servers in the case you want to play with a friend from another region.
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

export default FaqPage;
