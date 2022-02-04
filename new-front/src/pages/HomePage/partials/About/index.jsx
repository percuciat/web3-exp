import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Title } from 'components';

import cards from '../../../../assets/img/cards.png';
import test from '../../../../assets/img/testCard.png';

const About = () => {
  return (
    <section id="about">
      <Title text="About" />
      <Row>
        <Col lg={6}>
          <p>
            Welcome to the hugest epic Fantasy World of the NFT Panda Multiverse. NFT Panda World of
            Fantasy is an RPG game on the WAX blockchain. Collect the most epic Panda Heroes and
            protect the lands of Elgard. Play and earn!
          </p>
        </Col>
        <Col lg={6}>
          <Image src={cards} fluid={true} />
        </Col>
      </Row>
      <Row className="row justify-content-center">
        <Col lg={7}>
          <div className="section-header text-center has--bg">
            <h2 className="section-title">Cards Types</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <div className="team-card">
            <div className="team-card__thumb">
              <Image src={test} fluid={true} />
            </div>
            <div className="team-card__content">
              <h3 className="name">COMMON</h3>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className="team-card">
            <div className="team-card__thumb">
              <Image src={test} fluid={true} />
            </div>
            <div className="team-card__content">
              <h3 className="name">COMMON</h3>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className="team-card">
            <div className="team-card__thumb">
              <Image src={test} fluid={true} />
            </div>
            <div className="team-card__content">
              <h3 className="name">COMMON</h3>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div className="team-card">
            <div className="team-card__thumb">
              <Image src={test} fluid={true} />
            </div>
            <div className="team-card__content">
              <h3 className="name">COMMON</h3>
            </div>
          </div>
        </Col>
      </Row>
      {/* <div class="row mb-none-30 justify-content-center">
<div class="col-lg-4 col-sm-6 mb-30">
  <div class="team-card">
    <div class="team-card__thumb">
      <img src="assets/images/hero/hero-common.png" alt="image">
      <div class="obj"><img src="assets/images/elements/team-obj.png" alt="image"></div>
    </div>
    <div class="team-card__content">
      <h3 class="name">COMMON</h3>
    </div>
  </div>
</div>
<div class="col-lg-4 col-sm-6 mb-30">
  <div class="team-card">
    <div class="team-card__thumb">
      <img src="assets/images/hero/hero-uncommon.png" alt="image">
      <div class="obj"><img src="assets/images/elements/team-obj.png" alt="image"></div>
    </div>
    <div class="team-card__content">
      <h3 class="name">UNCOMMON</h3>
    </div>
  </div>
</div>
<div class="col-lg-4 col-sm-6 mb-30">
  <div class="team-card">
    <div class="team-card__thumb">
      <img src="assets/images/hero/hero-rare.png" alt="image">
      <div class="obj"><img src="assets/images/elements/team-obj.png" alt="image"></div>
    </div>
    <div class="team-card__content">
      <h3 class="name">RARE</h3>
    </div>
  </div>
</div>
<div class="col-lg-4 col-sm-6 mb-30">
  <div class="team-card">
    <div class="team-card__thumb">
      <img src="assets/images/hero/hero-epic.png" alt="image">
      <div class="obj"><img src="assets/images/elements/team-obj.png" alt="image"></div>
    </div>
    <div class="team-card__content">
      <h3 class="name">EPIC</h3>
    </div>
  </div>
</div>
<div class="col-lg-4 col-sm-6 mb-30">
  <div class="team-card">
    <div class="team-card__thumb">
      <img src="assets/images/hero/hero-legendary.png" alt="image">
      <div class="obj"><img src="assets/images/elements/team-obj.png" alt="image"></div>
    </div>
    <div class="team-card__content">
      <h3 class="name">LEGENDARY</h3>
    </div>
  </div>
</div>
<div class="col-lg-4 col-sm-6 mb-30">
  <div class="team-card">
    <div class="team-card__thumb">
      <img src="assets/images/hero/hero-mythic.png" alt="image">
      <div class="obj"><img src="assets/images/elements/team-obj.png" alt="image"></div>
    </div>
    <div class="team-card__content">
      <h3 class="name">MYTHIC</h3>
    </div>
  </div>
</div>
</div> */}
    </section>
  );
};
export default About;
