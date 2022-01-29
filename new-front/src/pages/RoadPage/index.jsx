import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Title } from 'components';
import img1 from '../../assets/img/imgRoad1.png';
import img2 from '../../assets/img/imgRoad2.png';
import img3 from '../../assets/img/imgRoad3.png';
import styles from './RoadPage.module.css';

const RoadPage = () => {
  return (
    <>
      <Container className={styles.wrapper}>
        <Title text="How to get Started:" />
        <Row className="d-flex align-items-center">
          <Col lg={2}>
            <h2 className={styles.num}>01</h2>
          </Col>
          <Col lg={5}>
            <Image src={img1} fluid={true} />
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
        <Row className="d-flex align-items-center">
          <Col lg={2}>
            <h2 className={styles.num}>02</h2>
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
              <Image src={img2} fluid={true} />
            </div>
          </Col>
        </Row>
        <Row className="d-flex align-items-center">
          <Col lg={2}>
            <h2 className={styles.num}>03</h2>
          </Col>
          <Col lg={6}>
            <div className="col-img-inr">
              <Image src={img3} fluid={true} />
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
