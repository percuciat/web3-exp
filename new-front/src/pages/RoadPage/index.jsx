import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const RoadPage = () => {
  return (
    <>
      <Container className="container get-started-warpper">
        <h1 className="heading">How to get Started:</h1>
        <Row>
          <Col lg={2}>
            <h2 className="num">01</h2>
          </Col>
          <Col lg={5}>
            <img className="img img-fluid" src="img/01-img-02.png" alt="01-img" />
          </Col>
          <Col lg={5}>
            <Col className="col-content-inr">
              <h2 className="box-head">Genesis Galaxy Fighters Launch</h2>
              <p className="box-desc">
                Get your own Galaxy Fighter, our fighters will generate between 5-15 $GCOINs for you
                daily, you need to own at least 1 Galaxy Fighter as a key if you want to play in our
                more competitive and rewarding 3v3 team tournament mode.
              </p>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <h2 className="num">02</h2>
          </Col>
          <Col lg={4}>
            <div className="col-content-inr">
              <h2 className="box-head">FIGHT! </h2>
              <p className="box-desc">
                Download our game for iOS or Android, play in our PVP Deathmatches, 3v3 Team
                Tournaments or 10-person Battle Royale to earn more $GCOINs, win random loot or even
                $ETH prizes
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="col-img-inr">
              <img className="img img-fluid" src="img/02-img.png" alt="02-img" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={2}>
            <h2 className="num">03</h2>
          </Col>
          <Col lg={6}>
            <div className="col-img-inr">
              <img className="img img-fluid" src="img/03-img.png" alt="03-img" />
            </div>
          </Col>
          <Col lg={4}>
            <div className="col-content-inr">
              <h2 className="box-head">The Blacksmith </h2>
              <p className="box-desc">
                You can use the $GCOINs you earned to unlock new loot boxes or to forge two weapons
                into a stronger weapon with the Blacksmith. You can now use your upgraded weapon to
                win more $GCOINs or just sell it on the secondary market!
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default RoadPage;
