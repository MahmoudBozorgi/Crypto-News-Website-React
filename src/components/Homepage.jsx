import React, { useEffect } from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { sendCryptiAPIRequest } from "../redux/modules/CryptoAPI";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const { Title } = Typography;

const Homepage = () => {
  const { loading, data } = useSelector((state) => state.cryptoApiReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendCryptiAPIRequest());
  }, [dispatch]);

  const globalStats = data?.data?.stats;

  return (
    <>
      {loading && <Loading />}
      {!loading && data && (
        <>
          <Title level={2} className="heading">
            Global Crypto Stats
          </Title>
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Statistic
                title="Total Cryptocurrencies"
                value={globalStats?.total}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Exchanges"
                value={millify(globalStats?.totalExchanges)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total Market Cap:"
                value={millify(globalStats?.totalMarketCap)}
              />
            </Col>
            <Col span={12}>
              <Statistic
                title="Total 24h Volume"
                value={millify(globalStats?.total24hVolume)}
              />
            </Col>

            <Col span={12}>
              <Statistic
                title="Total Markets"
                value={millify(globalStats?.totalMarkets)}
              />
            </Col>
          </Row>
          <div className="home-heading-container">
            <Title level={2} className="home-title">
              Top 10 Cryptos In The World
            </Title>
            <Title level={3} className="show-more">
              <Link to="/cryptocurrencies">Show more</Link>
            </Title>
          </div>
          <Cryptocurrencies count={10} />
          <div className="home-heading-container">
            <Title level={2} className="home-title">
              Latest Crypto News
            </Title>
            <Title level={3}>
              <Link to="/news">Show more</Link>
            </Title>
          </div>
          <News count={9} />
        </>
      )}
    </>
  );
};

export default Homepage;
